import styled from 'styled-components';
import {useForm} from "react-hook-form";
import React, {useEffect, useState} from "react";
import {AdminResponse, Brand, BrandResponse} from "../type/types";
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

// @ts-ignore
const StyledInput = styled(React.forwardRef((props, ref) => <input {...props} ref={ref}/>))`
  padding: 0.5rem;
`;

const StyledTextArea = styled.textarea`
  padding: 0.5rem;
  resize: none;
`;

// @ts-ignore
const StyledDropdown = styled(React.forwardRef((props, ref) => <select {...props} ref={ref}/>))`
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

export const EditBrand: React.FC = (props) => {
    const [brand, setBrand] = useState<Brand>();
    const history = useHistory();
    const hasCertName = (certificateName: string) => {
        return brand?.certificate?.includes(certificateName);
    };
    const {register, handleSubmit, formState: {errors}} = useForm();
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
        console.log("data ", data);
        const token = localStorage.getItem("token");
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token ?? ""},
            body: JSON.stringify({
                ...data,
                id: brand?.id,
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

    const getBrandById = (id: Number) => {
        const token = localStorage.getItem("token");
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token ?? ""},
            body: JSON.stringify({id})
        };
        fetch(process.env.REACT_APP_URL + "/getBrandById", requestOptions)
            .then(response => {
                checkTokenValidation(response);
                return response.json();
            })
            .then((response: BrandResponse) => {
                const brandById: Brand = response.data[0];
                setBrand(brandById);
            });
    };

    useEffect(() => {
        console.log("props ", props)

        // @ts-ignore
        getBrandById(props.location.state.id)
    }, []);

    return (
        <>
            {brand &&
            <Wrapper onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Text>Marka Adı: </Text>
                    {/*<StyledInput {...register("name", {required: true})}  defaultValue={brand?.name}/>*/}
                    <StyledInput type="text" defaultValue={brand?.name} {...register("name", {required: true})}/>

                </Row>
                <Row>
                    <Text>Çatı Firma: </Text>
                    <StyledInput defaultValue={brand?.parentCompany} {...register("parentCompany")}/>
                </Row>
                <Row>
                    <Text>Çin'de Satış Var Mı: </Text>
                    <StyledCheckbox defaultChecked={brand?.offerInChina} type="checkbox" {...register("offerInChina")}/>
                </Row>
                <Row>
                    <Text>Kategori: </Text>
                    <StyledDropdown defaultValue={brand?.category} {...register("category", {required: true})}>
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
                    <StyledCheckbox defaultChecked={brand?.parentCompanySafe}
                                    type="checkbox" {...register("parentCompanySafe")}/>
                </Row>
                <Row>
                    <Text>Sertifika: </Text>
                    <CheckBoxes>
                        LB<input type="checkbox" defaultChecked={hasCertName("Leaping Bunny")} {...register("lb")}/>
                        BWB<input type="checkbox" defaultChecked={hasCertName("Beauty Without Bunnies")} {...register("bwb")}/>
                        Vegan Society<input type="checkbox"
                                       defaultChecked={hasCertName("Vegan Society")}{...register("vs")}/>
                        V-Label<input type="checkbox" defaultChecked={hasCertName("V-Label")} {...register("vl")}/>
                    </CheckBoxes>
                </Row>
                <Row>
                    <Text>Deneysiz Mi: </Text>
                    <StyledCheckbox type="checkbox" defaultChecked={brand?.safe} {...register("safe")}/>
                </Row>
                <Row>
                    <Text>Vegan Mı: </Text>
                    <StyledCheckbox type="checkbox" defaultChecked={brand?.vegan} {...register("vegan")}/>
                </Row>
                <Row>
                    <Text>Vegan Ürün Var Mı: </Text>
                    <StyledCheckbox type="checkbox"
                                    defaultChecked={brand?.hasVeganProduct} {...register("hasVeganProduct")}/>
                </Row>
                <Row>
                    <Text>Açıklama: </Text>
                    <StyledTextArea maxLength="250" defaultValue={brand?.text} {...register("text")}/>
                </Row>
                <Row>
                    <StyledButton type="submit">Düzenle</StyledButton>
                </Row>
                <Row>
                    {(errors.name) &&
                    <ErrorMessage>Marka Adı alanı zorunludur</ErrorMessage>}
                    {insertSuccess && <ErrorMessage>Düzenleme başarılı olamadı</ErrorMessage>}
                </Row>
            </Wrapper>}
        </>
    );
};

export default EditBrand;
