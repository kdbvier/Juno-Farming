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
          <Modal.Title>Read Me</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ fontSize: "20px" }}>
            JunoFarming wants to be a community driven project.
            <br />
            This means that anyone inside the project is free to express their
            ideas.
            <br />
            We want to build something solid with you, which allows everyone to
            trade while making money.
            <br />
            The first step is to trust us, through the sale, the trading of the
            first NFT collection.
            <br />
            How it works?When the first mint is done , the buyer will be able to
            stake the NFT.
            <br />
            The staker then will take from the second mint 50% of price.
            <br />
            Now then the second one is able too to stake the NFT , then when the
            third mint is done the first and the second staker will take 50% of
            price of the third NFT,that means 25% for the first one and 25% for
            the second one.
            <br />
            So will work until all NFT are sold.When then the collection we be
            sold out every stakers will earn from the trading in the marketplace
            with the same system.
            <br />
            But pay attention if you didn't staked your NFT you will not be able
            to earn, and also if you will make an unstake of your NFT.
            <br />
            Other important thing is that every buyer will be able to stake up
            20 NFT , more NFT you stake more you will earn.
            <br />
            20 nft is the maximum a person can have in the walletSecondly we
            would like to create a second nft collection, and the first 500
            stakers of the first one will receive 1 nft of the second collection
            for free!Who up to that moment has not staked or has entered late
            will then have to buy the nft of the second collection.
            <br />
            As already mentioned it is a community driven project, so come
            forward and propose your ideas and we will realize them together!
          </p>
        </Modal.Body>
      </Modal>
    </HeaderWrapper>
  );
};

export default Header;
