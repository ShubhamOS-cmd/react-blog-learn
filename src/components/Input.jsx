import React , {useId} from "react";

const Input = React.forwardRef(function Input({
    // Input what we take
    label,
    type = "text",
    classname = "",
    ...props
} , ref){ // whoever use this input pass thier own refrence that's what our reason to use the forwardref
    const id = useId() // every time unique id genrate
    return(
        <div className="w-full">
            {
                label && <label 
                className="inline-block mb-1 pl-1" htmlFor={id}>
                    {label}
                </label> // if any one passes label then label && () means if label passes then only it display

            }
            <input 
                type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black 
                    outline-none focus:bg-gray-50 
                    duration-200 border-gray-200 w-full${classname}`}
                    ref={ref} // this is the thing that give the access of your parent componenet
                    {...props}
                    id={id}
            />
        </div>
    )
})

export default Input