import React from "react";

function Button({
    childern, // this is text what we pass to show on button
    type = 'button',
    bgColor = "bg-blue-600",
    textColor = '',
    className = '', // sometime classname is also passes 
    ...props // by this whatever value we passes all spread
}){
    return(
        <button className={`px-4 py-2 rounded-lg  ${bgColor} ${className} ${textColor}`} {...props}>
            {childern}
        </button>
    )
}

export default Button


// ForwardRef Use
/* 
    if we make our login form and we have make our input field and what we do 
    we uses same input field in our username field , password field , email field in all these we uses same input field or same componenet which make an individual
    so we need refrence of this component in login page that where we uses react called forwardred
    in input.jsx we use this important concept
*/