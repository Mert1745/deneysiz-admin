import styled from 'styled-components';
import logo from "../images/logo.jpg";

const Wrapper = styled.header`
  width: 100%;
  background: white;
  font-family: 'Montserrat', sans-serif;
`;

const Logo = styled.img`
  
`

const Header = () => {
    return (
        <Wrapper>
            <Logo src={logo} alt={"logo"}/>
        </Wrapper>
    );
}

export default Header;
