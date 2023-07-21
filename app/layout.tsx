'use client'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { createContext, useState } from 'react'
import { IUsuario } from './_interfaces/usuario.interface'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Registro de Usuarios',
    description: 'Prueba Técnica',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className + ' flex justify-center w-screen'}>
                {children}
            </body>
        </html>
    )
}
