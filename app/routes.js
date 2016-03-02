/**
 * Created by orel- on 06/Dec/15.
 */
import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import CogList from './components/CogList';
import AddFeed from './components/AddCog';
import Auth from './components/Auth';


export default (
    <Route component={App}>
        <Route path='/' component={Home} />
        <Route path='/add' component={AddFeed} />
        <Route path='/list' component={CogList} />
        <Route path='/login' component={Auth} />
    </Route>
);