import React, { useEffect, useState } from "react";
import { Container , PostCard } from "../components";
import {getPosts} from '../services/post.services.js'
function AllPost(){
    const [posts , setposts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
        const data = await getPosts();
        setposts(data);
        };
    fetchPosts();
    } , [])
    return(
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.slug} className="p-2 w-1/4">
                            <PostCard {...post}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPost