'use client'
import { MessageAntd } from '@/components/Antd';
import { Login, Logout } from '@/service/Auth';
import { MessageService } from '@/util/MessageService';
import { useRouter, useParams, usePathname } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';

export function getCookie(cookieName: any) {
    return new Promise((resolve, reject) => {
        let cookie = {};
        let cookieArray = document.cookie.split(';');
        cookieArray.forEach(cookie => {
            let [key, value] = cookie.split('=');
            if (key.trim() == cookieName) {
                resolve(`${key}=${value}`)
            }
            else {
                reject(false)
            }
        })
    })
}

const authContext = createContext<
    {
        isLoggedIn: boolean,
        LoginFn: (values: any) => void
        LogoutFn: () => void
    }>({
        isLoggedIn: false,
        LoginFn: (values: any) => { },
        LogoutFn: () => { }
    });

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const path = usePathname()

    const authCheck = async () => {
        try {
            const isCookie = await getCookie(process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME)
            if (isCookie) {
                setIsLoggedIn(true)
                if (path.includes('/login')) {
                    router.push('/')
                }
                else {
                    router.push(path)
                }
            }
        } catch (error) {
            setIsLoggedIn(false)
            router.push('/login')
        }
    }



    const LoginFn = async (values: any) => {
        try {
            const response = await Login(values)
            if (response) {
                MessageAntd.success(MessageService(response));
                setIsLoggedIn(true)
                router.push('/')
            }

        } catch (error: any) {
            setIsLoggedIn(false)
            MessageAntd.error(MessageService(error))
        }
    }

    const LogoutFn = async () => {
        try {
            const response = await Logout()
            MessageAntd.success(MessageService(response));
            setIsLoggedIn(false)
            router.push('/login')

        } catch (error: any) {
            MessageAntd.error(MessageService(error))
        }
    }


    useEffect(() => {
        authCheck()
    }, [])


    return (
        <authContext.Provider value={{ isLoggedIn, LoginFn, LogoutFn }}>
            {children}
        </authContext.Provider>
    )
}

export const authCtx = () => { return useContext(authContext) }
