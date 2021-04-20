import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AddFriend from './AddFriend'

const Friends = () => {
    const [ friendsList, setFriendsList ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false)

    useEffect(() => {
        fetchFriends();  
    }, [])

    const fetchFriends = () => {
        const token = localStorage.getItem('token');
        setIsLoading(true)
      
        axios
         .get('http://localhost:5000/api/friends', {
             headers: {
                authorization: token
             }
         })
         .then(res => {
             setIsLoading(false)
             setFriendsList(res.data)
         })
         .catch(err => {
             setIsLoading(false)
             console.log(err.respose)  
         })
    };

    return (
        <div>
            { 
                isLoading ? <div>Loading Friends...</div> :
                <div>
                {
                    friendsList.map((friend)=> {
                        return (
                            <div key={friend.id}>{`${friend.name} · ${friend.age} · ${friend.email}`}</div>
                        )
                    })
                }
                    <AddFriend fetchFriends={fetchFriends}/>
                </div>
            }
        </div>
    )
}

export default Friends;