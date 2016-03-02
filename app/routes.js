/**
 * Created by orel- on 06/Dec/15.
 */
import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import FeedList from './components/FeedList';
import AddFeed from './components/AddFeed';
import Auth from './components/Auth';


export default (
    <Route component={App}>
        <Route path='/' component={Home} />
        <Route path='/add' component={AddFeed} />
        <Route path='/list' component={FeedList} />
        <Route path='/login' component={Auth} />
    </Route>
);