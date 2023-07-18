const URL = "http://localhost:8080/api"

export const Login = async (data: any) => {
    const response = await fetch(`${URL}/login`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    })
    if (!response.ok) {
        throw await response.json()
    }
    return response.json()
}


export const Logout = async () => {
    const response = await fetch(`${URL}/logout`, {
        method: 'get',
    })
    if (!response.ok) {
        throw await response.json()
    }
    return response.json()
}
