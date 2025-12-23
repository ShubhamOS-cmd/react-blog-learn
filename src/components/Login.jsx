import React , {useState} from 'react'
import {Link ,  useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button , Input , Logo} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'  // this is use for react hook form this react hook form is for mangement forms in react applications
function Login(){
    const navigate = useNavigate(); // for navigate
    const dispatch = useDispatch(); // for redux dispatch
    const {register , handleSubmit} = useForm(); // react hook 
    // handleSubmit(keyword) is a method where we give our method that what we do after submit
    // register -> automatically pick all the data from form and what we give method in handleSubmit passes in that method it's make an object from the value
    const [error , setError] = useState("")
    // we make a method called login  
    const login = async(data) => {
        setError("") // when we start submission make error clean 
        try {
            const session =   await authService.login(data); // in response we get a session 
            if(session){ // if session -> logged in 
                // then get userdata , userdata is get by getCurrentUser not by session
                const userData = await authService.getCurrentUser();
                if(userData) dispatch(authLogin(userData)) // if we get usedata then dispatch it 
                navigate("/") // and then user is logged in send the user to root 

            }
        } catch (error) {
            setError(error.message)
        }
    }
    return(
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg
                bg-gray-100 rounded-xl p-10 border border-black/10`}>
                    <div className='mb-2 flex justify-center'>
                        <span className='inline-block w-full max-w-[100px]'>
                            <Logo width='100%' />
                        </span>
                    </div>
                    <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
                    <p className='mt-2 text-center text-base text-black/60'>
                                Don&apos;t have any account?&nbsp;
                                <Link
                                    to="/signup"
                                    className='font-medium text-primary
                                    transition-all duration-200
                                    hover:underline'
                                >Sign Up</Link>
                    </p>
                    {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                    <form onSubmit={handleSubmit(login)} className='mt-8'>
                        <div className='space-y-5'>
                            <Input 
                                label="Email: "
                                placeholder="Enter your email"
                                type="email"
                                {...register("email" , {
                                    required: true,
                                        validate: {
                                            matchPattern: (value) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Email address must be a valid address",
                                    }
                                })} // if we not write register then in another input form regisetr value is overwrite that why we use spread
                                
                            /> // this is our input component
                            <Input 
                                label="password : "
                                type="password"
                                placeholder="Enter Your Password"
                                {...register("password" , {
                                        required: true
                                })}
                            />
                            <Button
                                type='submit'
                                className='w-full'
                            >Sign IN</Button>
                        </div>

                    </form>
            </div>
        </div>
    )
}

export default Login