import styled from 'styled-components';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { Badge, NavDropdown, Popover } from 'react-bootstrap';

export const AppWrapper = styled.div`
  font-family: 'Noto Sans', sans-serif;
`;

export const HelpHeading = styled.h1`
  color: #c9ac5f;
`;

export const HelpSection = styled.div`
  margin: ${(props) => (props.marginTop ? '5vh' : 0)} 5vw 5vh;
`;

export const HelpText = styled.p`
  margin: 0 0 12px 15px;
`;

export const MiradorWrapper = styled.div`
  flex: 3;
  height: 100%;
  position: relative;
`;

export const PageWrapper = styled.div`
  height: ${(props) => (props.height ? props.height : '100%')};
  width: 100vw;
  display: flex;
  flex-direction: ${(props) => (props.flexDirection ? props.flexDirection : 'row')};
`;

export const PopoverHeader = styled(Popover.Header)`
  color: #3e5276;
  padding: 0.5rem 1rem;
  margin-bottom: 0;
  font-size: 1rem;
  background-color: #f0f0f0;
  border-bottom: 1px solid rgba(0,0,0,.2);
  border-top-left-radius: calc(0.3rem - 1px);
  border-top-right-radius: calc(0.3rem - 1px);
`;

export const StyledBadge = styled(Badge)`
  margin-left: 10px;
`;

export const StyledForm = styled.form`
  padding: 10px 0;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const StyledH1 = styled.h1`
  > a {
    color: #c9ac5f;
    font-size: 40px;
    font-weight: 700;
    font-style: italic;
    letter-spacing: .2rem;
    margin: 0;
    text-decoration: none;
  }
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

export const StyledLink = styled.a`
  color: #c9ac5f;
  width: 250px;
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : 0)}px;

  &:hover, &:focus {
    outline: none;
    cursor: pointer;
    color: #3e5276;
  }
  &:hover {
    transition: 500ms ease;
  }
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

export const StyledNavDropdown = styled(NavDropdown)`
  &&& > a {
    color: #fff;
    font-size: 18px;
    text-decoration: none;

    &:hover, &:focus {
      outline: none;
      cursor: pointer;
      color: #c9ac5f;
    }
    &:hover {
      transition: 500ms ease;
    }
  }
`;

export const StyledNavDropdownItem = styled(NavDropdown.Item)`
  color: #3e5276;
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

export const StyledNCButton = styled.div`
  color: #3e5276;
  background: #c9ac5f;
  border-radius: 50%;
  height: 25px;
  width: 25px;
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

export const TranscriptionPanel = styled.div`
  flex: 2;
  display: flex;
  border: 2xp solid #3D3D3D;
`;

export const Word = styled.h4`
  color: #3e5276;
  font-weight: 700;
  margin-bottom: 4px;
`;
