import { Content, Box, Button, Inputs } from 'adminlte-2-react';
import React, {useState } from 'react';
import {apiLogin} from "./API.jsx"
import {Redirect} from "react-router-dom"
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

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
  const [notice, setNotice] = useState(false)
  const [success, setSuccess] = useState(false)
  const [noticeStr, setNoticeStr] = useState("")
  const [successStr, setSuccessStr] = useState("")

  const errorReport = (str) => {
    setNoticeStr(str);
    setNotice(true);
  }
  const successReport = (str) => {
    setSuccessStr(str);
    setSuccess(true);
  }

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

      successReport("登入成功");
      window.location = to;
  }).catch((error) => {
    errorReport(error.response.data.error_message);
  })};

  return (
    <>
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
      <Snackbar open={notice} autoHideDuration={6000} onClose={()=>{setNotice(false);}}>
        <Alert severity="error">{noticeStr}</Alert>
      </Snackbar>
      <Snackbar open={success} autoHideDuration={6000} onClose={()=>{setSuccess(false);}}>
        <Alert severity="success">{successStr}</Alert>
      </Snackbar>
    </>
  );
};

export default Login