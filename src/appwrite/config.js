import conf from "../conf/config.js";
import { Client  , ID , Databases , Storage , Query} from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwrite_Url)
            .setProject(conf.appwrite_projectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }


    async createPost({title , slug , content , featuredImage , status , userid}){
        try {
            return await this.databases.createDocument({
                databaseId: conf.appwrite_DatabaseId , 
                collectionId: conf.appwrite_CollectionId,
                documentId: slug, // we consider the slug as a documentId
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                    userid
                }
            }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error " , error);
        }
    }
    async updatePost( slug  , {title  , content , featuredImage , status }){
        try {
            
            return await this.databases.updateDocument({
                    databaseId: conf.appwrite_DatabaseId,
                    collectionId: conf.appwrite_CollectionId,
                    documentId: slug,
                    data:{
                        title,
                        content,
                        featuredImage,
                        status,
                    }
                
            });

        } catch (error) {
            console.log("Appwrite service :: updatePost :: error " , error);
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument({
                databaseId: conf.appwrite_DatabaseId,
                collectionId: conf.appwrite_CollectionId,
                documentId: slug,
            });
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error " , error);
            return false;
        }
    }
    async getPost(slug){ // if we want only single post
        try {
            return await this.databases.getDocument({
                databaseId: conf.appwrite_DatabaseId,
                collectionId: conf.appwrite_CollectionId,
                documentId: slug
            })
        } catch (error) {
            console.log("Appwrite service :: getPost :: error " , error);
            return false;
        }
    }
    // if we want all post 
    // we give only those post which status type is  active 
    async getPosts(queries = [Query.equal("status" , "active")]){
        try {
            return await this.databases.listDocuments({
                databaseId: conf.appwrite_DatabaseId,
                collectionId: conf.appwrite_CollectionId,
                queries: queries,
            })
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error " , error);
            return false;
        }
    }
    // file upload methods
    async uploadfile(file){
        try {
            return await this.bucket.createFile({
                bucketId: conf.appwrite_BucketId,
                fileId: ID.unique(),
                file : file
            });
        } catch (error) {
            console.log("Appwrite service :: uploadfile :: error " , error);
            return false;
        }
    }
    async deletefile(fileId){
        try {
            await this.bucket.deleteFile({
                bucketId: conf.appwrite_BucketId,
                fileId: fileId
            });
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletefile :: error " , error);
            return false;
        }
    }
    getfilePreview(fileId){
        return this.bucket.getFilePreview({
            bucketId: conf.appwrite_BucketId,
            fileId: fileId
        })
    }
}


const service = new Service();

export default service;