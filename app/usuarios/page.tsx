"use client";
import React from "react";

export default function Usuarios() {
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
  return (
    <>
      <div className="w-11/12 h-auto flex justify-center flex-col mt-10">
        <div>
          <h1 className="text-white text-2xl p-4">Usuarios</h1>
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
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Editar
                </th>
                <th scope="col" className="px-6 py-3">
                  Eliminar
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  ROMJ021028HNLDRSR1
                </th>
                <td className="px-6 py-4">Jose</td>
                <td className="px-6 py-4">Rodríguez</td>
                <td className="px-6 py-4">Morales</td>
                <td className="px-6 py-4">2002-10-28</td>
                <td className="px-6 py-4">Aguascalientes</td>
                <td className="px-6 py-4">Casado/a</td>
                <td className="px-6 py-4">Aguascalientes</td>
                <td className="px-6 py-4">pepe@gmail.com</td>
                <td className="px-6 py-4">Eliminar</td>
                <td className="px-6 py-4">Editar</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
