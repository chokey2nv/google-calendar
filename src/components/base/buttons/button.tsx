import styled from "styled-components";

export const Button = styled.button`
  padding: 20px;
  border: none;
  color: ${props => props.theme.text};
  border-radius: 24px;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  cursor: pointer;
  display: flex;
  gap: 10px;
  block-size: 40px;
  border: solid 1px #747775;
  background-color: ${props => props.theme.primary};
  text-transform: capitalize;
  &:hover {
    background-color: ${props => props.theme.btnHover};
    border-color: #747775;
  }
`;