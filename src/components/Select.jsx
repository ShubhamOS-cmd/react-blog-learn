import React , {useId} from 'react'

function Select({
    options,
    label ,
    className = "",
    ...props
} , ref){
    const id = useId();
    return(
        <div className='w-full'>
            {label && <label htmlFor={id} className=''>{label}</label>}
            <select {...props} id={id} ref={ref} className={`px-3 py-2 rounded-lg bg-white text-black 
                outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}>
                    {options?.map((option) => ( // we optionally wrap because if option empty then we can't use map and our app is crash
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select) // this is also an another synatx of forward ref