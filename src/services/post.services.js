import axios from "axios";
import conf from '../conf/config.js'

const createPost = async (data) => {
    const {title , slug , content , featuredImage , status} = data;
    if(!title || !slug || !content || !featuredImage){
        throw new Error("All fields are required");
    }
    const formData = new FormData();
    formData.append("title" , title.toLowerCase().trim());
    formData.append("slug" , slug.toLowerCase().trim());
    formData.append("content" , content.trim());
    formData.append("status" , status);
    formData.append("featuredImage" , featuredImage[0]);
    const response_post = await axios.post(`${conf.baseurl}/post/createPost` , formData , {withCredentials:true , 
        headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("This is my response data after posting " , response_post.data);
    
    return response_post.data.data;
}
const deletePost = async(slug) => {
    if(!slug){
        throw new Error("Slug is required");
        
    }
    slug = slug.toLowerCase().trim();
    const response = await axios.delete(`${conf.baseurl}/post/deletePost/${slug}` , {withCredentials:true});
    return response;
}
const getPost = async(slug) => {
    if(!slug){
        throw new Error("Slug is required");
        
    }
    slug = slug.toLowerCase().trim();
    const response = await axios.get(`${conf.baseurl}/post/${slug}` , {withCredentials:true});
    console.log("This is my response data after get the post" , response.data);
    
    return response.data.data;
}
const getPosts = async() => {
    const response = await axios.get(`${conf.baseurl}/post/allposts`); // response is an array    
    return response.data.data;
}
const updatePost = async(data) => {
    const {title , slug , content , featuredImage , status} = data;
    if(!title || !slug || !content){
        throw new Error("All fields are required");
    }
    const formData = new FormData();
    formData.append("title" , title.toLowerCase().trim());
    formData.append("content" , content.trim());
    formData.append("status" , status);
    if(featuredImage && featuredImage?.length > 0){
        formData.append("featuredImage" , featuredImage[0]);
    }
    const updated_Post = await axios.patch(`${conf.baseurl}/post/${slug}` , formData , {withCredentials:true});
    return updated_Post.data;
}
export {
    createPost,
    deletePost,
    getPost,
    getPosts,
    updatePost
}