import styled from 'styled-components';
import {useEffect, useState} from "react";
import {Brand} from "../type/types";

const Wrapper = styled.div`
  width: 100vh;
  margin-top: 5%;
  font-family: 'Montserrat', sans-serif;
  margin-left: auto;
  margin-right: auto;
`;

const StyledTable = styled.table`
  border: 1px;
`;

const TableRow = styled.tr`
  border: 1px solid black;
`;

const THCell = styled.th`
  border: 1px solid black;
  padding: 0.5rem;
`;

const THead = styled.thead`
`;

const TBody = styled.td`
  border: 1px solid black;
  padding: 0.5rem;
`;

const Dashboard = () => {
    const [brands, setBrands] = useState<Brand[]>();

    useEffect(() => {
        const token = localStorage.getItem("token");
        //TODO mkose get url from environment
        const requestOptions = {
            method: "GET",
            headers: {"Content-Type": "application/json", "Authorization": token ?? ""},
        };
        fetch("http://localhost:8080/admin/getAllBrands", requestOptions)
            .then(response => response.json())
            .then((data: Brand[]) => setBrands(data));
    }, []);

    return (
        <Wrapper>
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
                            <TBody>{brand.offerInChina.valueOf()}</TBody>
                            <TBody>{brand.category}</TBody>
                            <TBody>{brand.parentCompanySafe}</TBody>
                            <TBody>{brand.shopName}</TBody>
                            <TBody>{brand.certificate}</TBody>
                            <TBody>{brand.isSafe}</TBody>
                            <TBody>{brand.vegan}</TBody>
                            <TBody>{brand.hasVeganProduct}</TBody>
                        </TableRow>)
                }
                </tbody>
            </StyledTable>
        </Wrapper>
    );
}

export default Dashboard;
