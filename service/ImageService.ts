import { ResponseHandler } from "@/util/RequestResponseHandler"

const URL = process.env.NEXT_PUBLIC_APP_API_URL

export const AddImageService = async (formData: any) => {

    const response = await fetch(`${URL}/image`, {
        method: 'post',
        body: formData,
        credentials: 'include'
    })
    const result = await ResponseHandler(response)
    return result
}

export const GetImageService = async (
    {
        applicationKey,
        categoryKey,
        searchText,
    }
        :
        {
            applicationKey?: string,
            categoryKey?: string,
            searchText?: string,
        }
) => {
    let query = new URLSearchParams();

    applicationKey && query.append('applicationKey', applicationKey)
    categoryKey && query.append('categoryKey', categoryKey)
    searchText && query.append('searchText', searchText)

    const response = await fetch(`${URL}/image?` + query, { method: 'GET', credentials: 'include' })
    const result = await ResponseHandler(response)
    return result
}


export const DeleteImageService = async (id: string) => {

    const response = await fetch(`${URL}/image/${id}`, { method: 'DELETE', credentials: 'include' })
    const result = await ResponseHandler(response)
    return result
}

