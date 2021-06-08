import './App.css';
import LoginPage from "./pages/LoginPage";
import styled from "styled-components";
import Header from "./components/Header";
import background from "./images/background-pattern.jpg";

const Wrapper = styled.div`
  min-height: 100vh;
  background: url(${background});
`

function App() {
    return (
        <Wrapper>
            <Header/>
            <LoginPage/>
        </Wrapper>
    );
}

export default App;
