import styled from 'styled-components';
import {useEffect, useState} from "react";
import {AdminResponse, Brand, BrandResponse} from "../type/types";
import {checkTokenValidation} from "../util/utils";
import {useHistory} from "react-router-dom";

const Wrapper = styled.div`
  padding-left: 2%;
  padding-bottom: 5%;
  font-family: 'Montserrat', sans-serif;
  margin-left: auto;
  margin-right: auto;
  font-size: 10px;

  @media only screen and (min-width: 1366px) {
    font-size: 14px
  }
`;

const ButtonWrapper = styled.div`
  & span {
    font-weight: bold;
  }
`;

const StyledSpan = styled.span`
  float: right;
  margin-top: 2%;
  margin-right: 2%;
  background: white;
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    background: whitesmoke;
  }
`;

const StyledButton = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  background: antiquewhite;
  padding: 1% 2%;
  margin-top: 2%;
  margin-bottom: 2%;
  margin-right: 2%;
  cursor: pointer;
  border-radius: 0.5rem;
  font-size: 10px;
  
  &:hover {
    background: #e9d0ac;
  }
  @media only screen and (min-width: 1366px) {
    font-size: 14px
  }
`;

const EditButton = styled.button`
  display: block;
  background: darkorange;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.3rem;
  padding: 0.5rem;
  width: 5rem;
  font-size: 10px;
  
  @media only screen and (min-width: 1366px) {
    font-size: 14px
  }

  &:hover {
    background: rgba(255, 140, 0, 0.27);
  }
`;

const StyledInput = styled.input`
  padding: 0.75rem 0.5rem;
  font-size: 14px;
  margin-right: 0.5rem;
`;

const StyledTable = styled.table`
  padding-right: 2%;
  border: 1px;
  margin-left: 0;
`;

const TableRow = styled.tr`
`;

const THCell = styled.th`
  border: 1px solid black;
  background: aliceblue;
  border-radius: 0.5rem;
  padding: 0.8rem 0.6rem;
  
  @media only screen and (min-width: 1366px) {
    padding: 1.2rem 1rem;
  }
`;

const THead = styled.thead`
`;

const TBody = styled.td`
  border: 1px solid black;
  padding: 0.3rem 1rem;

  @media only screen and (min-width: 1366px) {
    padding: 0.5rem 1.2rem;
  }
  background: cornsilk;
  border-radius: 0.5rem;
  font-weight: bold;
`;

const Dashboard = () => {
    const [brands, setBrands] = useState<Brand[]>();
    const [hasDeleted, setHasDeleted] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isDelete, setDelete] = useState<boolean>(false);
    const [idValue, setIdValue] = useState<string>();
    const history = useHistory();

    useEffect(() => {
        getBrands();
    }, []);

    const getBrands = () => {
        const token = localStorage.getItem("token");
        const requestOptions = {
            method: "GET",
            headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token ?? ""}
        };
        fetch(process.env.REACT_APP_URL + "/getAllBrands", requestOptions)
            .then(response => {
                checkTokenValidation(response);
                return response.json();
            })
            .then((response: BrandResponse) => setBrands(response.data));
    };

    const onAddNewRowClick = () => {
        history.push("/brand/new");
    };

    const onEditClick = (id: number) => {
        history.push("/brand/edit", {id: id});
    }

    const deleteDataById = () => {
        //TODO mkose take request options and token from shared util function
        const token = localStorage.getItem("token");
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token ?? ""},
            body: JSON.stringify({id: Number(idValue)})
        };
        fetch(process.env.REACT_APP_URL + "/deleteBrandById", requestOptions)
            .then(response => {
                checkTokenValidation(response);
                return response.json();
            })
            .then((response: AdminResponse) => {
                response.data.success && getBrands();
                setIsSuccess(response.data.success);
                setHasDeleted(!response.data.success)
            });
    };

    const onExitClick = () => {
        localStorage.removeItem("token");
        history.push("/");
    }

    return (
        <Wrapper>
            <ButtonWrapper>
                <StyledButton type="button" onClick={() => onAddNewRowClick()}>Yeni Kay??t Ekle</StyledButton>
                <StyledButton type="button" onClick={() => setDelete(!isDelete)}>Var Olan Kayd?? Sil</StyledButton>
                {isDelete && <>
                    <span>ID: </span>
                    <StyledInput type="number" value={idValue}
                                 onChange={(event: any) => {
                                     setIdValue(event?.target?.value);
                                     setHasDeleted(false);
                                     setIsSuccess(false);
                                 }}/>
                    <StyledButton type="button" onClick={() => deleteDataById()}>Sil</StyledButton>
                    {hasDeleted && <span>Silme ba??ar??l?? olamad??</span>}
                    {isSuccess && <span>Ba??ar??l??!</span>}
                </>}
                <StyledSpan onClick={() => onExitClick()}>????k???? Yap</StyledSpan>
            </ButtonWrapper>
            <StyledTable>
                <THead>
                    <TableRow>
                        <THCell>ID</THCell>
                        <THCell>Marka Ad??</THCell>
                        <THCell>??at?? Firma</THCell>
                        <THCell>??in'de Sat???? Var M??</THCell>
                        <THCell>Kategori</THCell>
                        <THCell>??at?? Firma Deneysiz Mi</THCell>
                        <THCell>Sertifika</THCell>
                        <THCell>Deneysiz Mi</THCell>
                        <THCell>Vegan M??</THCell>
                        <THCell>Vegan ??r??n Var M??</THCell>
                        <THCell>A????klama</THCell>
                        <THCell>Olu??turulma Tarihi</THCell>
                    </TableRow>
                </THead>
                <tbody>
                {
                    brands?.map(brand =>
                        <TableRow key={brand.id}>
                            <TBody>{brand.id}</TBody>
                            <TBody>{brand.name}</TBody>
                            <TBody>{brand.parentCompany === "" ? "-" : brand.parentCompany}</TBody>
                            <TBody>{brand.offerInChina ? "Evet" : "Hay??r"}</TBody>
                            <TBody>{brand.category.toString()}</TBody>
                            <TBody>{brand.parentCompanySafe ? "Evet" : "Hay??r"}</TBody>
                            <TBody>{brand.certificate?.toString() === "" ? "-" : brand.certificate}</TBody>
                            <TBody>{brand.safe ? "Evet" : "Hay??r"}</TBody>
                            <TBody>{brand.vegan ? "Evet" : "Hay??r"}</TBody>
                            <TBody>{brand.hasVeganProduct ? "Evet" : "Hay??r"}</TBody>
                            <TBody>{brand.text === "" ? "-" : brand.text?.substr(0, 50) + (brand.text?.length > 50 ? "..." : "")}</TBody>
                            <TBody>{brand.lastModified?.substr(0, brand.lastModified.indexOf("T"))}</TBody>
                            <td><EditButton type="button" onClick={() => onEditClick(brand.id)}>Edit</EditButton></td>
                        </TableRow>)
                }
                </tbody>
            </StyledTable>
        </Wrapper>
    );
}

export default Dashboard;
