import styled from 'styled-components';
import mainBackground from "../images/user-template.png";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {AdminResponse} from "../type/types";

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
  font-size: 17px;
  margin-right: auto;
  margin-left: auto;
  text-decoration: underline;
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

const LoginPage = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [loginSuccess, setLoginSuccess] = useState<any>(undefined);

    const onSubmit = (data: any) => {
        setLoginSuccess(undefined);
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({userName: data.username, password: data.password})
        };
        //TODO mkose get url from environment
        fetch("http://localhost:8080/admin/login", requestOptions)
            .then(response => response.json())
            .then((data: AdminResponse) => {
                setLoginSuccess(data.success);
                if (data.success) {
                    localStorage.setItem("token", data.token);
                    window.location.href = "/dashboard";
                }
            });
    };

    return (
        <Wrapper>
            <Main onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Text>Kullanıcı Adı: </Text>
                    <StyledInput {...register("username", {required: true})}/>
                </Row>
                <Row>
                    <Text>Şifre: </Text>
                    <StyledInput {...register("password", {required: true})}/>
                </Row>
                <Row>
                    <StyledButton type="submit">Giriş Yap</StyledButton>
                </Row>
                <Row>
                    {errors.username && errors.password &&
                    <ErrorMessage>Tüm alanların doldurulması zorunludur</ErrorMessage>}
                    {loginSuccess !== undefined && !loginSuccess &&
                    <ErrorMessage>Kullanıcı adı veya şifre hatalıdır.</ErrorMessage>}
                </Row>
            </Main>
        </Wrapper>
    );
}

export default LoginPage;
