export default function TextFormInput(props: {
    label: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string
    name: string
    disable: boolean
}) {
    return (
        <>
            <div className="w-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                    {props.label}
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                        disabled={props.disable}
                        type="text"
                        name={props.name}
                        id={props.label}
                        onChange={props.onChange}
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder=""
                        value={props.value}
                    />
                </div>
            </div>
        </>
    )
}
