import axios from 'axios'
import Swal from 'sweetalert2'
import { IGenero } from '../_interfaces/genero.interface'
import { IEstadoCivil } from '../_interfaces/estado-civil.interface'
import { IEntidadFederativa } from '../_interfaces/entidad-federativa.interface'
const API = process.env.NEXT_PUBLIC_WEBAPI_LARAVEL

const getEntidadesFederativas = async () => {
    try {
        let { data } = await axios.get<IEntidadFederativa[]>(
            `${API}/entidad-federativa`
        )

        return data
    } catch (error: any) {
        Swal.fire({ title: 'Error', text: error.message, icon: 'error' })
        return []
    }
}

const getEstadosCiviles = async () => {
    try {
        let { data } = await axios.get<IEstadoCivil[]>(`${API}/estado-civil`)

        return data
    } catch (error: any) {
        Swal.fire({ title: 'Error', text: error.message, icon: 'error' })
        return []
    }
}

const getGeneros = async () => {
    try {
        let { data } = await axios.get<IGenero[]>(`${API}/genero`)

        return data
    } catch (error: any) {
        Swal.fire({ title: 'Error', text: error.message, icon: 'error' })
        return []
    }
}

export { getEntidadesFederativas, getGeneros, getEstadosCiviles }
