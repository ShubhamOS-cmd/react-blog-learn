import React , {useEffect , useState} from "react";
import { Container , PostForm } from "../components";
import {getPost} from '../services/post.services.js'
import { useNavigate, useParams } from "react-router-dom";

function EditPost(){
    const [post , setPosts] = useState(null)
    const {slug} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchPost = async() => {
            try {
                if(slug){
                    const post = await getPost(slug);
                    if(post)setPosts(post);
                }
                else{
                navigate('/');
                }
            } catch (error) {
                navigate('/');
            }
        }
        fetchPost();
    } ,[slug , navigate])
    return post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    ) : null
}

export default EditPost