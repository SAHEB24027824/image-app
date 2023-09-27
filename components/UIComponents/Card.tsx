import React from 'react'

export default function Card(
    { children, className, title, extra,bodyClassName = "p-4" }:
        {
            children: React.ReactNode,
            className?: string,
            title?: string,
            extra?: React.ReactNode
            bodyClassName?:string
        }
) {
    return (
        <div className={`rounded-md overflow-hidden bg-white ${className} ${title || extra && 'divide-y'}`}>
            <div className={`p-4 px-6 flex justify-between bg-gray-700 text-white`}>
                <p className='font-semibold'>{title}</p>
                <div className='text-sm'>{extra && extra}</div>
            </div>
            <div className={`${bodyClassName} border-t`}>
                {children}
            </div>
        </div>
    )
}
