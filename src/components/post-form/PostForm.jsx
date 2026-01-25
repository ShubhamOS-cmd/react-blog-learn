// post form is creating or editing blog posts 
// when we edit a post we pass the existing post data as a prop
// the form loads with existing data using defaults values

import React  , {useCallback}from "react";
import { useForm } from "react-hook-form";
import {Button , Input , Select , RTE} from '../index'
import appwriteService from '../../appwrite/config';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({post}){
    const {register , handleSubmit ,watch , setValue , control , getValues} = useForm({
        defaultValues:{
            title : post?.title || '',
            slug : post?.slug || '',
            content : post?.content || '',
            status : post?.status || 'active'
        },
    }) // watch is a method provided by react hook useform that allows that allow you to cotinue monitoring the field in real time
      // setValue is use for directly set value in form 
      // control give the control of a form 
    // we can pass default values in form 
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);
    // if user submit the form then what we do 
    // there is 2 cases
    // if post exists means we edit a existing post
    // else we create a new post 
    const submit = async (data) => {
        if(post){ // we go to edit if we have post 
            // first handle the file 

           const file =  data.image[0] ? appwriteService.uploadfile(data.image[0]): null;
           if(file){ // if new file is upload then we delete old file 
            appwriteService.deletefile(post.featuredImage)
           } 

           const dbPost = await appwriteService.updatePost(post.$id , {
            ...data,
            featuredImage: file ? file.$id : undefined
           })

           if(dbPost){
            navigate(`/post/${dbPost.$id}`)
           }
        }
        else{ // if not post then we do not have anything which we update so user want to create a form
            
            const file = data.image[0] ? await appwriteService.uploadfile(data.image[0]) : null;
            console.log("FILE DATA " + file);
            console.log("USER DATA "+userData);
            
            if(file){
                const fileId = file.$id
                data.featuredImage = fileId
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userid: userData.$id,
                })
                console.log("DB POST "+ dbPost);
                
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
            else{
                console.log("Not respond");
            }

        }
    }
    const slugTransform = useCallback((value) => {
        if(value && typeof value === 'string'){
            return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g,'-')
            .replace(/\s/g,'-')
        }
        return ''
    } , [])
    // slugTransform -> watch title and genrate Slug convert space to -
    React.useEffect(() => {
        const subscription = watch((value , {name}) => {
            if(name === 'title'){
                setValue('slug' , slugTransform(value.title , {shouldValidate: true}))
            } // in slug field we set value 
        })

        return () => {
            subscription.unsubscribe()
        } // we do this for memory management and optimization
    } , [watch , slugTransform , setValue])
    // we make our watch in form 
    return(
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
            <Input
            label="Title :"
            placeholder="Title"
            {...register("title" , {required:true})}
            />
            <Input 
            label="Slug :"
            placeholder="Slug"
            {...register("slug" , {required:true})}
            onInput={(e) => { 
                setValue("slug" , slugTransform(e.currentTarget.value),{shouldValidate:true});
            }}
            />
            <RTE 
            label="Content :"
            name="content"
            control={control}
            defaultValue={getValues("content")}
            />
            </div>
            <div className="w-1/3 px-2">
            <Input 
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg , image/gif"
            {...register("image" , {required:!post})}
            />
            {post && (
                <div className="w-full mb-4">
                    <img 
                    src={appwriteService.getfilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-lg"
                    />
                </div>
            )}
            <Select
            options={["active" , "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status" , {required:true})}
            />
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                {post ? "Update" : "Submit"}
            </Button>
            </div>
        </form>
    )
}