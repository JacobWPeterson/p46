import styled from 'styled-components';
import Nav from 'react-bootstrap/Nav';
import {
  Alert, Badge, Container, Navbar, NavDropdown, Popover,
} from 'react-bootstrap';

export const AboutPageLower = styled.div`
  width: 90vw;
  display: flex;
  background: #d3d3d3;
  height: 400px;
  align-items: center;
  justify-content: space-evenly;
  margin: 5vh auto;
`;

export const AboutPageMiddle = styled.div`
  width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin: auto;
`;

export const AboutPageUpper = styled.div`
  width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin: 5vh auto;
`;

export const AboutPageLowerSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AppWrapper = styled.div`
  font-family: 'Noto Sans', sans-serif;
  position: relative;
  min-height: 100vh;
  padding-bottom: 50px;
`;

export const Copyright = styled.div`
  padding: 8px 16px;
  color: #3e5276;
`;

export const HelpSection = styled.div`
  margin: ${(props) => (props.marginTop ? '5vh' : 0)} 5vw 5vh;
`;

export const HelpText = styled.p`
  margin: 0 0 12px 15px;
`;

export const HomeFeatureWrapper = styled.div`
  display: flex;
  color: #3e5276;
  margin: 7vh 0 5vh;
  justify-content: space-evenly;
`;

export const HomeLowerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: #3e5276;
  margin: 5vh 0;
`;

export const HomeMiddleWrapper = styled.div`
  height: 20vh;
  color: #fff;
  font-size: 28px;
  display: flex;
  flex-direction: column;
  margin: 2vh 0;
  background-color: #c9ac5f;
  justify-content: space-evenly;
  align-items: center;
`;

export const HomeTextContainer = styled.div`
  min-width: 450px;
  font-size: 28px;
  padding: 20px;
  margin; auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const HomeUpperWrapper = styled.div`
  display: flex;
  margin: 5vh 0;
  justify-content: center;
  align-items: center;
`;

export const MiradorWrapper = styled.div`
  flex: 3;
  height: 100%;
  position: relative;
`;

export const PageWrapper = styled.div`
  height: ${(props) => (props.height ? props.height : '100%')};
  width: 98vw;
  margin: auto;
  display: flex;
  flex-direction: ${(props) => (props.flexDirection ? props.flexDirection : 'row')};
`;

export const Partner = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  width: 200px;
  align-items: center;
  margin: 20px;
`;

export const Partners = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  min-width: 50vw;
  padding: 20px 0 0 0;
`;

export const PartnerText = styled.p`
  color: ${(props) => (props.color ? props.color : '#606060')};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '24px')};
  font-family: ${(props) => (props.fontFamily ? props.fontFamily : 'inherit')};
  font-style: ${(props) => (props.fontStyle ? props.fontStyle : 'normal')};
  letter-spacing: ${(props) => (props.letterSpacing ? props.letterSpacing : 'normal')};
  margin: 0;
  padding: ${(props) => (props.padding ? props.padding : '20px 0')};
  text-align: center;
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

export const SectionHalf = styled.div`
  width: 42%;
  background: ${(props) => (props.background)};
  padding: 25px;
  border-radius: 20px;
`;

export const StyledAlert = styled(Alert)`
  position: absolute;
  z-index: 100;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #c9ac5f;
  padding: 12px 16px;
`;

export const StyledBadge = styled(Badge)`
  margin: 5px 0 0 10px;
`;

export const StyledButton = styled.button`
  color: ${(props) => (props.color ? props.color : '#fff')};
  background: ${(props) => (props.background ? props.background : '#3e5276')};
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}px` : 'inherit')};
  text-align: center;
  line-height: 1em;
  padding: ${(props) => (props.padding ? props.padding : '2px 5px')};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '0')};
  height: ${(props) => (props.height ? props.height : 25)}px;
  border: none;
  border-radius: 5px;

  &:focus {
    background: ${(props) => (props.background ? props.background : '#3e5276')}85;
    border: none;
    outline: none;
  }

  &:disabled {
    background: #c9ac5f95;
    color: #3e5276;
  }
`;

export const StyledContainer = styled(Container)`
  &&& {
    max-width: 100%;
    background: #3e5276;
    padding: 5px 50px;
  }
`;

export const StyledCustomPillBadge = styled.div`
  color: #3e5276;
  background: ${(props) => (props.background ? props.background : '#3e5276')};
  display: inline-block;
  margin: ${(props) => (props.margin ? props.margin : '5px 0 0 10px')};
  padding: ${(props) => (props.padding ? props.padding : '0.35em 0.65em')};
  font-size: .75em;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: center;
  border-radius: 50rem !important;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
  border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

export const StyledFooter = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 5px solid #c9ac5f;
`;

export const StyledForm = styled.form`
  padding: 10px 0;
  width: 100%;
  display: flex;
  align-items: flex-start;
`;

export const StyledH1 = styled.h1`
  color: ${(props) => (props.color ? props.color : '#c9ac5f')};
  text-align: ${(props) => (props.textAlign ? props.textAlign : 'left')}
`;

export const StyledH2 = styled.h2`
  font-weight: 700;
  text-align: center;
  color: ${(props) => (props.color ? props.color : 'inherit')};
`;

export const StyledImage = styled.img`
  width: 100%;
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : 400)}px;
  height: auto;
  border: 5px solid ${(props) => props.borderColor};
  border-radius: 5px;
`;

export const StyledInput = styled.input`
  height: 30px;
  font-size: 16px;
  padding: 2px 5px;
`;

export const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 250px;
  width: 20vw;
  margin: 0 10px;
`;

export const StyledLabel = styled.label`
  color: #3e5276;
  width: 55px;
`;

export const StyledLine = styled.div`
  display: flex;
  color: ${(props) => (props.color ? props.color : '#606060')};
  font-size: ${(props) => (props.fontSize ? props.fontSize : 'inherit')};
  padding-left: ${(props) => (props.paddingLeft ? props.paddingLeft : 0)}px;
  align-self: ${(props) => (props.alignSelf ? props.alignSelf : 'auto')}
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

export const StyledNavbar = styled(Navbar)`
  border-top: ${(props) => (props.bordertop ? props.bordertop : 'none')};
  padding-top: 0;
`;

export const StyledNavbarBrand = styled(Navbar.Brand)`
  &&& {
    color: #c9ac5f;
    font-size: 28px;
    font-weight: 400;
    font-style: italic;
    letter-spacing: .2rem;
    text-decoration: none;
  }
`;

export const StyledNavbarToggle = styled(Navbar.Toggle)`
  &&& {
    border-color: #c9ac5f;
  }
`;

export const StyledNavDropdown = styled(NavDropdown)`
  &&& > a {
    color: #fff;
    text-decoration: none;

    &:hover, &:focus {
      outline: none;
      cursor: pointer;
      color: #c9ac5f;
    }
    &:focus {
      text-decoration: underline;
    }
    &:hover {
      transition: 500ms ease;
    }
  }
`;

export const StyledNavDropdownItem = styled(NavDropdown.Item)`
  color: #3e5276;
  text-decoration: none;

  &:hover, &:focus {
    outline: none;
    cursor: pointer;
    color: #c9ac5f
  }
  &:focus {
    text-decoration: underline;
  }
  &:hover {
    transition: 500ms ease;
  }
`;

export const StyledNavLink = styled(Nav.Link)`
  &&& {
    color: ${(props) => (props.color ? props.color : '#fff')};
    text-decoration: none;
    padding: 8px 16px;

    &:hover, &:focus {
      outline: none;
      cursor: pointer;
      color: #c9ac5f;
    }
    &:focus {
      text-decoration: underline;
    }
    &:hover {
      transition: 500ms ease;
    }
  }
`;

export const StyledP = styled.p`
  width: ${(props) => (props.width ? props.width : '100%')};
  margin: auto;
  color: #606060;
  font-size: ${(props) => (props.fontSize ? props.fontSize : '24')}px;
  font-style: ${(props) => (props.fontStyle ? props.fontStyle : 'normal')};
  text-align: ${(props) => (props.textAlign ? props.textAlign : 'left')};
  letter-spacing: .03em;
`;

export const StyledSmall = styled.small`
  color: #6c757d;
  margin-top: 0.25rem;
  font-size: .8em;
`;

export const StyledSpan = styled.span`
  color: ${(props) => (props.color ? props.color : '#3c444d')};
  font-size: 48px;
  padding-right: ${(props) => (props.paddingRight ? props.paddingRight : 0)}px;
  padding-left: ${(props) => (props.paddingLeft ? props.paddingLeft : 0)}px;
`;

export const TranscriptionContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  overflow-y: scroll;
  padding: 2vh 0 2vh 2vw;
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

export const UnorderedList = styled.ul`
  list-style-type: square;
`;

export const ListItem = styled.li`
  color: #c9ac5f;
  margin-left: 20px;
  padding: 10px 0 10px 10px;
  font-size: 20px;
  > span {
      color: ${(props) => (props.color ? props.color : '#3e5276')};
  }
`;

export const Word = styled.h4`
  color: #3e5276;
  font-weight: 700;
  margin-bottom: 4px;
`;
