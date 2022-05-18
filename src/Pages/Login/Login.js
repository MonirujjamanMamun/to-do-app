import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../Share/Loading';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.inti';

const Login = () => {
    const [signInWithGoogle, guser, gloading, gerror] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const navigate = useNavigate()
    const location = useLocation
    let from = location.state?.from?.pathname || "/";
    let signError;

    if (error || gerror) {
        signError = <p className='text-white bg-red-700 px-2 py-3 rounded-lg'>Error: {error?.message || gerror?.message}</p>
    }

    if (user) {
        navigate(from, { replace: true });
    }

    if (loading || gloading) {
        return <Loading></Loading>
    }

    const handelWithGoogle = () => {
        signInWithGoogle()
    }

    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password);
    }
    return (
        <div className='mx-auto lg:w-96 sm:w-0 lg:max-w-lg sm:max-w-sm my-32'>
            <div className="card bg-base-100 shadow-xl ">

                <h1 className='text-2xl font-bold text-black font-bold text-center my-5'>Log In</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='card-body'>
                    {/* email validation start here  */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label">Email</label>
                        <input
                            type="email" placeholder="Your Email"
                            className="input input-bordered w-full max-w-xs"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: 'Email is Required'
                                },
                                pattern: {
                                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                    message: 'Provide a valid Email'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                            {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        </label>
                    </div>
                    {/* email validation end here  */}

                    {/* password validation start here  */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label">Password</label>
                        <input
                            type="password" placeholder="Password"
                            className="input input-bordered w-full max-w-xs"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "Password is Requar"
                                },
                                minLength: {
                                    value: 8,
                                    message: 'Must be 8 Character or longer'
                                }
                            })}
                        />
                        <label className='label'>
                            {errors.password?.type === 'required' && <span className='text-red-600 label-text-alt'>{errors.password.message}</span>}
                            {errors.password?.type === 'minLength' && <span className='text-red-600 label-text-alt'>{errors.password.message}</span>}
                        </label>
                    </div>

                    {/* password validation end here  */}
                    {signError}
                    <input type="submit" value='Forget Password?' className='text-left' />
                    <input type="submit" value='Log In' className="btn text-white mt-3 max-w-xs" />

                    <div className='divider'>OR</div>

                    <p><small>New to To Do App <Link className='text-primary' to='/signin'>Create A New Account</Link> </small></p>
                    <button onClick={handelWithGoogle} type="submit" value='Continue With Google' className="btn text-white mt-3 max-w-xs">Continue With Google</button>

                </form>
            </div>

        </div>
    );
};

export default Login;