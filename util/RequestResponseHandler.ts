import { redirect } from "next/navigation";

export const ResponseHandler = async (response: Response) => {
    try {
        if (!response.ok) {
            if (response.status == 401) {
                redirect('/login')
            }
       }
        return await response.json() 
    } catch (error) {
        throw new Error('Something wrong')
    }
}


