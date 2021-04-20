import axios from 'axios'
import React, { useState, useEffect } from 'react'

const initialFormValues = {
    name: '',
    age: '',
    email: ''
}

const AddFriend = (props) => {
    const [formValues, setFormValues] = useState(initialFormValues)

    const handleChange = e => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        })

    }

    const handleSubmit = e => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        axios.post('http://localhost:5000/api/friends', formValues,
            {
                headers: {
                    authorization: token
                }
            }
        )
            .then(res => {
                props.fetchFriends()
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name='name' type='text' value={formValues.name} onChange={handleChange} placeholder='Name'/>
                <input name='age' type='number' value={formValues.age} onChange={handleChange} placeholder='Age'/>
                <input name='email' type='email' value={formValues.email} onChange={handleChange} placeholder='Email'/>
                <button>Add Friend</button>
            </form>
        </div>
    )
}

export default AddFriend;