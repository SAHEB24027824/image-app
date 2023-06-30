const URL = "http://localhost:8080/api"

export const AddApplicationService = async (data: any) => {
    const response = await fetch(`${URL}/application`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    })
    if (!response.ok) {
        throw await response.json()
    }
    return response.json()
}

export const UpdateApplicationService = async (data: any) => {
    const response = await fetch(`${URL}/application`, {
        method: 'put',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    })
    if (!response.ok) {
        throw await response.json()
    }
    return response.json()
}

export const GetApplicationsService = async () => {
    const response = await fetch(`${URL}/application`, {
        method: 'get',
    })
    if (!response.ok) {
        throw await response.json()
    }
    return response.json()
}

export const GetApplicationsByIdService = async (id: string) => {
    console.log('---id---', id)
    const response = await fetch(`${URL}/application/${id}`, {
        method: 'get',
    })
    if (!response.ok) {
        throw await response.json()
    }
    return response.json()
}