import styled from "styled-components";

const Button = styled.div<{disabled?: boolean}>`
  background: ${({disabled})=>disabled?'#F27816':'#FFDD35'};
  color: ${({disabled})=>disabled?'#FFDD35':'#F27816'};
  cursor: pointer;
  user-select: none;
  display: flex;
  font-weight: 800;
  font-size: 15px;
  justify-content: center;
  align-items: center;
  text-align: center;
  &:hover {
    color: #FFDD35;
    background: #F27816;
  }
`

export default Button;