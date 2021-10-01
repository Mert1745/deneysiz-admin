import React from "react";
import './App.css';
import LoginPage from "./pages/LoginPage";
import styled from "styled-components";
import Header from "./components/Header";
import background from "./images/background-pattern.jpg";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NewBrand from "./pages/NewBrand";
import {EditBrand} from "./pages/EditBrand";

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
                    <Route path="/brand/new" component={NewBrand} exact/>
                    <Route path="/brand/edit" component={EditBrand} exact/>
                </Switch>
            </Wrapper>
        </BrowserRouter>
    );
}

export default App;
