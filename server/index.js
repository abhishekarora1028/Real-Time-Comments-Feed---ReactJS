const express = require('express');
const DataAccessObject = require('./dataAccessObject');
const Comment = require('./comment');
const http = require("http");
const socketIO = require("socket.io");
var cors = require('cors');

const app = express();

app.use(cors());

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const server = http.createServer(app);
const io = socketIO(server);

const dataAccessObject = new DataAccessObject('./database.sqlite3');
const comment = new Comment(dataAccessObject);

comment.createTable().catch(error => {
  console.log(`Error: ${JSON.stringify(error)}`);
});

app.post('/createComment', function(request, response) {
  const { body } = request;
  comment.createComment(body).then(result => {    
    response.send(result);
  });
});

app.get('/getComment', function(request, response) {
  const { body } = request;
  const { id } = body;
  comment.getComment(id).then(result => {
    response.send(result);
  });
});

app.get('/getComments', function(request, response) {
  comment.getComments().then(result => {
    response.send(result);
  });
});


io.on("connection", socket => {
  socket.on("initial_data", () => {
    comment.getComments().then(result => {
      io.sockets.emit("commentsFeed", result);
    });
  });
  socket.on("new_comment", () =>{
    comment.getLatestComment().then(result =>{
      io.sockets.emit("newComment", result);
    });
  });
});

app.delete('/deleteComments', function(request, response) {
  comment.deleteComments().then(result => {
    response.send(result);
  });
});
// our server instance

server.listen(port, () => console.log(`Listening on port ${port}`));
