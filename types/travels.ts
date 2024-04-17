export interface Travel {
    type: string;
    name: string;
    image: string;
    description: string;
    price: number;
    departureDate: string | Date;
    arrivalDate: string | Date;
    id?: string;
    rating?: number;
}

export enum TravelType {
    ALL = "All Travels",
    EXPRESS = "Express",
    FULL = "360", 
    BEACH = "Beach Life"
}

export const TravelTypeList = [TravelType.ALL, TravelType.BEACH, TravelType.EXPRESS, TravelType.FULL]

export enum RequestMethod {
    PUT = "put",
    POST = "post",
    DELETE = "delete"
}

