import { Content, Box, Button, Inputs } from 'adminlte-2-react';
import React, {useState } from 'react';
import {apiLogin} from "./API.jsx"
import {Redirect} from "react-router-dom"

const {Text} = Inputs;
const roleString = (role) => {
  switch(role) {
    case 1:
      return "admin";
    case 2:
      return "user";
    default:
      return "other" + role.toString();
  }
}

const Login = ({auth, setAuth, to}) => {
  const [account, setAccount] = useState("")
  const [password, setPassword] = useState("")

  const LoginSubmit = () => {
    apiLogin({
      Account: account,
      Password: password,
    }).then((res) => {
      setAuth(() => {
        let isLogin = true
        let username = res.data.username;
        let role = roleString(res.data.role);
        return {...auth, isLogin, username, role};
      });

      window.location = to
  })};

  return (
    <Content title={auth.username} subTitle="登入" browserTitle="Login">
      <div className="login-box">
        <div className="login-logo">
          <a href="/">
            <b>Log</b>
              in Page
          </a>
        </div>
        <div className="login-box-body">
          <Box type="primary" title="Login">
            <Text labelPosition="none" placeholder="Email" iconLeft="fas-envelope" onChange={(event)=>setAccount(event.target.value)} />
            <Text labelPosition="none" placeholder="password" inputType="password" onChange={(event)=>setPassword(event.target.value)} iconLeft="fa-key" />
            <br/>
            <Button type="primary" text="Login" onClick={LoginSubmit}/>
          </Box>
        </div>
      </div>
    </Content>
  );
};

export default Login