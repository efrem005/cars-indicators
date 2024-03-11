import Status from './components/Status';
import {useContext} from "react";
import {MqttContext} from "./hook/useMqtt.jsx";

function App() {

    const {load} = useContext(MqttContext)



    if (!load) return ''

    return (
        <div className="container m-auto">
            <header className="flex flex-col gap-3">
                <Status/>
            </header>
        </div>
    );
}

export default App;
