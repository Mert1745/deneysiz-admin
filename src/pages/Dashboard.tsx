import styled from 'styled-components';
import {useEffect, useState} from "react";
import {Brand} from "../type/types";

const Wrapper = styled.div`
  padding-right: 25%;
  padding-left: 15%;
  padding-bottom: 5%;
  font-family: 'Montserrat', sans-serif;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonWrapper = styled.div`
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

    useEffect(() => {
        const token = localStorage.getItem("token");
        //TODO mkose get url from environment
        const requestOptions = {
            method: "GET",
            headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token ?? ""},
        };
        fetch("http://localhost:8080/admin/getAllBrands", requestOptions)
            .then(response => response.json())
            .then((data: Brand[]) => setBrands(data));
    }, []);

    const onAddNewRowClick = () => {
        window.location.href = "/brand/new";
    };

    return (
        <Wrapper>
            <ButtonWrapper>
                <StyledButton type="button" onClick={() => onAddNewRowClick()}>Yeni Kayıt Ekle</StyledButton>
                <StyledButton type="button">Var Olan Kaydı Sil</StyledButton>
            </ButtonWrapper>
            <StyledTable>
                <THead>
                    <TableRow>
                        <THCell>id</THCell>
                        <THCell>Marka Adı</THCell>
                        <THCell>Çatı Firma</THCell>
                        <THCell>Çin'de Satış Var Mı</THCell>
                        <THCell>Kategori</THCell>
                        <THCell>Çatı Firma Deneysiz Mi</THCell>
                        <THCell>Mağaza Adı</THCell>
                        <THCell>Sertifika</THCell>
                        <THCell>Deneysiz Mi</THCell>
                        <THCell>Vegan Mı</THCell>
                        <THCell>Vegan Ürün Var Mı</THCell>
                    </TableRow>
                </THead>
                <tbody>
                {
                    brands?.map(brand =>
                        <TableRow key={brand.id}>
                            <TBody>{brand.id}</TBody>
                            <TBody>{brand.name}</TBody>
                            <TBody>{brand.parentCompany}</TBody>
                            <TBody>{brand.offerInChina ? "Evet" : "Hayır"}</TBody>
                            <TBody>{brand.category}</TBody>
                            <TBody>{brand.parentCompanySafe ? "Evet" : "Hayır"}</TBody>
                            <TBody>{brand.shopName}</TBody>
                            <TBody>{brand.certificate}</TBody>
                            <TBody>{brand.safe ? "Evet" : "Hayır"}</TBody>
                            <TBody>{brand.vegan ? "Evet" : "Hayır"}</TBody>
                            <TBody>{brand.hasVeganProduct ? "Evet" : "Hayır"}</TBody>
                        </TableRow>)
                }
                </tbody>
            </StyledTable>
        </Wrapper>
    );
}

export default Dashboard;
