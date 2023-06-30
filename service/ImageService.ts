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

export const GetImageService = async (applicationId?:string,categoryId?:string)=>{
    let path='image';
    if(applicationId && categoryId){
        path=`${path}/${applicationId}/${categoryId}`
    }

    const response= await fetch(`${URL}/${path}`)
        // if (!response.ok) {
        //     throw await response.json()
        // }
    return response.json()
}

