import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter } from 'react-router-dom';
import {LocalizeProvider} from "react-localize-redux";
// import '../public/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <LocalizeProvider>
        <HashRouter  basename={`${process.env.PUBLIC_URL}`}>
            <App/>
        </HashRouter >
    </LocalizeProvider>, document.getElementById('root'));
registerServiceWorker();
