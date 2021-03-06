import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import AuthRouter from './AuthRouter'
import JournalScreen from '../components/journal/JournalScreen';
import {firebase} from '../firebase/firebase-config'
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import { startLoadingNotes } from '../actions/notes';

const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if(user?.uid){
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
                
                dispatch(startLoadingNotes(user.uid))
            }else{
                setIsLoggedIn(false);
            }

            setChecking(false);
        });
    }, [dispatch, setChecking, setIsLoggedIn]);

    if(checking){
        return (
            <h1>Espere...</h1>
        )
    }
    return (
        <Router>
            <Switch>

                {/* <Route path="/auth" component={AuthRouter}></Route> */}
                <PublicRoute path="/auth" isAuthenticated={isLoggedIn} component={AuthRouter}/>
                {/* <Route path="/" exact component={JournalScreen}></Route> */}
                <PrivateRoute path="/" isAuthenticated={isLoggedIn} component={JournalScreen}/>
                {/* <Redirect to="/auth/login"></Redirect> */}
            </Switch>
        </Router>
    )
}

export default AppRouter
