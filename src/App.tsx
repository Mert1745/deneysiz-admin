import React from "react";
import './App.css';
import LoginPage from "./pages/LoginPage";
import styled from "styled-components";
import Header from "./components/Header";
import background from "./images/background-pattern.jpg";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Dashboard from "./pages/Dashboard";

const Wrapper = styled.div`
  min-height: 100vh;
  background: url(${background});
`

function App() {
    return (
        <BrowserRouter>
            <Wrapper>
                <Header/>
                <Switch>
                    <Route path="/" component={LoginPage} exact/>
                    <Route path="/dashboard" component={Dashboard} exact/>
                </Switch>
            </Wrapper>
        </BrowserRouter>
    );
}

export default App;
