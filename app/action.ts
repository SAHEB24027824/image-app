'use server'

import { AddApplicationService } from "@/service/ApplicationService"

 
export const addApplicationAction=async (data:any)=> {
 await AddApplicationService(data)
}