import React, {useState} from 'react'
import {axiosWithAuth} from '../utilities/axiosWithAuth';

export const Login = (props) => {
    const [credentials, setCredentials] = useState({});
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = e => {
        e.preventDefault();
        setIsLoading(true)
        axiosWithAuth().post('http://localhost:5000/api/login', credentials)
        .then(res => {
            localStorage.setItem('token', res.data.payload);
            props.history.push('/friendslist');
            setIsLoading(false)
        })
        .catch(err => {
            console.log(err);
            setIsLoading(false)
        })
    }

    const handleChange = e => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        })
    }
    
    return (
        <div className='main'>
            {isLoading ? <h2>Loading...</h2> : 
            <form onSubmit={handleLogin}>
                <label>
                    <input type='text' name='username' value={credentials.username} placeholder='Enter Username: ' onChange={handleChange}/>
                </label>
                <label>
                    <input type='password' name='password' value={credentials.password} placeholder='Enter Password: ' onChange={handleChange}/>
                </label><br></br>
                <button>Login</button>
            </form>
            }
        </div>
    )
}