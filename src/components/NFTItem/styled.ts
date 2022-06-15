import styled from "styled-components";
import Button from "../Button";

export const NFTItemWrapper = styled.div<{state:string}>`
  width: 134px;
  height: 184px;
  font-size: 10px;
  border-radius: 10px;
  border: 2px solid ${({state})=>state==="stake"?'#FFFFFF':(state==='unstake'?"#FFDD35":"#F27816")};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
  @media (max-width: 768px) {
    width: 200px;
    height: 309px;
  }
`;

export const StyledButton = styled(Button)`
  width: 87px;
  height: 20px;
`