import React from "react";
import { Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import useWindowSize from "../../hook/useWindowSize";
// import useOnClickOutside from "../../hook/useOnClickOutside";
import { setKeplrAccount } from "../../features/accounts/accountsSlice";
import { useKeplr } from "../../features/accounts/useKeplr";
import {
  HeaderWrapper,
  // HeaderLogo,
  StyledButton,
  DisconnectIcon,
  // MenuIcon,
  // MenuIconContainer,
  // MenuContainer,
  // MenuItem,
  MoreButton,
  LogoWrapper,
  StyledSpan,
} from "./styled";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.accounts.keplrAccount);
  const [show, setShow] = React.useState(false);
  // const [ref, setRef] = useState<HTMLDivElement | null>(null); // TODO: must use useRef
  // const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { connect } = useKeplr();
  const { isMobile } = useWindowSize(800);
  const clickWalletButton = () => {
    if (!account) {
      connect();
    } else {
      dispatch(setKeplrAccount());
    }
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  return (
    <HeaderWrapper>
      {!isMobile && (
        <LogoWrapper>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src="/logo.svg" alt="logo" />
            <div> Juno Farming NFT</div>
          </div>
          <MoreButton onClick={handleShow}>Read more...</MoreButton>
        </LogoWrapper>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "absolute",
          right: "10px",
        }}
      >
        <StyledButton onClick={clickWalletButton}>
          {account ? (
            <>
              {account.label}
              <DisconnectIcon alt="" src="/others/logout.png" />
            </>
          ) : (
            "Connect Wallet"
          )}
        </StyledButton>
      </div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>WHITEPAPER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ fontSize: "20px" }}>
            JunoFarming aims to be a community driven project.
            <br /> This means that anyone involved with the project is free to
            express their own opinions and ideas. We want to build something
            solid with and for you, which allows everyone to trade while earning
            passive income. <br />
            By trusting JunoFarming team through the sale and the trading of the
            first NFT collection we are already achieving it. <br />
            <StyledSpan>How it works?</StyledSpan>
            <br />
            Rewards will be distributed for the first 21 days daily, after 21 days they will be weekly
            50% of each new mint or trade goes into a wallet dedicated to
            rewarding stakers. <br />
            Those rewards will then be divided equally amongst stakers.
            <br />
            For example, if there are 200 staked and that day there were mint
            and trades worth a total of 200 $JUNO, then earnings will be 1 $JUNO
            per staked NFT.
            <br /> If someone staked 5 NFTs then his/hers daily claim will be 5
            $JUNO(5x1) for the current day. <br />
            As soon as the first collection is sold out, every staker will earn
            from the trading volume of the 1st collection in the marketplace
            based on the same system(50/50).
            <br /> We are currently working on the second collection which will
            be released really soon! Additionally, stakers of the 1st collection
            will start earning from the minting and trading of the 2nd
            collection.
            <br />
            <StyledSpan>Airdrop Info:</StyledSpan>
            <br />
            The first 500 stakers of the 1st collection will be airdropped 1 NFT
            from the 2nd collection! 1 NFT for each NFT staked!! For example, if
            you own and stake 10 JunoFarming NFTs, you will be airdropped 10
            NFTs from the 2nd collection! Whoever's not staking or entered late
            after the 500 mints, will have to buy the NFTs of the 2nd collection
            using .<br />
            <StyledSpan>ATTENTION</StyledSpan>
            <br /> If someone didn't stake JunoFarming NFTs, or unstake for any
            reason, won't be able to earn rewards.
            <br /> Moreover, every buyer will have the chance to mint 20 JunoFarming NFTs(maximum per wallet), consequently the more
            NFT you stake the more you earn.
            <br />
            As previously mentioned, JunoFarming is a community driven project,
            so step forward, discuss and propose your ideas, and we can work
            together towards success! Thanks for your time
          </p>
        </Modal.Body>
      </Modal>
    </HeaderWrapper>
  );
};

export default Header;
