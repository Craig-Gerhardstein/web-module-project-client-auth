import React, {useState} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const initialFormValues = {
    username: '',
    password: ''
}

const Login = () => {
    const [formValues, setFormValues] = useState(initialFormValues)
    const [isLoading, setIsLoading] = useState(false)

    const history = useHistory()

    const handleChange = e => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        })

    }

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true)

        axios
            .post('http://localhost:5000/api/login', formValues)
            .then(res => {
                localStorage.setItem('token', res.data.payload)
                setIsLoading(false)
                history.push('/Friends')
            })
            .catch(err => {
                setIsLoading(false)
                console.log(err.response)
            })

        setFormValues(initialFormValues)
    }

    return (
        <div>
            <form onSubmit={submit}>
                <input name={'username'} type='text' placeholder='Username' value={formValues.username} onChange={handleChange}/>
                <input name={'password'} type='password' placeholder='Password' value={formValues.password} onChange={handleChange}/>
                <button>Login</button>
            </form>
            {
                isLoading ? <div>Loading...</div> : null
            }
        </div>
    )
}

export default Login;