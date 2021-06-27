export type AdminResponse = {
    status: number;
    success: boolean;
    token: string;
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
    isSafe: boolean;
    vegan: boolean;
    hasVeganProduct: boolean;
}

export type BrandResponse = {
    status: number;
    brands: Brand[];
    message: string;
}