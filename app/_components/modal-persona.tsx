import React, { useState } from 'react'
import { IPersona } from '../_interfaces/persona.interface'
import FormInput from './text-form-input'
import TextFormInput from './text-form-input'
import SelectFormInput from './select-form-input'
import { IGenero } from '../_interfaces/genero.interface'
import { IEstadoCivil } from '../_interfaces/estado-civil.interface'
import { IEntidadFederativa } from '../_interfaces/entidad-federativa.interface'
import Swal from 'sweetalert2'
import DateFormInput from './date-form-input'

export default function Modal(props: {
    model: IPersona
    arrGeneros: IGenero[]
    arrEntidad: IEntidadFederativa[]
    arrCiviles: IEstadoCivil[]
    onCancel: () => void
    onSubmit: () => void
    onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) {
    return (
        <>
            <div
                className="relative z-10"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
            >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="flex sm:flex items-center sm:items-start">
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                        <h3
                                            className="text-base font-semibold leading-6 text-gray-900"
                                            id="modal-title"
                                        >
                                            {props.model.CURP !== ''
                                                ? 'Editar Persona'
                                                : 'Registrar Persona'}
                                        </h3>
                                        <div
                                            className="mt-2 w-full"
                                            datatype-name="modal-body"
                                        >
                                            <TextFormInput
                                                label="CURP"
                                                name="CURP"
                                                onChange={props.onTextChange}
                                                value={props.model.CURP}
                                                disable
                                            />
                                            <TextFormInput
                                                disable={false}
                                                label="Nombre"
                                                name="Nombre"
                                                onChange={props.onTextChange}
                                                value={props.model.Nombre}
                                            />
                                            <TextFormInput
                                                disable={false}
                                                label="Apellido Paterno"
                                                name="ApellidoPaterno"
                                                onChange={props.onTextChange}
                                                value={
                                                    props.model.ApellidoPaterno
                                                }
                                            />
                                            <TextFormInput
                                                disable={false}
                                                label="Apellido Materno"
                                                name="ApellidoMaterno"
                                                onChange={props.onTextChange}
                                                value={
                                                    props.model.ApellidoMaterno
                                                }
                                            />
                                            <DateFormInput
                                                label="Fecha de Nacimiento"
                                                onChange={props.onTextChange}
                                                value={
                                                    props.model.FechaNacimiento
                                                }
                                                name="FechaNacimiento"
                                                disable={false}
                                            />
                                            <SelectFormInput
                                                label="Entidad Federativa"
                                                name="EntidadFederativaNacimiento"
                                                onChange={props.onSelectChange}
                                                value={
                                                    props.model
                                                        .EntidadFederativaNacimiento
                                                        .id
                                                }
                                                options={props.arrEntidad}
                                            />
                                            <SelectFormInput
                                                label="Estado Civil"
                                                name="EstadoCivil"
                                                onChange={props.onSelectChange}
                                                value={
                                                    props.model.EstadoCivil.id
                                                }
                                                options={props.arrCiviles}
                                            />
                                            <SelectFormInput
                                                label="Genero"
                                                name="Genero"
                                                onChange={props.onSelectChange}
                                                value={props.model.Genero.id}
                                                options={props.arrGeneros}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                datatype-name="modal-footer"
                                className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
                            >
                                <button
                                    type="button"
                                    onClick={props.onSubmit}
                                    className="inline-flex w-full justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 sm:ml-3 sm:w-auto"
                                >
                                    {props.model.CURP !== ''
                                        ? 'Editar'
                                        : 'Registrar'}
                                </button>
                                <button
                                    type="button"
                                    onClick={props.onCancel}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
