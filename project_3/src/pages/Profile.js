import React, {useEffect, useState} from 'react'
import axios from 'axios'

export default function Profile() {
    const [myOrders, setMyOrders] = useState([])
    const [user, setUser] = useState({})
    const [loggedIn, setLoggedIn] = useState(false)

    const user_id = localStorage.getItem('user_id')

    const getUser = async() => {

        let response = await axios.get(BASE_URL + 'api/users/profile', 
        {
            headers: {
                user_id : user_id
            }
        }
        )
    }





}