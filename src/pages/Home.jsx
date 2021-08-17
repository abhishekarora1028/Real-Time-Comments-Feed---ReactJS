import React,  { useState, useEffect } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import socketIOClient from "socket.io-client";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import CommentsForm from '../components/CommentsForm'
import Comment from '../components/Comment'
import { CommentService } from '../services/CommentService';
import './Layout.scss';
const socket = socketIOClient('http://localhost:3001');

const Home = (props) => {
const [comments, setComments] = useState([]);

useEffect(() => {
    const fetchComments = () => { CommentService.get('/getComments').then(
      result => {
        console.log('results are', result);
        setComments(result)
      })
    };
  fetchComments();
  }, []);

useEffect(() =>{
  socket.on("newComment", data => {
    const updatedComments = [data, ...comments];
    setComments(updatedComments);
  });
})
return (
      <Container className="p-3 page" fluid="sm">
        <ReactNotification />
        <div className="commentsForm">
          <Row>
          <Col>
            <h3 className="mx-auto">Post Your Comments</h3>
          </Col>
          </Row>
          <Row>
            <Col>
              <CommentsForm/>
            </Col>
          </Row>
        </div>
        <Row>
        <Col>
        <div className="allComments text-center">
        <h3>Comments</h3>
        {comments.length ? comments.map(comment => {
            return(
              <Comment comment={comment} key={comment.id}/>
            );
          }) :
          <h5>No comments found, be the first one to post a comment! </h5>
        }
      </div>
      </Col>
      </Row>
      </Container>
    );
  }

export default Home;
