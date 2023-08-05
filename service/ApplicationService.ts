import {ResponseHandler } from "@/util/RequestResponseHandler"

const URL = process.env.NEXT_PUBLIC_APP_API_URL

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

export const GetApplicationsService = async (cookie?:string) => {
        const response = await fetch(`${URL}/application`,{method:'GET', credentials: 'include',headers:{cookie:cookie?cookie:''}})
        const result  = await ResponseHandler(response)
        return result

}

export const GetApplicationService = async (key: string,cookie:string) => {
    const response = await fetch(`${URL}/application/${key}`, {method:'GET',headers:{cookie:cookie}})
    const result  = await ResponseHandler(response)
    return result
}