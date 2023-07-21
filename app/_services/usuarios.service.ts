import axios, { AxiosError } from 'axios'
import Swal from 'sweetalert2'
import { IUsuario } from '../_interfaces/usuario.interface'
const API = process.env.NEXT_PUBLIC_WEBAPI_LARAVEL

const login = async (Email: string, Password: string) => {
    try {
        let { data } = await axios.post<IUsuario>(`${API}/login`, {
            Email,
            Password,
        })
        return data
    } catch (error: any) {
        Swal.fire({ title: 'Error', text: error.message, icon: 'error' })
        return null
    }
}

export { login }
