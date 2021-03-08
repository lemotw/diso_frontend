import logo from './img/logo.svg';
import user from './img/user.png';

import AdminLTE, { Sidebar, Navbar} from 'adminlte-2-react';
import { useState, useEffect } from 'react';

import './css/App.css';
import {apiRoomList} from "./components/API.jsx";
import HelloWorld from './components/Helloworld.jsx'
import RoomList from "./components/RoomList.jsx"
import Logout from "./components/Logout.jsx"
import Login from './components/Login.jsx'
import {PrivateRoute, PrivateItem, NotPrivateItem} from "./components/Private.jsx"


const { Item,UserPanel,Header } = Sidebar;
const {
  MessageItem, Entry, NotificationItem, TaskItem,
} = Navbar;

const defaultAuth = JSON.parse(localStorage.getItem("auth")) || {
  username: "未登入",
  isLogin: false,
  role: "",
}

// 之後要改成加密
const saveAuth = (auth) => 
  localStorage.setItem("auth", JSON.stringify(auth));

function App() {
  const [auth, setAuth] = useState(defaultAuth)
  const [roomList, setRoomList] = useState([])
  const [ss, setss] = useState(false)
  useEffect(() =>saveAuth(auth), [auth]);
  useEffect(() => {
    apiRoomList({}).then((res) => {
      setRoomList(res.data);
    });
  } ,[]);

  let sidebar = [
    <UserPanel username={auth.username} imageUrl={user} status={auth.role} statusType="success"/>,
    <NotPrivateItem auth={auth}><Item key="login" text="登入" to="/login" /></NotPrivateItem>,
    <PrivateItem auth={auth}><Item key="logout" text="登出" to="/logout" icon="fas-power-off"/></PrivateItem>,
    <Header text="操作" />,
    <PrivateItem auth={auth}><Item key="roomlist" text="客房清單" to="/roomlist" /></PrivateItem>,
  ];


  return (
    <div className="app-container">
      <AdminLTE title={["DiSoo"]} titleShort={["Di", "Soo"]} theme="black" sidebar={sidebar}>
        <PrivateRoute auth={auth} path="/roomlist" redirect="/login">
          <RoomList roomList={roomList} show={false} setRoomList={setRoomList}/>
        </PrivateRoute>

        <Login path="/login" auth={auth} setAuth={setAuth} to="/"/>
        <Logout path="/logout" auth={auth} setAuth={setAuth} to="/"/>
      </AdminLTE>
    </div>
  );
}

export default App;
