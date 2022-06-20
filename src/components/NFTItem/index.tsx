import React, { useState, useMemo } from "react";
import { toast } from "react-toastify";
import useContract, { contractAddresses } from "../../hook/useContract";
import { useAppSelector } from "../../app/hooks";
import { formatDurationTime } from "../../util/formatTime";
import { NFTItemWrapper, StyledButton } from "./styled";

export interface NFTItemProps {
  id: string;
  callback: any;
  item: any;
  currentTime: number;
  unStakingPeriod?: number;
}

export const NFTItemStatus = {
  STAKE: "stake",
  UNSTAKE: "Staked",
  UNSTAKED: "Unstaking",
  WITHDRAW: "withdraw",
};

export const ButtonType: any = {
  stake: "Stake",
  Staked: "Unstake",
  Unstaking: "Unstaking",
};

export default function NFTItem({
  id,
  callback,
  item,
  currentTime,
  unStakingPeriod,
}: NFTItemProps) {
  const [sendingTx, setSendingTx] = useState(false);
  const { runExecute } = useContract();
  // const nftContract = useAppSelector(
  //   (state) => state.accounts.accountList[contractAddresses.NFT_CONTRACT]
  // );
  const stakingContract = useAppSelector(
    (state) => state.accounts.accountList[contractAddresses.STAKING_CONTRACT]
  );
  const unStakeTime = useMemo(
    () => (item?.unstake_time ? item.unstake_time * 1000 : currentTime),
    [currentTime, item]
  );

  const passedPeriod = useMemo(
    () => currentTime - unStakeTime,
    [currentTime, unStakeTime]
  );
  const remainTime = useMemo(
    () => unStakeTime + (unStakingPeriod || 0) * 1000 - currentTime,
    [currentTime, unStakeTime, unStakingPeriod]
  );
  const { duration } = formatDurationTime(remainTime);

  const isPassedPeriod =
    !!unStakingPeriod && passedPeriod / 1000 > unStakingPeriod;
  const stakeUnstakeDisabled = useMemo(
    () =>
      sendingTx || (item.status === NFTItemStatus.UNSTAKED && !isPassedPeriod),
    [isPassedPeriod, sendingTx, item.status]
  );

  const handleClickStakeUnstakeButton = async () => {
    if (stakeUnstakeDisabled) return;
    if (item.status === NFTItemStatus.STAKE) {
      try {
        setSendingTx(true);
        await runExecute(contractAddresses.NFT_CONTRACT, {
          send_nft: {
            contract: stakingContract.address,
            token_id: id,
            msg: btoa("staking"),
          },
        });
        toast.success("Success");
        callback();
        // fetchNFT();
      } catch (err) {
        console.log("err: ", err);
        toast.error("Fail!");
      } finally {
        setSendingTx(false);
      }
    } else if (item.status === NFTItemStatus.UNSTAKE) {
      try {
        setSendingTx(true);
        await runExecute(contractAddresses.STAKING_CONTRACT, {
          unstake_nft: {
            token_id: id,
          },
        });
        toast.success("Success");
        callback();
        // fetchNFT();
      } catch (err) {
        console.log("err: ", err);
        toast.error("Fail!");
      } finally {
        setSendingTx(false);
      }
    } else if (item.status === NFTItemStatus.UNSTAKED && isPassedPeriod) {
      try {
        setSendingTx(true);
        await runExecute(stakingContract.address, {
          withdraw_nft: {
            token_id: item.token_id,
          },
        });
        toast.success("Success");
        callback();
        // fetchNFT();
      } catch (err) {
        console.log("err: ", err);
        toast.error("Fail!");
      } finally {
        setSendingTx(false);
      }
    }
  };
  return (
    <NFTItemWrapper state={item.status}>
      <div>Juno Farming NFT</div>
      <img src="/logo.svg" alt="logo" />
      <div style={{ fontSize: "15px", fontWeight: "800" }}>
        {id.replace("Sunny.", "")}
      </div>
      <StyledButton
        onClick={handleClickStakeUnstakeButton}
        disabled={stakeUnstakeDisabled}
      >
        {item.status === NFTItemStatus.UNSTAKED && !stakeUnstakeDisabled
          ? "Withdraw"
          : ButtonType[item.status]}
      </StyledButton>
      <div>
        {item.status === NFTItemStatus.UNSTAKED &&
          !isPassedPeriod &&
          (duration?.days
            ? `${duration.days} Days remaining`
            : duration?.hrs
            ? `${duration.hrs} Hours remaining`
            : duration?.mins
            ? `${duration.mins} Minutes remaining`
            : duration?.secs
            ? `${duration.secs} Seconds remaining`
            : "Ready to Withdraw")}
      </div>
    </NFTItemWrapper>
  );
}
