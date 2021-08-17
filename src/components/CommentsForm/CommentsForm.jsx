import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import socketIOClient from "socket.io-client";
import {store} from 'react-notifications-component';
import { CommentService } from '../../services/CommentService';
import loader from '../../assets/loading.svg';
import './CommentsForm.scss';

const socket = socketIOClient('http://localhost:3001');
const CommentsForm = (props) => {

    const [values, setValues] = useState({
        name: '',
        message: '',
        response:''
    });
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        setResponse('');
        let obj = JSON.parse(JSON.stringify(values));
        setLoading(true);
        try {
            CommentService.post('/createComment', obj).then(() => {
                setValues({
                    name: '',
                    message: '',
                    comment:'',
                })
                socket.emit("new_comment");
                store.addNotification({
                  title: "New Comment!",
                  message: "A new comment just got posted!",
                  type: "success",
                  insert: "top",
                  container: "bottom-left",
                  animationIn: ["animate__animated", "animate__fadeIn"],
                  animationOut: ["animate__animated", "animate__fadeOut"],
                  dismiss: {
                    duration: 3000,
                    onScreen: true
                  }
                });
            });
        } catch (err) {
            console.log(err);
        }
        setResponse('Comment posted successfully...');
        window.setTimeout(()=>{setResponse('');}, 3000)
        setLoading(false);
    }

    
    const changeValues = (value, key) => {
        let data = JSON.parse(JSON.stringify(values));
        data[key] = value;
        setValues(data);
    }

    return (
        <Form data-testid="commentsform">
            <Row>
                <Col sm={12} className="py-2">
                    {response !=="" ? 
                    <div className="alert alert-success" role="alert">{response}</div>
                    : "" }
                </Col>
            </Row>
            <Row>
            <Col sm={12}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={values.name}  required onChange={(e) => changeValues(e.target.value, 'name')}  placeholder="Your name goes here..." />
            </Form.Group>
            </Col>
            </Row>
            <Row>
            <Col sm={12}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Comment</Form.Label>
                <Form.Control as="textarea" rows="4" value={values.message} name="message" required  onChange={(e) => changeValues(e.target.value, 'message')} placeholder="Write your comment message here..." />
            </Form.Group>
            </Col>
            </Row>
            <Row>
            <Col sm={12} className="d-flex flex-row-reverse">
            <Button variant="primary" data-testid="commentbutton" disabled={loading} className="btn btn-primary" onClick={() => handleSubmit()}>
                        {loading ? <img style={{ width: '10%' }} src={loader} alt='loading' /> : 'Comment'}
            </Button>
            </Col>
            </Row>
      </Form>
    );
}

export default CommentsForm;