import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
// import useWindowSize from "../../hook/useWindowSize";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import useContract, { contractAddresses } from "../../hook/useContract";

import NFTItem from "../../components/NFTItem";
import {
  Wrapper,
  StyledButton,
  Flex,
  SubArea,
  Container,
  ButtonArea,
  ButtonWrapper,
  GetRewardArea,
  Input,
} from "./styled";
import { useKeplr } from "../../features/accounts/useKeplr";

const Main: React.FC = () => {
  const { runQuery, runExecute } = useContract();
  const [price, setPrice] = useState("");
  const [mintedNfts, setMintedNfts] = useState(0);
  const [maxNfts, setMaxNfts] = useState(0);
  const [checkMintArray, setCheckMintArray] = useState([]);
  const [ownedNFTs, setOwnedNFTs] = useState([]);
  const [currentTime, setCurrentTime] = useState(Number(new Date()));
  const [unStakingPeriod, setUnstakingPeriod] = useState(0);
  const [youStaked, setYouStaked] = useState(0);
  const [rewardAmount, setRewardAmount] = useState(0);
  const [rewardAddress, setRewardAddress] = useState("");
  const [claimable, setClaimable] = useState(0);
  // const { isMobile } = useWindowSize(1000);
  // const [owner, setOwner] = useState("");
  // const [balance, setBalance] = useState(0);
  // const output = useAppSelector((state) => state.console.output);
  const account = useAppSelector((state) => state.accounts.keplrAccount);

  const mintContract = useAppSelector(
    (state) => state.accounts.accountList[contractAddresses.MINT_CONTRACT]
  );
  const nftContract = useAppSelector(
    (state) => state.accounts.accountList[contractAddresses.NFT_CONTRACT]
  );
  const stakingContract = useAppSelector(
    (state) => state.accounts.accountList[contractAddresses.STAKING_CONTRACT]
  );
  const { connect } = useKeplr();
  const fetchState = async () => {
    if (!account || !mintContract) return;
    const mintResult = await runQuery(mintContract, {
      get_state_info: {},
    });
    setMaxNfts(Number(mintResult.total_nft));
    setMintedNfts(Number(mintResult.count));
    setCheckMintArray(mintResult.check_mint);
    setPrice((Number(mintResult.price) / 1000000).toString());
    const currentTime = await runQuery(stakingContract, {
      get_current_time: {},
    });
    setCurrentTime(currentTime ? currentTime * 1000 : Number(new Date()));
  };
  const fetchNFT = async () => {
    if (!account || !nftContract) return;
    const tokens = await runQuery(nftContract, {
      tokens: {
        owner: account.address,
        start_after: undefined,
        limit: undefined,
      },
    });
    const genTokens = tokens.tokens.map((doc: string) => {
      return { id: doc, item: { status: "stake" } };
    });
    const stakedTokens = await runQuery(stakingContract, {
      get_my_info: {
        address: account.address,
      },
    });
    setYouStaked(stakedTokens.length);
    const genStakedTokens = stakedTokens.map((doc: any) => {
      return { id: doc.token_id, item: doc };
    });
    setOwnedNFTs(genTokens.concat(genStakedTokens));
    const stakingStateInfo = await runQuery(stakingContract, {
      get_state_info: {},
    });
    console.log(stakingStateInfo);
    setRewardAddress(stakingStateInfo?.reward_wallet || "");
    setUnstakingPeriod(stakingStateInfo?.staking_period || 0);
  };
  const handleChangeRewardAmount = (e: any) => {
    const {
      target: { value },
    } = e;
    setRewardAmount(value);
  };
  const handleDistributeRewards = async () => {
    if (!account || rewardAmount <= 0) return;

    // fetch hope balance
    // distribute
    try {
      await runExecute(
        stakingContract.address,
        {
          distribute_reward: {
            token_balance: "0",
          },
        },
        { funds: "" + rewardAmount }
      );
      toast.success("Distributed");
    } catch (err) {
      console.log("err: ", err);
      toast.error("Fail!");
      return;
    }
  };
  const handleClaimRewards = async () => {
    const stakedNFTIds: any = [];
    let totalReward: number = 0;
    ownedNFTs.map((item: any) => {
      if (Number(item.item?.reward_juno) > 0) {
        stakedNFTIds.push(item.id);
        totalReward += Number(item.item?.reward_juno);
      }
      return null;
    });
    setClaimable(totalReward);
    console.log("ownedNFTs: ", ownedNFTs);
    console.log("stakedNFTIds: ", stakedNFTIds);
    if (stakedNFTIds.length === 0) {
      toast.error("Nothing To Claim");
      return;
    }
    try {
      await runExecute(stakingContract.address, {
        get_reward: {
          token_ids: stakedNFTIds,
        },
      });
      if (fetchNFT) await fetchNFT();
      toast.success("Success");
      // fetchNFT();
    } catch (err) {
      console.log("err: ", err);
      toast.error("Fail!");
    } finally {
    }
  };
  useEffect(() => {
    setInterval(() => {
      fetchState();
      // connect();
    }, 3000);

    return clearInterval();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchNFT();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const mint = async () => {
    console.log("here");
    if (!mintContract) {
      toast.error("Mint contract not found!");
      return;
    }
    console.log(maxNfts, mintedNfts);
    if (maxNfts <= mintedNfts) {
      toast.error("All nfts are minted!");
      return;
    }
    let mintIndexArray: number[] = [];
    checkMintArray.forEach((item: boolean, index: number) => {
      if (item) mintIndexArray.push(index);
    });
    const selectedIndex = mintIndexArray.sort(() => 0.5 - Math.random()).pop();
    const message = {
      mint: { rand: `${(selectedIndex || 0) + 1}` },
    };
    console.log("message", message);
    try {
      await runExecute(mintContract.address, message, {
        funds: price,
      });
      toast.success("Success!");
    } catch (err) {
      console.error(err);
      toast.error("Fail!");
    }
  };
  const callback = () => {
    console.log("staking button clicked");
    fetchNFT();
  };
  return (
    <Container>
      <SubArea>
        <Wrapper>
          {ownedNFTs.map((nftItem: any, nftIndex) => (
            <NFTItem
              key={nftIndex}
              id={nftItem.id}
              item={nftItem.item}
              currentTime={currentTime}
              callback={callback}
              unStakingPeriod={unStakingPeriod}
            />
          ))}
        </Wrapper>
      </SubArea>
      {/* {account?.address === rewardAddress && ( */}
      <GetRewardArea>
        <Input
          type="number"
          value={rewardAmount}
          onChange={handleChangeRewardAmount}
          min="0"
        />
        <StyledButton onClick={handleDistributeRewards}>
          Distribute
        </StyledButton>
      </GetRewardArea>
      {/* )} */}
      <ButtonArea>
        <Flex style={{ justifyContent: "space-between" }}>
          <ButtonWrapper>
            <div>1 Mint = 8 Juno (max 20)</div>
            <StyledButton onClick={mint}>Mint</StyledButton>
            <div
              style={{ fontSize: "25px", fontWeight: "800" }}
            >{`${mintedNfts}/${maxNfts}`}</div>
          </ButtonWrapper>
          <ButtonWrapper>
            <div>Claim Rewards</div>
            <StyledButton onClick={handleClaimRewards}>Claim</StyledButton>
            <div
              style={{ fontSize: "25px", fontWeight: "800" }}
            >{`${claimable} Juno Claimable`}</div>
          </ButtonWrapper>
          <ButtonWrapper>
            <div>Unstake Period 21 Days</div>
            <StyledButton>Stake</StyledButton>
            <div
              style={{ fontSize: "25px", fontWeight: "800" }}
            >{`${youStaked}/${mintedNfts}`}</div>
          </ButtonWrapper>
        </Flex>
      </ButtonArea>
    </Container>
  );
};

export default Main;
