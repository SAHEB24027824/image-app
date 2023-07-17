const URL = "http://localhost:8080/api"

export const AddImageService = async (formData:any)=>{

    const response= await fetch(`${URL}/image`,{
        method:'post',
        body:formData
        })
        if (!response.ok) {
            throw await response.json()
        }
    return response.json()
}

export const GetImageService = async (applicationKey?:string,categoryKey?:string)=>{
    let query = new URLSearchParams();

    applicationKey && query.append('applicationKey', applicationKey)
    categoryKey && query.append('categoryKey', categoryKey)
    
    const response= await fetch(`${URL}/image?` + query,{method:'GET'})

    return response.json()
}

