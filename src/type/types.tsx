export type AdminResponse = {
    status: number;
    message: string;
    data: AdminDTO;
}

export type BrandResponse = {
    status: number;
    success: string;
    data: Brand[];
}

interface Certificate {
    certificate: string;
    valid: boolean;
}

export interface Brand {
    id: number;
    name: string;
    parentCompany: string;
    offerInChina: boolean;
    category: number;
    parentCompanySafe: boolean;
    shopName: string[];
    certificate: Certificate[];
    safe: boolean;
    vegan: boolean;
    hasVeganProduct: boolean;
}

export type AdminDTO = {
    token: string;
    success: boolean;
}