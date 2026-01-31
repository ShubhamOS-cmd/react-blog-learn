// real time editor

import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form"; // Controller 

export default function RTE({name , control , label , defaultValue = ""}){ // control -> this control is responsible to take this component form this to form we pass this control when we use this form 
    return(
        <div className="w-full">
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
            <Controller 
                name={name || "Content"}
                control={control} // who ever use this componenet pass this control and have control of this component
                render={({field : {onChange}}) => (
                    <Editor 
                    apiKey='gywt81ba2l516l3i3fd8627xy1ul2veo63tvizysnlo9iyhc'
                    initialValue= {defaultValue}
                    init={
                    {
                    branding: false,
                    height: 500,
                    menubar: true,
                    plugins:[
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:'undo redo | formatselect | bold italic backcolor |\
                    alignleft aligncenter alignright alignjustify |\
                    bullist numlist outdent indent | removeformat | help',
                    content_style: "body {font-family:Helvetica, Arial,sans-serif; font-size:14px}"
                    }
                        }
                    onEditorChange={onChange}
                    />
                )}
            />
        </div>
    )
}
