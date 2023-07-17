export interface APPLICATION_TYPE{
        _id:string,
        name: string,
        key:string,
        category:APPLICATION_CATEGORY_TYPE[]
}

export interface APPLICATION_CATEGORY_TYPE{
        name: string,
        key:string,
}


