import { Content, Box, Button, Inputs } from 'adminlte-2-react';
import React, {useState } from 'react';
import {apiSignUp} from "./API.jsx"
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const {Text} = Inputs;
const SignUp = ({auth, setAuth, to}) => {
  const [account, setAccount] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const [notice, setNotice] = useState(false)
  const [noticeStr, setNoticeStr] = useState("")
  const [success, setSuccess] = useState(false)
  const [successStr, setSuccessStr] = useState("")

  const signUpSubmit = () => {
    console.log("signup");
    apiSignUp({
      Email: account,
      Password: password,
      Name: name
    }).then((res) => {
      successReport("註冊成功");
      window.location = to
    }).catch((error) => {
      errorReport(error.response.data.error_message);
    })
  };
  const errorReport = (str) => {
    setNoticeStr(str);
    setNotice(true);
  }
  const successReport = (str) => {
    setSuccessStr(str);
    setSuccess(true);
  }

  return (
    <>
    <Content title={auth.username} subTitle="註冊" browserTitle="SignUp">
      <div className="login-box">
        <div className="login-logo">
          <a href="/">
            <b>Sign</b>
              un Page
          </a>
        </div>
        <div className="login-box-body">
          <Box type="primary" title="SignUp">
            <Text labelPosition="none" placeholder="Email" iconLeft="fas-envelope" onChange={(event)=>setAccount(event.target.value)} />
            <Text labelPosition="none" placeholder="Name" iconLeft="fas-user" onChange={(event)=>setName(event.target.value)} />
            <Text labelPosition="none" placeholder="password" inputType="password" onChange={(event)=>setPassword(event.target.value)} iconLeft="fa-key" />
            <br/>
            <Button type="primary" text="SignUp" onClick={signUpSubmit}/>
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

export default SignUp