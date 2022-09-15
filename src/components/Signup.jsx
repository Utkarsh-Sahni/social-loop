import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Signup() {

    const navigate = useNavigate()

    const initialValues = { username: "", email: "", password: "", }
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false);


    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value })
        // console.log(formValues);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(e);
        setFormErrors(validate(formValues));
        setIsSubmit(true);

        const { username, email, password } = formValues

        const res = await fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        })
        const data = await res.json()

        if (data.status !== 201 || !data) {
            window.alert(data.error)
            console.log(data.error)
        }
        else {
            window.alert(data.message)
            console.log(data.message)
            navigate('/')
        }

    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit === true) {
            console.log(JSON.stringify(formValues))
        }
    }, [formErrors])

    const validate = (values) => {
        const errors = {};
        const validpass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const validemail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/

        if (!values.username) {
            errors.username = "Username is Required!!"
        }
        if (!values.email) {
            errors.email = "Email is Required!!"
        } else if (!validemail.test(values.email)) {
            errors.email = "Enter a valid Email!!"
        }
        if (!values.password) {
            errors.password = "Password is Required!!"
        } else if (!validpass.test(values.password)) {
            errors.password = "Password should contain minimum eight characters, at least one letter and one number!!"
        }

        return errors;
    }

    return (
        <div className='vh-100 d-flex align-items-center justify-content-center'>
            <div className='signup-form h-auto w-50 ml-auto shadow p-3 mb-5 bg-body rounded justify-content-center'>
                <form className='m-5' method='POST' onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <div className='form-group heading py-3'> <h2>Sign Up</h2></div>

                        <div className='form-floating'>
                            <input type='text' id='username' className='form-control' placeholder='#' name='username' value={formValues.username}
                                onChange={handleOnChange}
                            />
                            <label htmlFor='username' className='form-label'>Username</label>
                        </div>
                        <p className='text-danger'>{formErrors.username}</p>
                        <div className='form-floating'>
                            <input type='email' id='Email' className='form-control' placeholder='#' name='email' value={formValues.email}
                                onChange={handleOnChange}
                            />
                            <label htmlFor='username' className='form-label'>Email</label>
                        </div>
                        <p className='text-danger'>{formErrors.email}</p>
                        <div className='form-floating'>
                            <input type='password' id='password' className='form-control' placeholder='#' name='password' value={formValues.password}
                                onChange={handleOnChange}
                            />
                            <label htmlFor='password' className='form-label'>Password</label>
                        </div>
                        <p className='text-danger'>{formErrors.password}</p>

                    </div>
                    <button type='submit' className='btn btn-success'>Sign up</button>
                </form>
                <div className='text-center'>Already have an account? <NavLink to='/' className='text-decoration-none'>Sign in</NavLink>.</div>
            </div>
        </div>
    )
}