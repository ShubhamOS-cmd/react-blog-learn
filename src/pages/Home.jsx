import React, {useEffect , useState} from "react";
import {getPosts} from '../services/post.services.js'
import { Container , PostCard } from "../components";
function Home(){
    const[posts , setPosts] = useState([])
    useEffect(() => {
        const fetchPosts = async () => {
            const posts = await getPosts();
            if(posts){
                setPosts(posts);
            }
        }
        fetchPosts();
    } , [])
    if(posts.length === 0){
        return <div className="w-full py-8 mt-4 text-center">
            <Container>
                <h1 className="text-2xl font-bold hover:text-gray-500">
                    Login to read posts
                </h1>
            </Container>
        </div>
    }
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
export default Home;