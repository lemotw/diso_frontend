import {Redirect} from "react-router-dom"
import {apiLogout} from "./API.jsx"
import { useState, useEffect } from 'react';

const Logout = ({
    auth, setAuth, to
}) => {
    if(!auth.isLogin)
        return (<Redirect to={to}/>)

    apiLogout({}).then((res) => {
        console.log({
            ...auth,
            role: "",
            isLogin: false,
            username: "未登入",
        });

        setAuth({
            ...auth,
            role: "",
            isLogin: false,
            username: "未登入",
        });
    });

    return (<Redirect to={to}/>)
}

export default Logout