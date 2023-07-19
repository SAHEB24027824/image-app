import {ResponseHandler } from "@/util/RequestResponseHandler"

const URL = "http://localhost:8080/api"

export const AddApplicationService = async (data: any) => {
    const response = await fetch(`${URL}/application`, {
        method: 'post',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: { "Content-Type": "application/json" }
    })
    const result  = await ResponseHandler(response)
    return result
}

export const UpdateApplicationService = async (data: any) => {
    const response = await fetch(`${URL}/application`, {
        method: 'put',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: { "Content-Type": "application/json" }
    })
    const result  = await ResponseHandler(response)
    return result
}

export const GetApplicationsService = async (cookie:string) => {
        const response = await fetch(`${URL}/application`,{method:'GET',headers:{cookie:cookie}})
        const result  = await ResponseHandler(response)
        return result

}

export const GetApplicationService = async (key: string,cookie:string) => {
    const response = await fetch(`${URL}/application/${key}`, {method:'GET',headers:{cookie:cookie}})
    const result  = await ResponseHandler(response)
    return result
}