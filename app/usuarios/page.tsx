'use client'
import React, { useEffect, useState } from 'react'
import { IUsuario } from '../_interfaces/usuario.interface'
import { useRouter } from 'next/navigation'
import { IPersona } from '../_interfaces/persona.interface'
import {
    createPersona,
    deletePersona,
    editPersona,
    getAllUsers,
} from '../_services/personas.service'
import { GetServerSideProps } from 'next'
import Modal from '../_components/modal-persona'
import { IEstadoCivil } from '../_interfaces/estado-civil.interface'
import { IEntidadFederativa } from '../_interfaces/entidad-federativa.interface'
import { IGenero } from '../_interfaces/genero.interface'
import {
    getEntidadesFederativas,
    getEstadosCiviles,
    getGeneros,
} from '../_services/catalogos.service'
import Swal from 'sweetalert2'

export default function Usuarios(props: any) {
    const router = useRouter()
    const [user, setUser] = useState<IUsuario | null>(null)
    const [personas, setPersonas] = useState<IPersona[]>([])
    const [show, setShow] = useState<boolean>(false)
    const [persona, setPersona] = useState<IPersona>({
        CURP: '',
        Nombre: '',
        ApellidoMaterno: '',
        ApellidoPaterno: '',
        FechaNacimiento: '',
        EntidadFederativaNacimiento: { id: 0 },
        EstadoCivil: { id: 0 },
        Genero: { id: 0 },
    } as IPersona)
    const [estadosCiviles, setEstadosCiviles] = useState<IEstadoCivil[]>([])
    const [entidadesFederativas, setEntidadesFederativas] = useState<
        IEntidadFederativa[]
    >([])
    const [generos, setGeneros] = useState<IGenero[]>([])

    const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPersona({
            ...persona,
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }

    const handleSelectInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (parseInt(e.target.value) !== 0) {
            setPersona({
                ...persona,
                [e.target.name]: {
                    id: parseInt(e.target.value),
                } as { id: number },
            })
        }
    }

    const handleLogOut = () => {
        localStorage.removeItem('user')
        router.push('/')
    }

    const handleCancel = () => {
        setShow(false)
        setPersona({
            CURP: '',
            Nombre: '',
            ApellidoMaterno: '',
            ApellidoPaterno: '',
            FechaNacimiento: '',
            EntidadFederativaNacimiento: {
                id: 0,
                Clave: '',
                Nombre: '',
            },
            EstadoCivil: { id: 0, Descripcion: '' },
            Genero: { id: 0, Descripcion: '' },
        })
    }

    const handleSubmit = async () => {
        if (persona.CURP === '') {
            let res = await createPersona({
                Nombre: persona.Nombre,
                ApellidoPaterno: persona.ApellidoPaterno,
                ApellidoMaterno: persona.ApellidoMaterno,
                FechaNacimiento: persona.FechaNacimiento,
                EntidadFederativaNacimiento:
                    persona.EntidadFederativaNacimiento.id,
                EstadoCivil: persona.EstadoCivil.id,
                Genero: persona.Genero.id,
            })
            if (res !== null) getAllPersonas()
        } else {
            let res = await editPersona({
                CURP: persona.CURP,
                Nombre: persona.Nombre,
                ApellidoPaterno: persona.ApellidoPaterno,
                ApellidoMaterno: persona.ApellidoMaterno,
                FechaNacimiento: persona.FechaNacimiento,
                EntidadFederativaNacimiento:
                    persona.EntidadFederativaNacimiento.id,
                EstadoCivil: persona.EstadoCivil.id,
                Genero: persona.Genero.id,
            })

            if (res !== null) getAllPersonas()
        }

        setShow(false)
        setPersona({
            CURP: '',
            Nombre: '',
            ApellidoMaterno: '',
            ApellidoPaterno: '',
            FechaNacimiento: '',
            EntidadFederativaNacimiento: {
                id: 0,
                Clave: '',
                Nombre: '',
            },
            EstadoCivil: { id: 0, Descripcion: '' },
            Genero: { id: 0, Descripcion: '' },
        })
    }

    const handleEditClick = (e: React.BaseSyntheticEvent) => {
        let personaF = personas.find((p) => p.CURP === e.currentTarget.id)
        if (personaF !== undefined) {
            setPersona(personaF)
        }

        setShow(true)
    }

    const handleDeleteClick = (e: React.BaseSyntheticEvent) => {
        let personaF = personas.find((p) => p.CURP === e.currentTarget.id)
        if (personaF !== undefined) {
            Swal.fire({
                title: '¿Quieres remover esta persona de la base de datos?',
                text: 'No será posible revertir este cambio',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    let res = await deletePersona(personaF?.CURP || '0')
                    if (res === 200) {
                        Swal.fire(
                            'Eliminado',
                            'La persona ha sido removida de la base de datos',
                            'success'
                        )
                        getAllPersonas()
                    }
                }
            })
        }
    }

    const getAllPersonas = async () => {
        let personasList = await getAllUsers()
        setPersonas(personasList)
    }

    const getEntidadesList = async () => {
        let list = await getEntidadesFederativas()
        setEntidadesFederativas(list)
    }

    const getGenerosList = async () => {
        let list = await getGeneros()
        setGeneros(list)
    }

    const getEstadosCivilesList = async () => {
        let list = await getEstadosCiviles()
        setEstadosCiviles(list)
    }

    useEffect(() => {
        let expectedUser = localStorage.getItem('user')
        if (expectedUser === null && expectedUser === 'undefined')
            router.push(`/login`)
        setUser(JSON.parse(expectedUser || ''))
        getAllPersonas()
        getEntidadesList()
        getGenerosList()
        getEstadosCivilesList()
    }, [])

    return (
        <>
            <div className="w-11/12 h-auto flex justify-center flex-col mt-10">
                <div className="w-full flex justify-end">
                    <button
                        onClick={handleLogOut}
                        className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
                    >
                        log out
                    </button>
                </div>
                <div className="w-full">
                    <div className="flex justify-between items-center">
                        <h1 className="text-white text-2xl p-4">Usuarios</h1>
                        {!user?.isAdmin ? (
                            <></>
                        ) : (
                            <button
                                onClick={() => {
                                    setShow(true)
                                }}
                                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded h-10"
                            >
                                Registrar
                            </button>
                        )}
                    </div>
                </div>
                <div className="w-full">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    CURP
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Nombre
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Apellido Paterno
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Apellido Materno
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Fecha Nacimiento
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Entidad Federativa
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Estado Civil
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Genero
                                </th>
                                <th
                                    hidden={!user?.isAdmin}
                                    scope="col"
                                    className="px-6 py-3"
                                >
                                    Editar
                                </th>
                                <th
                                    hidden={!user?.isAdmin}
                                    scope="col"
                                    className="px-6 py-3"
                                >
                                    Eliminar
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {personas.map((persona) => {
                                return user?.isAdmin ? (
                                    <tr
                                        key={persona.CURP}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {persona.CURP}
                                        </th>
                                        <td className="px-6 py-4">
                                            {persona.Nombre}
                                        </td>
                                        <td className="px-6 py-4">
                                            {persona.ApellidoPaterno}
                                        </td>
                                        <td className="px-6 py-4">
                                            {persona.ApellidoMaterno}
                                        </td>
                                        <td className="px-6 py-4">
                                            {persona.FechaNacimiento}
                                        </td>
                                        <td className="px-6 py-4">
                                            {
                                                persona
                                                    .EntidadFederativaNacimiento
                                                    .Nombre
                                            }
                                        </td>
                                        <td className="px-6 py-4">
                                            {persona.EstadoCivil.Descripcion}
                                        </td>
                                        <td className="px-6 py-4">
                                            {persona.Genero.Descripcion}
                                        </td>
                                        <td className="px-6 py-4">
                                            <label
                                                className="cursor-pointer text-blue-300 hover:text-blue-500"
                                                onClick={handleEditClick}
                                                id={persona.CURP}
                                            >
                                                Editar
                                            </label>
                                        </td>
                                        <td className="px-6 py-4">
                                            <label
                                                onClick={handleDeleteClick}
                                                id={persona.CURP}
                                                className="cursor-pointer text-red-300 hover:text-red-500"
                                            >
                                                Eliminar
                                            </label>
                                        </td>
                                    </tr>
                                ) : (
                                    <tr
                                        key={persona.CURP}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {persona.CURP}
                                        </th>
                                        <td className="px-6 py-4">
                                            {persona.Nombre}
                                        </td>
                                        <td className="px-6 py-4">
                                            {persona.ApellidoPaterno}
                                        </td>
                                        <td className="px-6 py-4">
                                            {persona.ApellidoMaterno}
                                        </td>
                                        <td className="px-6 py-4">
                                            {persona.FechaNacimiento}
                                        </td>
                                        <td className="px-6 py-4">
                                            {
                                                persona
                                                    .EntidadFederativaNacimiento
                                                    .Nombre
                                            }
                                        </td>
                                        <td className="px-6 py-4">
                                            {persona.EstadoCivil.Descripcion}
                                        </td>
                                        <td className="px-6 py-4">
                                            {persona.Genero.Descripcion}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {show && (
                <Modal
                    model={persona}
                    arrCiviles={estadosCiviles}
                    arrEntidad={entidadesFederativas}
                    arrGeneros={generos}
                    onCancel={handleCancel}
                    onSubmit={handleSubmit}
                    onSelectChange={handleSelectInput}
                    onTextChange={handleTextInput}
                />
            )}
        </>
    )
}
