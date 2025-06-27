import styled from "styled-components";

export const StyledDateTitle = styled.div`
    font: 400 22px / 28px "Google Sans", Roboto, Arial, sans-serif;
    letter-spacing: 0;
    white-space: nowrap;
    color: ${({ theme }) => theme.text};
`
export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;