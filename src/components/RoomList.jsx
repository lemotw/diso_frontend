import React, { Component } from 'react';
import {apiRoomList, apiRoomUpdate} from "./API.jsx";
import {useState, useEffect} from 'react';
import Datetime from 'react-datetime';

import Modal from 'react-modal';
import Table from './Table.jsx';
import {useForm} from './useForm.js';

import {
  Content, Row, Box, Col, ProgressBar, Badge, Label, Inputs, Button,
} from 'adminlte-2-react';
const {Text, Select2} = Inputs;

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    width                 : '50%',
    height                : '80%',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    overflowY             : 'auto',
  },
  overlay: {
    zIndex                : 3,
  }
};
const initialRoom = {
  Name: "",
  Address: "",
  Rent: 0,
  SecurityDeposit: 0,
  RentTimeStart: "",
  PaymentCycle: 0,
  CycleCount: 0,
  Renter: {
    Name: "",
    Email: "",
    Phone: ""
  }
}

const RoomList = ({
  roomList, setRoomList, show
}) => {
  if(roomList.length == 0) {
    apiRoomList({}).then((res) => {
      setRoomList(res.data);
    });
  }
  const [innerRoomList, setInnerRoomList] = useState(roomList)
  const [editShow, setEditShow] = useState(false)
  const [newShow, setNewShow] = useState(false)
  const [notice, setNotice] = useState(false)

  const [cycle, setCycle] = useState(1)
  const [cycleLong, setCycleLong] = useState("月")
  const [newRoom, setNewRoom] = useState(initialRoom)
  const [editRoom, setEditRoom] = useState(initialRoom)
  const setRoomValue = (event_) => {
    console.log(event_);
    setEditRoom({
      ...editRoom,
      [event_.target.name]: event_.target.value
    });
  }
  const setNewRoomValue = (event_) => {
    setNewRoom({
      ...newRoom,
      [event_.target.name]: event_.target.value
    });
  }
  const openSetRoom = (props) => {
    return () => {
    setEditRoom(props.row.original);
    handleEditOpen();
  }};

  useEffect(()=>setInnerRoomList(roomList) ,[roomList])
  useEffect(()=>setCycleLong(((cycle/12 >= 1)?((cycle/12)+"年"):"") + ((cycle%12 >= 1)?((cycle%12)+"月"):"")), [cycle])
  const [handleEditOpen, handleEditClose] = [() => {setEditShow(true)}, () => {setEditShow(false)}]
  const [handleNewOpen, handleNewClose] = [() => {setNewShow(true)}, () => {setNewShow(false)}]

  const createRoom = () => {
    apiRoomUpdate({
      id: 0,
      name : "陶朱隱園五樓",
      address : "台北市信義區松勇路",
      rent : 100000,
      securityDeposit : 200000,
      rentTimeStart : "2021-03-03T22:53:28+00:00",
      paymentCycle : 1,
      cycleCount : 24,
      renterName : "王永慶女兒",
      renterEmail : "kusyunexcl@gmail.com",
      renterPhone : "0979992680"
    })
  }

  // Filter
  const [label, setLabel] = useState("")
  const [address, setAddress] = useState("")
  const [renter, setRenter] = useState("")
  const clickFiliter = () => {
    let list_temp = innerRoomList
    list_temp = label == ""?list_temp:list_temp.filter(d=>d.Name.includes(label))
    list_temp = address == ""?list_temp:list_temp.filter(d=>d.Address.includes(address))
    list_temp = renter == ""?list_temp:list_temp.filter(d=>d.Renter.Name.includes(renter))
    setInnerRoomList(list_temp)
  }

  const columns = React.useMemo(() => [{
      Header: () => null,
      id: 'column_header',
      columns: [{
        Header: '標籤',
        accessor: 'Name',
        },{
          Header: '地址',
          accessor: 'Address',
        },{
          Header: '承租人',
          accessor: 'Renter.Name',
        },{
          Header: '操作',
          Cell: props => {
            return (
              <>
              <Row>
                <Col xs={6}>
                  <Button block type="primary" text="修改" onClick={openSetRoom(props)}/>
                </Col>
                <Col xs={6}>
                  <Button block type="danger" text="刪除"/>
                </Col>
              </Row>
              </>
            );
          }}],
        }],[]);

  return (
    <>
    <Content title="房間列表" subTitle="preview of simple tables">
      <Row>
        <Col md={12}>
          <Box border header={(
            <Row>
              <Col xs={2}>
                <Text style="z-index:none;" labelPosition="none" placeholder="標籤" iconLeft="fa-at" onChange={event=>setLabel(event.target.value)}/>
              </Col>
              <Col xs={4}>
                <Text style="z-index:none;" labelPosition="none" placeholder="地址" iconLeft="fa-home" onChange={event=>setAddress(event.target.value)}/>
              </Col>
              <Col xs={2}>
                <Text style="z-index:none;" labelPosition="none" placeholder="承租人" iconLeft="fa-user" onChange={event=>setRenter(event.target.value)} />
              </Col>
              <Col xs={2}>
                <Button block type="default" text="過濾" flat onClick={clickFiliter}/>
                <Button block type="success" text="新增客房" flat onClick={handleNewOpen}/>
              </Col>
            </Row>
           )}>
            <div className="table-responsive">
              <Table columns={columns} data={innerRoomList}/>
            </div>
          </Box>
        </Col>
      </Row>
    </Content>

    <Modal
      isOpen={newShow}
      contentLabel="Example Modal"
      style={customStyles}
    >
      <Row>
        <Box type="primary" title="租房新增" footer={
          <>
            <Button type="primary" text="Save" onClick={()=>{}}/>
            <Button type="default" text="Cancel" onClick={handleNewClose}/>
          </>
        }>
          <label>名稱：</label>
          <Text name="Name" value={newRoom.Name} iconLeft="fas-user" labelPosition="none" placeholder="名稱" onChange={setNewRoomValue}/>
          <label>地址：</label>
          <Text name="Address" value={newRoom.Address} iconLeft="fas-home" labelPosition="none" placeholder="地址" onChange={setNewRoomValue}/>
          <label>租金：</label>
          <Text name="Rent" value={newRoom.Rent} iconLeft="fa-credit-card" labelPosition="none" placeholder="租金" onChange={setNewRoomValue}/>
          <label>保證金：</label>
          <Text name="SecurityDeposit" value={newRoom.SecurityDeposit} iconLeft="fa-credit-card" labelPosition="none" placeholder="保證金" onChange={setNewRoomValue}/>

          <label>租金起始：</label>
          <Datetime
            iconLeft="fas-calendar"
            format="YYYY-MM-DDTHH:MM:SSZ"
            value={newRoom.RentTimeStart}
            inputIconPosition="before"
            onChange={(time)=>{
              setNewRoom({
                ...newRoom,
                RentTimeStart: time.format("YYYY-MM-DDTHH:MM:SSZ").toString()
              });
            }}
          />
          <br/>

          <label>租金收款週期：</label>
          <select name="CycleCount" onChange={setNewRoomValue}>
            <option value="1">每月</option>
            <option value="12">每年</option>
          </select> <br/><br/>

          <label>租約期長：</label>
          <Text name="CycleCount" value={newRoom.CycleCount} iconLeft="fas-home" labelPosition="none" placeholder={cycleLong} onChange={setNewRoomValue}/>

          <label>承租人姓名：</label>
          <Text iconLeft="fas-user" value={newRoom.Renter.Name} labelPosition="none" placeholder="承租人姓名" onChange={(event_) => {
            setNewRoom({
              ...newRoom,
              Renter: {
                ...newRoom.Renter,
                Name: event_.target.value
            }});
          }}/>
          <label>承租人Email：</label>
          <Text iconLeft="fas-envelope" value={newRoom.Renter.Email} labelPosition="none" placeholder="承租人 Email" onChange={(event_) => {
            setNewRoom({
              ...newRoom,
              Renter: {
                ...newRoom.Renter,
                Email: event_.target.value
              }});
          }}/>
          <label>承租人電話：</label>
          <Text iconLeft="fas-phone" value={newRoom.Renter.Phone} labelPosition="none" placeholder="承租人 電話" onChange={(event_) => {
            setNewRoom({
              ...newRoom,
              Renter: {
                ...newRoom.Renter,
                Phone: event_.target.value
              }});
          }}/>
        </Box>
      </Row>
    </Modal>


    <Modal
      isOpen={editShow}
      contentLabel="Example Modal"
      style={customStyles}
    >
      <Row>
        <Box type="primary" title="租房編輯" footer={
          <>
            <Button type="primary" text="Save" />
            <Button type="default" text="Cancel" onClick={handleEditClose}/>
          </>
        }>
          <label>名稱：</label>
          <Text name="Name" value={editRoom.Name} iconLeft="fas-user" labelPosition="none" placeholder="名稱" onChange={setRoomValue}/>
          <label>地址：</label>
          <Text name="Address" value={editRoom.Address} iconLeft="fas-home" labelPosition="none" placeholder="地址" onChange={setRoomValue}/>
          <label>租金：</label>
          <Text name="Rent" value={editRoom.Rent} iconLeft="fa-credit-card" labelPosition="none" placeholder="租金" onChange={setRoomValue}/>
          <label>保證金：</label>
          <Text name="SecurityDeposit" value={editRoom.SecurityDeposit} iconLeft="fa-credit-card" labelPosition="none" placeholder="保證金" onChange={setRoomValue}/>

          <label>租金起始：</label>
          <Datetime
            iconLeft="fas-calendar"
            format="YYYY-MM-DDTHH:MM:SSZ"
            value={editRoom.RentTimeStart}
            inputIconPosition="before"
            onChange={(time)=>{
              setEditRoom({
                ...editRoom,
                RentTimeStart: time.format("YYYY-MM-DDTHH:MM:SSZ").toString()
              });
            }}
          />
          <br/>

          <label>租金收款週期：</label>
          <select name="CycleCount" onChange={setRoomValue}>
            <option value="1">每月</option>
            <option value="12">每年</option>
          </select> <br/><br/>

          <label>租約期長：</label>
          <Text name="CycleCount" value={editRoom.CycleCount} iconLeft="fas-home" labelPosition="none" placeholder={cycleLong} onChange={setRoomValue}/>

          <label>承租人姓名：</label>
          <Text iconLeft="fas-user" value={editRoom.Renter.Name} labelPosition="none" placeholder="承租人姓名" onChange={(event_) => {
            setEditRoom({
              ...editRoom,
              Renter: {
                ...editRoom.Renter,
                Name: event_.target.value
            }});
            console.log(editRoom);
          }}/>
          <label>承租人Email：</label>
          <Text iconLeft="fas-envelope" value={editRoom.Renter.Email} labelPosition="none" placeholder="承租人 Email" onChange={(event_) => {
            setEditRoom({
              ...editRoom,
              Renter: {
                ...editRoom.Renter,
                Email: event_.target.value
              }});
            console.log(editRoom);
          }}/>
          <label>承租人電話：</label>
          <Text iconLeft="fas-phone" value={editRoom.Renter.Phone} labelPosition="none" placeholder="承租人 電話" onChange={(event_) => {
            setEditRoom({
              ...editRoom,
              Renter: {
                ...editRoom.Renter,
                Phone: event_.target.value
              }});
            console.log(editRoom);
          }}/>
        </Box>
      </Row>
    </Modal>
    
    </>
  );
}

export default RoomList;
