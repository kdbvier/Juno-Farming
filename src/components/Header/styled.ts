import styled from "styled-components";
import Button from "../Button";

export const HeaderWrapper = styled.div`
  height: 120px;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 30px;
  justify-content: center;
  position: relative;
`;

export const HeaderLogo = styled.div`
  background: url("/logo.png");
  background-size: cover;
  background-position: center;
  width: 183px;
  height: 60px;
  cursor: pointer;
`;

export const HeaderBackToHomeButton = styled.div`
  color: white;
  height: 60px;
  display: flex;
  align-items: flex-end;
  padding-bottom: 25px;
`;

export const DisconnectIcon = styled.img`
  margin-left: 10px;
  width: 20px;
  height: 20px;
`;
export const Text = styled.div`
  color: white;
  font-size: 32px;
  font-weight: 500;
  margin-left: 20px;
`
export const MenuIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  cursor: pointer;
  position: relative;
`;

export const MenuIcon = styled.div``;

export const MenuContainer = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
    0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
  display: flex;
  flex-direction: column;
  padding-top: 8px;
  padding-bottom: 8px;
  z-index: 2;
`;

export const MenuItem = styled.div`
  text-align: left;
  padding: 6px 16px;
  display: flex;
  align-items: center;
  font-size: 1rem;
  line-height: 1.5;
  width: max-content;
  letter-spacing: 0.00938rem;
  color: black;
`;

export const MoreButton = styled(Button)`
  width: 120px;
  height: 23px;
  border-radius: 10px;
  margin: 0 auto;
`
export const StyledButton = styled(Button)`
  border-radius: 10px;
  width: 157px;
  height: 45px;
  margin: 0 10px;
  padding: 10px;
`;

export const LogoWrapper = styled.div`
  font-size: 36px;
  font-weight: bold;
`

export const StyledSpan = styled.span`
  font-size: 30px;
  margin: 10px;
  font-weight: bold;
`