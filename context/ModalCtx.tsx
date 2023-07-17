'use client'
import React, { createContext, useContext, useState } from 'react';

const modalContext = createContext<
    {
        openModal: boolean,
        setOpenModal: React.Dispatch<boolean>,
    }>({
        openModal: false,
        setOpenModal: () => { },
    });

export default function QueryContextProvider({ children }: { children: React.ReactNode }) {
    const [openModal, setOpenModal] = useState<boolean>(false)



    return (
        <modalContext.Provider value={{ openModal, setOpenModal }}>
            {children}
        </modalContext.Provider>
    )
}

export const modalCtx = () => { return useContext(modalContext) }
