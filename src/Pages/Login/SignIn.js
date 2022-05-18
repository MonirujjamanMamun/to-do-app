import React from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.inti';
import Loading from '../Share/Loading';

const SignIn = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const navigate = useNavigate()
    const location = useLocation
    let from = location.state?.from?.pathname || "/";
    let signError;

    if (error) {
        signError = <p className='text-white bg-red-700 px-2 py-3 rounded-lg'>Error: {error?.message}</p>
    }

    if (user) {
        navigate(from, { replace: true });
    }

    if (loading) {
        return <Loading></Loading>
    }



    const onSubmit = data => {
        createUserWithEmailAndPassword(data.email, data.password);
    }
    return (
        <div className='mx-auto lg:w-96 sm:w-0 lg:max-w-lg sm:max-w-sm my-32'>
            <div className="card bg-base-100 shadow-xl ">
                <h1 className='text-2xl font-bold text-black font-bold text-center my-5'>Sign In</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='card-body'>
                    {/* Name validation start here  */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label">Name</label>
                        <input
                            type="text" placeholder="Your Email"
                            className="input input-bordered w-full max-w-xs"
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: 'Name is Required'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                        </label>
                    </div>
                    {/* Name validation end here  */}

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
                    <input type="submit" value='Log In' className="btn text-white mt-3 max-w-xs" />
                    <p><small>You Have An Account <Link className='text-primary' to='/login'>Log In</Link> </small></p>
                </form>
            </div>

        </div>
    );
};

export default SignIn;