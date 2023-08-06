'use client'

import { GetApplicationsService } from "@/service/ApplicationService";
import { APPLICATION_TYPE } from "@/types/type.application";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";


const applicationContext = createContext<
    {
        applications: APPLICATION_TYPE[],
        getApplications : any
    }>({
        applications:[],
        getApplications:()=>{}
    });

export default function ApplicationContextProvider({ children }: { children: React.ReactNode }) {

    const [applications, setApplications] = useState<APPLICATION_TYPE[]>([])

    const getApplications = async () => {
        try {
          const applicationResponse = await GetApplicationsService()
          const applications: APPLICATION_TYPE[] = applicationResponse?.result;
          if (applications) {
            setApplications(applications)
          }
        } catch (error) {
    
        }
      }
    
      useEffect(() => {
        getApplications()
      }, [])



    return (
        <applicationContext.Provider value={{ 
          applications,
          getApplications 
          }}>
            {children}
        </applicationContext.Provider>
    )
}

export const applicationCtx = () => { return useContext(applicationContext) }
