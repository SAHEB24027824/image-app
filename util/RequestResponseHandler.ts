import { redirect } from "next/navigation";

export const ResponseHandler = async (response: Response) => {
    if (!response.ok) {
        if (response.status == 401) {
         //   redirect('/login')
        }
       //throw new Error(`${response.status} ${response.statusText}`)
   }
    return await response.json()

}


