import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { Home, DeleteComments, NotFound } from './pages';
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

ReactDOM.render(<BrowserRouter>
    <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/deletecomments" component={DeleteComments} exact />
        <Route path="**" component={NotFound}/>
    </Switch>
</BrowserRouter>, document.getElementById('root'));
