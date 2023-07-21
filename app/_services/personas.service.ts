import axios from 'axios'
import Swal from 'sweetalert2'
import { IPersona } from '../_interfaces/persona.interface'
const API = process.env.NEXT_PUBLIC_WEBAPI_LARAVEL

const getAllUsers = async () => {
    try {
        let { data } = await axios.get<IPersona[]>(`${API}/persona`)

        return data
    } catch (error: any) {
        Swal.fire({ title: 'Error', text: error.message, icon: 'error' })
        return []
    }
}

const getUserByCURP = async (CURP: string) => {
    try {
        let res = await axios.get<IPersona>(`${API}/persona/${CURP}`)

        return res
    } catch (error: any) {
        Swal.fire({ title: 'Error', text: error.message, icon: 'error' })
        return null
    }
}

const createPersona = async (persona: any) => {
    try {
        let res = await axios.post<IPersona>(`${API}/persona`, persona)

        return res
    } catch (error: any) {
        console.log(error)

        Swal.fire({ title: 'Error', text: error.message, icon: 'error' })
        return null
    }
}

const deletePersona = async (CURP: string) => {
    try {
        let { status } = await axios.delete<string>(`${API}/persona/${CURP}`)

        return status
    } catch (error: any) {
        Swal.fire({ title: 'Error', text: error.message, icon: 'error' })
        return false
    }
}

const editPersona = async (persona: any) => {
    try {
        let res = await axios.put<IPersona>(`${API}/persona`, persona)

        return res
    } catch (error: any) {
        Swal.fire({ title: 'Error', text: error.message, icon: 'error' })
        return null
    }
}

export { getAllUsers, getUserByCURP, createPersona, deletePersona, editPersona }
