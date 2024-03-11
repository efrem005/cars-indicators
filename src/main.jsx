import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'react-notifications/lib/notifications.css';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import {Mqtt} from "./hook/useMqtt.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Mqtt>
            <App/>
        </Mqtt>
    </React.StrictMode>
)