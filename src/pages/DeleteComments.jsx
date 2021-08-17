import React, {useEffect, useState} from 'react';
import { CommentService } from '../services/CommentService';
import { Container, Row, Col, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import socketIOClient from "socket.io-client";
import './Layout.scss';
const socket = socketIOClient('http://localhost:3001');

const DeleteComments = (props) => {

const [comments, setComments] = useState([]);
 
useEffect(() => {
  CommentService.get('/getComments').then(
    result => {
      setComments(result)
    });
}, []);
      
const hasComments = (comments) => {
      return (
          <div className="deletecomments">
            <h3> Click this button to delete all comments </h3>
            <Button className="btn btn-danger" onClick={deleteComments}> Delete {comments.length} Comment{comments.length > 1 && 's'}</Button>
            <p className="text-right">
            <Link to="/">
                No, Go Back Home
              </Link>
            </p>
          </div>
      );
    }

const deleteComments = () => {
      if (window.confirm('Are you sure you want to delete all the comments?')) {
        CommentService.delete('/deleteComments').then(() => {
          socket.emit("initial_data");
          setComments([]);
        });
      }
    }

 return (
      <Container className="p-3 page" fluid="sm">
        <Row>
          <Col className="text-center">
           {comments.length ? hasComments(comments) : 'Sorry, no comments found'}
          </Col>
        </Row>
      </Container>
      );
    }
 
  export default DeleteComments;