import React, { createContext, useContext, useState } from 'react'

const User = createContext();


const UserContext = ({ children }) => {
    const [user, setuser] = useState([]);
    const [userEx, setuserEx] = useState(false);

    const getUser = async () => {

        const response = await fetch("https://crypto-hunter-website-project.herokuapp.com/api/auth/getUserInfo", {
            method: 'GET',

            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')

            },
        });
        const json = await response.json()
        console.log(json)
        setuser(json)
        setuserEx(true)
    }

    return (
        <User.Provider value={{ user, getUser, userEx }}>
            {children}
        </User.Provider>
    )
}

export default UserContext



export const UserState = () => {
    return useContext(User);
};