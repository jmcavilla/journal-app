import React from 'react';
import {Provider} from 'react-redux';
import AppRouter from './routers/AppRouter';
import { store } from './store/store';



const JournalApp = () => {
    return (
        <Provider store={ store }>
            <AppRouter>
                {/* <h1>Journal App</h1> */}
            </AppRouter>
        </Provider>
    )
}

export default JournalApp
