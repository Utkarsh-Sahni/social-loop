import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

export default function Login(props) {

    const navigate = useNavigate()

    const initialLogValues = { username: "", password: "", }
    const [logValues, setLogValues] = useState(initialLogValues)
    const [logErrors, setLogErrors] = useState({})
    const [logSubmit, setLogSubmit] = useState(false);

    const handleOnChangeLog = (e) => {
        const { name, value } = e.target;
        setLogValues({ ...logValues, [name]: value })
        // console.log(logValues);
    }
    const handleSubmitLog = async (e) => {
        e.preventDefault();
        // console.log(e);
        setLogErrors(validateLog(logValues));
        setLogSubmit(true);

        const { username, password } = logValues
        const res = await fetch('http://localhost:3001/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        const data = await res.json()

        if (data.status === 400 || !data) {
            console.log(data.error)
            window.alert(data.error)
        }
        else {
            console.log(data.message)
            window.alert(data.message)

            navigate('/home')
        }

    }

    useEffect(() => {
        if (Object.keys(logErrors).length === 0 && logSubmit === true) {
            console.log(JSON.stringify(logValues))
        }
    }, [logErrors])

    const validateLog = (values) => {
        const errors = {};
        // const validpass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (!values.username) {
            errors.username = "Username is Required!!"
        }
        if (!values.password) {
            errors.password = "Password is Required!!"
        }
        return errors;
    }
    return (
        <div className='vh-100 d-flex align-items-center justify-content-center'>
            <div className='login-form h-auto w-50 ml-auto shadow p-3 mb-5 bg-body rounded justify-content-center'>
                <form className='m-5' method='POST' onSubmit={handleSubmitLog}>
                    <div className='form-group heading py-3'> <h2>Log In</h2></div>
                    <div className='form-group'>
                        <div className='form-floating'>
                            <input type='text' id='username' className='form-control' placeholder='#' name='username' value={logValues.username}
                                onChange={handleOnChangeLog}
                            />
                            <label htmlFor='username' className='form-label'>Username</label>
                        </div>
                        <p className='text-danger'>{logErrors.username}</p>
                        <div className='form-floating'>
                            <input type='password' id='password' className='form-control' placeholder='#' name='password' value={logValues.password}
                                onChange={handleOnChangeLog}
                            />
                            <label htmlFor='password' className='form-label'>Password</label>
                        </div>
                    </div>
                    <p className='text-danger'>{logErrors.password}</p>
                    <button type='submit' className='btn btn-success'>Sign in</button>
                </form>
                <div className='text-center'>New User? <NavLink to='/signup' className='text-decoration-none'>Sign up</NavLink>.</div>

            </div>
        </div>
    )
}
