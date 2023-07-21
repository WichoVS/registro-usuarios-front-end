export default function SelectFormInput(props: {
    label: string
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    value: number
    name: string
    options: any[]
}) {
    return (
        <>
            <div className="w-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                    {props.label}
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                    <select
                        name={props.name}
                        onChange={props.onChange}
                        value={props.value}
                        className="block w-full rounded-md border-0 py-2.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                        <option value={0}>Selecciona una opción</option>
                        {props.options.map((o) => {
                            return (
                                <option key={o.id} value={o.id}>
                                    {o.Descripcion || o.Nombre}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </div>
        </>
    )
}
