import styled from 'styled-components';
import {useForm} from "react-hook-form";
import {useState} from "react";
import {AdminResponse} from "../type/types";
import {checkTokenValidation} from "../util/utils";
import {useHistory} from "react-router-dom";

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
  overflow: hidden;
  
  & option {
    margin-bottom: 0.25rem;
  }
`;

const CheckBoxes = styled.div`
  display: flex;

  & input {
    cursor: pointer;
  }

  & input:nth-last-child(n+2) {
    margin-right: 1rem;
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
    const history = useHistory();
    const [insertSuccess, setInsertSuccess] = useState<any>(undefined);

    const getCertificate = (data: any) => {
        const certificates = [
            {"name": "Leaping Bunny", "value": data.lb},
            {"name": "Beauty Without Bunnies", "value": data.bwb},
            {"name": "Vegan Society", "value": data.vs},
            {"name": "V-Label", "value": data.vl}
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
                bwb: undefined,
                vs: undefined,
                vl: undefined
            })
        };
        fetch(process.env.REACT_APP_URL + "/saveBrand", requestOptions)
            .then(response => {
                checkTokenValidation(response);
                return response.json();
            })
            .then((response: AdminResponse) => {
                response.data.success ? history.push("/dashboard") : setInsertSuccess(true);
            });
    };

    return (
        <Wrapper onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Text>Marka Ad??: </Text>
                <StyledInput {...register("name", {required: true})}/>
            </Row>
            <Row>
                <Text>??at?? Firma: </Text>
                <StyledInput {...register("parentCompany")}/>
            </Row>
            <Row>
                <Text>??in'de Sat???? Var M??: </Text>
                <StyledCheckbox type="checkbox" {...register("offerInChina")}/>
            </Row>
            <Row>
                <Text>Kategori: </Text>
                <StyledDropdown multiple size={10} {...register("category", {required: true})}>
                    <option value="Makyaj">Makyaj</option>
                    <option value="Sa?? Bak??m">Sa?? Bak??m</option>
                    <option value="Cilt ve Y??z Bak??m">Cilt ve Y??z Bak??m</option>
                    <option value="Deodorant ve Parf??m">Deodorant ve Parf??m</option>
                    <option value="Ki??isel Hijyen ve Bak??m">Ki??isel Hijyen ve Bak??m</option>
                    <option value="A????z Ve Di?? Bak??m">A????z Ve Di?? Bak??m</option>
                    <option value="Anne ve Bebek Bak??m">Anne ve Bebek Bak??m</option>
                    <option value="Ev Bak??m">Ev Bak??m</option>
                </StyledDropdown>
            </Row>
            <Row>
                <Text>??at?? Firma Deneysiz Mi: </Text>
                <StyledCheckbox type="checkbox" {...register("parentCompanySafe")}/>
            </Row>
            <Row>
                <Text>Sertifika: </Text>
                <CheckBoxes>
                    LB<input type="checkbox" {...register("lb")}/>
                    BWB<input type="checkbox" {...register("bwb")}/>
                    Vegan Society<input type="checkbox" {...register("vs")}/>
                    V-Label<input type="checkbox" {...register("vl")}/>
                </CheckBoxes>
            </Row>
            <Row>
                <Text>Deneysiz Mi: </Text>
                <StyledCheckbox type="checkbox" {...register("safe")}/>
            </Row>
            <Row>
                <Text>Vegan M??: </Text>
                <StyledCheckbox type="checkbox" {...register("vegan")}/>
            </Row>
            <Row>
                <Text>Vegan ??r??n Var M??: </Text>
                <StyledCheckbox type="checkbox" {...register("hasVeganProduct")}/>
            </Row>
            <Row>
                <Text>A????klama: </Text>
                <StyledTextArea maxLength="250" {...register("text")}/>
            </Row>
            <Row>
                <StyledButton type="submit">Ekle</StyledButton>
            </Row>
            <Row>
                {(errors.name || errors.category) &&
                <ErrorMessage>Marka Ad?? ve Kategori alan?? zorunludur</ErrorMessage>}
                {insertSuccess && <ErrorMessage>Kaydetme ba??ar??l?? olamad??</ErrorMessage>}
            </Row>
        </Wrapper>
    );
}

export default NewBrand;
