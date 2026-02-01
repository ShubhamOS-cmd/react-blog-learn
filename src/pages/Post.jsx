import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {getPost , deletePost} from '../services/post.services.js'
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);    
    const isAuthor = post && userData 
    ? post.userId === userData._id : false;
    console.log("Redux data " , userData);
        
    useEffect(() => {
        const fetchPost = async() => {
            try {
                if (slug) {
                const post = await getPost(slug);
                if(post) setPost(post);
                else navigate("/");
    
            } else navigate("/");
            } catch (error) {
                navigate("/");
            }
        }
        fetchPost();
    }, [slug, navigate]);

    const delete_Post = async () => {
        const status = await deletePost(post.slug);
        if(status){
            navigate("/");
        }
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Button bgColor="bg-green-500" onClick={() => navigate(`/edit-post/${post.slug}`)} className="mr-3">
                                Edit
                            </Button>
                            <Button bgColor="bg-red-500" onClick={delete_Post}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : <div><h1>Post in not found</h1></div>;
}