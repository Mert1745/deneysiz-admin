import styled from 'styled-components';
import {useForm} from "react-hook-form";
import {useState} from "react";
import {AdminResponse} from "../type/types";
import {checkTokenValidation} from "../util/utils";

const Wrapper = styled.form`
  padding-right: 25%;
  padding-left: 15%;
  padding-bottom: 5%;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3%;
`;

const Row = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Text = styled.span`
  margin-top: auto;
  margin-bottom: auto;
`;

const StyledInput = styled.input`
  padding: 0.5rem;
`;

const StyledTextArea = styled.textarea`
  padding: 0.5rem;
  resize: none;
`;

const StyledDropdown = styled.select`
  padding: 0.5rem;
  cursor: pointer;

  & option {
    margin-bottom: 0.5rem;
    margin-top: 0.25rem;
  }
`;

const CheckBoxes = styled.div`
  display: flex;

  & input {
    cursor: pointer;
  }
`;

const StyledCheckbox = styled.input.attrs({type: "checkbox"})`
  padding: 5rem;
  background: red;
  cursor: pointer;
`;

const StyledButton = styled.button`
  cursor: pointer;
  width: 100%;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
`;

const ErrorMessage = styled.span`
  padding: 0.75rem 0.5rem;
  font-size: 17px;
  margin-right: auto;
  margin-left: auto;
  text-decoration: underline;
`;

const NewBrand = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [insertSuccess, setInsertSuccess] = useState<any>(undefined);

    const getCertificate = (data: any) => {
        const certificates = [
            {"name": "LB", "value": data.lb},
            {"name": "Peta", "value": data.peta},
            {"name": "Unilever", "value": data.unilever},
            {"name": "xxxx", "value": data.xxxx}
        ];
        let concatenatedCert = "";
        // eslint-disable-next-line array-callback-return
        certificates.map(certificate => {
            if (certificate.value) {
                concatenatedCert += certificate.name + ",";
            }
        });
        if (concatenatedCert.endsWith(",", concatenatedCert.length)) {
            concatenatedCert = concatenatedCert.slice(0, concatenatedCert.length - 1);
        }
        return concatenatedCert;
    };

    const onSubmit = (data: any) => {
        const token = localStorage.getItem("token");
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token ?? ""},
            body: JSON.stringify({
                ...data,
                certificate: getCertificate(data),
                lb: undefined,
                peta: undefined,
                unilever: undefined,
                xxxx: undefined
            })
        };
        fetch("http://localhost:8080/admin/addBrand", requestOptions)
            .then(response => {
                checkTokenValidation(response);
                return response.json();
            })
            .then((response: AdminResponse) => {
                response.data.success ? window.location.href = "/dashboard" : setInsertSuccess(true);
            });
    };

    return (
        <Wrapper onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Text>Marka Adı: </Text>
                <StyledInput {...register("name", {required: true})}/>
            </Row>
            <Row>
                <Text>Çatı Firma: </Text>
                <StyledInput {...register("parentCompany")}/>
            </Row>
            <Row>
                <Text>Çin'de Satış Var Mı: </Text>
                <StyledCheckbox type="checkbox" {...register("offerInChina")}/>
            </Row>
            <Row>
                <Text>Kategori: </Text>
                <StyledDropdown {...register("category", {required: true})}>
                    <option value="Makyaj">Makyaj</option>
                    <option value="Saç Bakım">Saç Bakım</option>
                    <option value="Cilt ve Yüz Bakım">Cilt ve Yüz Bakım</option>
                    <option value="Deodorant ve Parfüm">Deodorant ve Parfüm</option>
                    <option value="Kişisel Hijyen ve Bakım">Kişisel Hijyen ve Bakım</option>
                    <option value="Ağız Ve Diş Bakım">Ağız Ve Diş Bakım</option>
                    <option value="Anne ve Bebek Bakım">Anne ve Bebek Bakım</option>
                    <option value="Ev Bakım">Ev Bakım</option>
                </StyledDropdown>
            </Row>
            <Row>
                <Text>Çatı Firma Deneysiz Mi: </Text>
                <StyledCheckbox type="checkbox" {...register("parentCompanySafe")}/>
            </Row>
            <Row>
                <Text>Sertifika: </Text>
                <CheckBoxes>
                    LB<input type="checkbox" {...register("lb")}/>
                    Peta<input type="checkbox" {...register("peta")}/>
                    Unilever<input type="checkbox" {...register("unilever")}/>
                    XXXX<input type="checkbox" {...register("xxxx")}/>
                </CheckBoxes>
            </Row>
            <Row>
                <Text>Deneysiz Mi: </Text>
                <StyledCheckbox type="checkbox" {...register("safe")}/>
            </Row>
            <Row>
                <Text>Vegan Mı: </Text>
                <StyledCheckbox type="checkbox" {...register("vegan")}/>
            </Row>
            <Row>
                <Text>Vegan Ürün Var Mı: </Text>
                <StyledCheckbox type="checkbox" {...register("hasVeganProduct")}/>
            </Row>
            <Row>
                <Text>Açıklama: </Text>
                <StyledTextArea maxLength="250" {...register("text")}/>
            </Row>
            <Row>
                <StyledButton type="submit">Ekle</StyledButton>
            </Row>
            <Row>
                {(errors.name) &&
                <ErrorMessage>Mağaza Adı alanı zorunludur</ErrorMessage>}
                {insertSuccess && <ErrorMessage>Kaydetme başarılı olamadı</ErrorMessage>}
            </Row>
        </Wrapper>
    );
}

export default NewBrand;
