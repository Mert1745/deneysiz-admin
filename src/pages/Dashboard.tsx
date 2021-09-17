import styled from 'styled-components';
import {useEffect, useState} from "react";
import {AdminResponse, Brand, BrandResponse} from "../type/types";
import {checkTokenValidation} from "../util/utils";

const Wrapper = styled.div`
  padding-right: 25%;
  padding-left: 10%;
  padding-bottom: 5%;
  font-family: 'Montserrat', sans-serif;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonWrapper = styled.div`
  & span {
    font-weight: bold;
  }
`;

const StyledButton = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  background: antiquewhite;
  padding: 2% 5%;
  margin-top: 2%;
  margin-bottom: 2%;
  margin-right: 2%;
  cursor: pointer;
  border-radius: 0.5rem;
`;

const StyledInput = styled.input`
  padding: 0.75rem 0.5rem;
  font-size: 14px;
  margin-right: 0.5rem;
`;

const StyledTable = styled.table`
  border: 1px;
  margin-left: 0;
`;

const TableRow = styled.tr`
`;

const THCell = styled.th`
  border: 1px solid black;
  background: aliceblue;
  padding: 0.5rem 2rem;
  border-radius: 0.5rem;
`;

const THead = styled.thead`
`;

const TBody = styled.td`
  border: 1px solid black;
  padding: 0.5rem 1.2rem;
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

    useEffect(() => {
        //TODO mkose get url from environment
        getBrands();
    }, []);

    const getBrands = () => {
        const token = localStorage.getItem("token");
        const requestOptions = {
            method: "GET",
            headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token ?? ""}
        };
        fetch("http://localhost:8080/admin/getAllBrands", requestOptions)
            .then(response => {
                checkTokenValidation(response);
                return response.json();
            })
            .then((response: BrandResponse) => setBrands(response.data));
    };

    const onAddNewRowClick = () => {
        window.location.href = "/brand/new";
    };

    const deleteDataById = () => {
        //TODO mkose take request options and token from shared util function
        const token = localStorage.getItem("token");
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token ?? ""},
            body: JSON.stringify({id: Number(idValue)})
        };
        fetch("http://localhost:8080/admin/deleteBrandById", requestOptions)
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

    return (
        <Wrapper>
            <ButtonWrapper>
                <StyledButton type="button" onClick={() => onAddNewRowClick()}>Yeni Kayıt Ekle</StyledButton>
                <StyledButton type="button" onClick={() => setDelete(!isDelete)}>Var Olan Kaydı Sil</StyledButton>
                {isDelete && <>
                    <span>ID: </span>
                    <StyledInput type="number" value={idValue}
                                 onChange={(event: any) => {
                                     setIdValue(event?.target?.value);
                                     setHasDeleted(false);
                                     setIsSuccess(false);
                                 }}/>
                    <StyledButton type="button" onClick={() => deleteDataById()}>Sil</StyledButton>
                    {hasDeleted && <span>Silme başarılı olamadı</span>}
                    {isSuccess && <span>Başarılı!</span>}
                </>}
            </ButtonWrapper>
            <StyledTable>
                <THead>
                    <TableRow>
                        <THCell>ID</THCell>
                        <THCell>Marka Adı</THCell>
                        <THCell>Çatı Firma</THCell>
                        <THCell>Çin'de Satış Var Mı</THCell>
                        <THCell>Kategori</THCell>
                        <THCell>Çatı Firma Deneysiz Mi</THCell>
                        <THCell>Sertifika</THCell>
                        <THCell>Deneysiz Mi</THCell>
                        <THCell>Vegan Mı</THCell>
                        <THCell>Vegan Ürün Var Mı</THCell>
                        <THCell>Açıklama</THCell>
                        <THCell>Oluşturulma Tarihi</THCell>
                    </TableRow>
                </THead>
                <tbody>
                {
                    brands?.map(brand =>
                        <TableRow key={brand.id}>
                            <TBody>{brand.id}</TBody>
                            <TBody>{brand.name}</TBody>
                            <TBody>{brand.parentCompany === "" ? "-" : brand.parentCompany}</TBody>
                            <TBody>{brand.offerInChina ? "Evet" : "Hayır"}</TBody>
                            <TBody>{brand.category}</TBody>
                            <TBody>{brand.parentCompanySafe ? "Evet" : "Hayır"}</TBody>
                            <TBody>{brand.certificate?.toString() === "" ? "-" : brand.certificate}</TBody>
                            <TBody>{brand.safe ? "Evet" : "Hayır"}</TBody>
                            <TBody>{brand.vegan ? "Evet" : "Hayır"}</TBody>
                            <TBody>{brand.hasVeganProduct ? "Evet" : "Hayır"}</TBody>
                            <TBody>{brand.text === "" ? "-" : brand.text.substr(0, 50) + (brand.text.length > 50 ? "..." : "")}</TBody>
                            <TBody>{brand.createdAt?.substr(0, brand.createdAt.indexOf("T"))}</TBody>
                        </TableRow>)
                }
                </tbody>
            </StyledTable>
        </Wrapper>
    );
}

export default Dashboard;
