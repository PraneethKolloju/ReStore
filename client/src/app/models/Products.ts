export interface products {
    id: number;
    name: string;
    description: string;
    price: number;
    pictureUrl?: string;
    type?: string;
    brand?: string;
    quantityInStock?: number;
}

export interface ProductParams {
    searchTerm?: string;
    orderBy: string;
    brands: string[];
    typeList: string[];
    pageNumber: number;
    pageSize: number;
}

