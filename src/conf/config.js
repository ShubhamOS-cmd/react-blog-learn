const conf = {
    appwrite_Url : String(import.meta.env.VITE_APPWRITE_URL),
    appwrite_projectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwrite_CollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwrite_BucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwrite_DatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    
}
// this give gurantee that all values we get definetly a string when we get key from .env
// a good approach of production 
export default conf 