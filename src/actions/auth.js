import Swal from 'sweetalert2';

import { types } from './../types/types';
import {firebase, googleAuthProvider} from '../firebase/firebase-config'
import { startLoading, finishLoading } from './ui';
import { noteLogout } from './notes';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading());
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(({user}) =>{
            dispatch(login(user.uid, user.displayName));
            dispatch(finishLoading());
        }).catch(err => {
            dispatch(finishLoading());
            Swal.fire('Error',err.message,'error')
        });

    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        dispatch(startLoading());
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async ({user}) => {
            await user.updateProfile({
                displayName: name
            });
            // console.log(user)
            dispatch(login(user.uid, user.displayName))
            dispatch(finishLoading());
        }).catch(err => {
            dispatch(finishLoading());
            Swal.fire('Error',err.message,'error')
        });
    }
}

export const startGooglelogin = () => {
    return ( dispatch ) => {
        firebase.auth().signInWithPopup(googleAuthProvider).then( ({user}) => {
            // console.log(userCred)
            dispatch(login(user.uid, user.displayName))
        });
    }
}

export const login = (uid, displayName) => (
    {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
)


export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();

        dispatch(logout());
        dispatch(noteLogout())
    }
}

export const logout = () =>({
    type: types.logout
})
