import React, { useState } from "react";
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
// const ListIcon = (
//   <svg
//     width="63"
//     height="55"
//     viewBox="0 0 63 55"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <rect x="20.644" y="20.4805" width="24" height="2" rx="1" fill="#ffffff" />
//     <rect x="20.644" y="26.4805" width="24" height="2" rx="1" fill="#ffffff" />
//     <rect x="20.644" y="32.4805" width="24" height="2" rx="1" fill="#ffffff" />
//   </svg>
// );

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.accounts.keplrAccount);
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
  // const handleOpenMenu = () => {
  //   setIsOpenMenu(!isOpenMenu);
  // };
  // const handleClickLink = (url: string) => {
  //   window.open(url);
  // };
  // const handleClickOutsideMenuIcon = () => {
  //   setIsOpenMenu(false);
  // };
  // useOnClickOutside(ref, handleClickOutsideMenuIcon);
  return (
    <HeaderWrapper>
      {!isMobile && (
        <LogoWrapper>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src="/logo.svg" alt="logo" />
            <div> Juno Farming NFT</div>
          </div>
          <MoreButton>Read more...</MoreButton>
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
    </HeaderWrapper>
  );
};

export default Header;
