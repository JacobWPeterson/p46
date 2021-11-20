import styled from 'styled-components';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";

export const AppWrapper = styled.div`
  font-family: 'Noto Sans', sans-serif;
`;

export const MiradorWrapper = styled.div`
  flex: 3;
  height: 100%;
  position: relative;
`;

export const PageWrapper = styled.div`
  height: 85vh;
  width: 100vw;
  display: flex;
`;

export const StyledForm = styled.form`
  padding: 10px 0;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const StyledH1 = styled.h1`
  color: #c9ac5f;
  font-size: 40px;
  font-weight: 700;
  font-style: italic;
  letter-spacing: .2rem;
  margin: 0;
`;

export const StyledInput = styled.input`
  min-width: 250px;
  height: 30px;
  font-size: 16px;
  width: 20vw;
  margin: 0 10px;
  padding: 2px 5px;
`;

export const StyledLabel = styled.label`
  color: #3e5276;
`;

export const StyledNav = styled(Nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  background: #3e5276;
  color: #fff;
  padding: 0 50px;
`;

export const StyledNavItemsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  height: 100%;
`;

export const StyledNavItem = styled(Nav.Item)`
  padding: 0 20px;
`;

export const StyledNavLink = styled(Link)`
  color: #fff;
  font-size: 18px;
  text-decoration: none;

  &:hover, &:focus {
    outline: none;
    cursor: pointer;
    color: #c9ac5f;
    text-decoration: underline;
  }
  &:hover {
    transition: 500ms ease;
  }
`;

export const StyledSubmitIcon = styled.div`
  color: #fff;
  background: ${props => props.submitMessage === "√" ? 'green' : 'red'};
  border-radius: 50%;
  height: 20px;
  width: 20px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledSubmitButton = styled.button`
  color: #fff;
  background: #3e5276;
  height: 25px;
  border: none;
  border-radius: 5px;
    &:focus {
      background: #3e527685;
      border: none;
      outline: none;
    }
`;

export const TranscriptionContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  overflow-y: scroll;
  padding: 2vh 2vw;
`;

export const TranscriptionHeader = styled.h2`
  color: #3e5276;
  margin-bottom: 5px;
`;

export const TranscriptionSubtitle = styled.a`
  color: #c9ac5f;
  margin-bottom: 10px;
`;

export const TranscriptionPanel = styled.div`
  flex: 2;
  display: flex;
  border: 2xp solid #3D3D3D;
`;
