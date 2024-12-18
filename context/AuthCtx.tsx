'use client'
import { MessageAntd } from '@/components/Antd';
import { getUserService, LoginService, LogoutService } from '@/service/AuthService';
import { USER_TYPE } from '@/types/type.user';
import { MessageService } from '@/util/MessageService';
import { useRouter, usePathname } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';


const authContext = createContext<
    {
        LoginFn: (values: any) => void
        LogoutFn: () => void,
        user: any
    }>({
        LoginFn: (values: any) => { },
        LogoutFn: () => { },
        user: {}
    });

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [user, setUser] = useState<USER_TYPE>()
    const path = usePathname()


    const localStorageGetSet = (value?: string) => {
        if (typeof window == 'object') {
            if (value) {
                window?.localStorage.setItem('auth', value)
            }
            else {
                return window?.localStorage.getItem('auth') ? window?.localStorage.getItem('auth') : 'false'
            }
        }
    }

    const redirect = () => {
        if (path.includes('/login')) {
            router.push('/')
        }
        else {
            router.push(path)
        }
    }



    const getUser = async () => {
        try {
            const response = await getUserService()
            if (response?.result) {
                localStorageGetSet('true')
                setUser(response?.result)
                redirect();
            }
            else {
                router.push('/login')
            }
        } catch (error) {
            router.push('/login')
        }
    }


    const LoginFn = async (values: any) => {
        try {
            const response = await LoginService(values)
            if (response) {
                MessageAntd.success(MessageService(response));
            }

        } catch (error: any) {
            MessageAntd.error(MessageService(error))
        }
        finally {
            getUser()
        }
    }

    const LogoutFn = async () => {
        try {
            const response = await LogoutService()
            MessageAntd.success(MessageService(response));
            localStorageGetSet('false')
            router.push('/login')

        } catch (error: any) {
            MessageAntd.error(MessageService(error))
        }
    }


    useEffect(() => {
        if (!path.includes('/login')) {
            getUser()
        }
        if (path.includes('/login')) {
            if (localStorageGetSet() == 'true') {
                getUser()
            }
        }
    }, [])


    return (
        <>
            <authContext.Provider value={{ LoginFn, LogoutFn, user }}>
                {children}
            </authContext.Provider>
        </>
    )
}

export const authCtx = () => { return useContext(authContext) }
