import { Content, Row, Col, Box, Button, Inputs } from 'adminlte-2-react';
import React, { Component,useState,useEffect} from 'react';
import PrivateContent, {useAuth} from './AuthRoute.jsx';
import Datetime from 'react-datetime';
import Modal from 'react-modal';


const {
  Text, Date, DateRange, ICheck, Select2, DateTime,
} = Inputs

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const HelloWorld = ({show, setShow}) => {
    const [localShow, setLocalShow] = useState(show)
    const handleOpen = ()=>{
      console.log("modal open");
      setLocalShow(true);
    };
    const handleClose = ()=>{
      console.log("modal close");
      setLocalShow(false);
    }

    useEffect(() => {
      const close = (e) => {
        if(e.keyCode === 27){
          handleClose()
        }
      }
      window.addEventListener('keydown', close)
    },[])


    return (
    <>
    <Content title="Hello World" subTitle="Getting started with adminlte-2-react" browserTitle="Hello World">
      <Row>
        <Col xs={6}>
          <Box title="My first box" type="primary" closable collapsable footer={<Button type="danger" onClick={handleOpen} text="Danger Button" />}>
            Hello World
          </Box>
        </Col>
        <Col xs={6}>
          <Box title="Another box">
            Content goes here
            <Datetime/>
          </Box>
        </Col>
      </Row>
    </Content>
    <Modal
      isOpen={localShow}
      contentLabel="Example Modal"
      style={customStyles}
    >
    </Modal>
    </>
    );
};

export default HelloWorld