const URL = "http://localhost:8080/api"

export const AddImageService = async (formData: any) => {

    const response = await fetch(`${URL}/image`, {
        method: 'post',
        body: formData
    })
    if (!response.ok) {
        throw await response.json()
    }
    return response.json()
}

export const GetImageService = async (
    {
        applicationKey,
        categoryKey,
        searchText
    }
        :
        {
            applicationKey?: string,
            categoryKey?: string,
            searchText?: string
        }
) => {
    let query = new URLSearchParams();

    applicationKey && query.append('applicationKey', applicationKey)
    categoryKey && query.append('categoryKey', categoryKey)
    searchText && query.append('searchText', searchText)

    const response = await fetch(`${URL}/image?` + query, { method: 'GET' })

    return response.json()
}


export const DeleteImageService = async (id:string) => {

    const response = await fetch(`${URL}/image/${id}`,{ method: 'DELETE' })
    return response.json()
}

