import { ResponseHandler } from "@/util/RequestResponseHandler"

const URL = "http://localhost:8080/api"

export const Login = async (data: any) => {
    const response = await fetch(`${URL}/login`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    })
    const result  = await ResponseHandler(response)
    return result
}


export const Logout = async () => {
    const response = await fetch(`${URL}/logout`, {
        method: 'get',
        credentials: 'include'
    })
    const result  = await ResponseHandler(response)
    return result
}
