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

export interface Brand {
    id: number;
    name: string;
    parentCompany: string;
    offerInChina: boolean;
    category: number;
    parentCompanySafe: boolean;
    certificate: string;
    safe: boolean;
    vegan: boolean;
    hasVeganProduct: boolean;
    text: string;
    lastModified: string;
}

export type AdminDTO = {
    token: string;
    success: boolean;
}