import styled from 'styled-components';
import mainBackground from "../images/user-template.png";

const Wrapper = styled.div`
  font-family: 'Montserrat', sans-serif;
`;

const Main = styled.form`
  background: url(${mainBackground});
  box-shadow: rgb(136 136 136) -3px 6px 8px;
  display: flex;
  width: 20%;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10%;
  padding: 5rem;
  border-radius: 1rem;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Text = styled.span`
  margin-top: auto;
  margin-bottom: auto;
`;

const StyledInput = styled.input`
  padding: 0.75rem 0.5rem;
  font-size: 14px;
`;

const ErrorMessage = styled.span`
  padding: 0.75rem 0.5rem;
  font-size: 14px;
`;

const StyledButton = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  width: 75%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-right: auto;
  margin-left: auto;
  cursor: pointer;
`;

const Dashboard = () => {

   return (<></>);
}

export default Dashboard;
