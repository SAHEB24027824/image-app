import { ResponseHandler } from "@/util/RequestResponseHandler"

const URL = process.env.NEXT_PUBLIC_APP_API_URL

export const LoginService = async (data: any) => {
    const response = await fetch(`${URL}/login`, {
        method: 'post',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: { "Content-Type": "application/json" }
    })
    const result  = await ResponseHandler(response)
    return result
}


export const LogoutService = async () => {
    const response = await fetch(`${URL}/logout`, {
        method: 'get',
        credentials: 'include'
    })
    const result  = await ResponseHandler(response)
    return result
}

export const getUserService = async () => {
    const response = await fetch(`${URL}/user`, {
        method: 'get',
        credentials: 'include'
    })
    const result  = await ResponseHandler(response)
    return result
}