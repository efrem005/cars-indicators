import MQTT from 'mqtt'
import {createContext, useEffect, useRef, useState} from "react";
import { ToastContainer, toast } from 'react-toastify';

export const MqttContext = createContext({})

export const Mqtt = ({children}) => {
    const clientRef = useRef(null)
    const [load, setLoad] = useState(false)
    const [volt, setVolt] = useState(0)
    const [priora, setPriora] = useState({
        "temp": {
            "tempSalon": 0,
            "tempBagaj": 0,
            "tempDvig": 0,
            "tempKomp": 0,
            "tempYlica": 0,
            "temp12Volt": 0,
            "temp5Volt": 0
        },
        "volt": {
            "voltAKB": 0
        },
        "pressure": {
            "dlpl": 0,
            "dlpp": 0,
            "dlzl": 0,
            "dlzp": 0,
            "drg": 0
        },
        "level": {
            "ypl": 0,
            "ypp": 0,
            "yzl": 0,
            "yzp": 0
        }
    })
    const [bme280, setBme280] = useState({
        "temp": 0,
        "press": 0,
        "humid": 0
    })
    const [statusCars, setStatusCars] = useState(false)
    const [statusPriora, setStatusPriora] = useState(false)
    const [statusBme280, setStatusBme280] = useState(false)


    useEffect(() => {
        if (clientRef.current) return;

        try {
            clientRef.current = MQTT.connect( `wss://${window.location.host}/cars-indicators/mqtt`, {
                clientId: `mqtt_${Math.random().toString(16).substring(2, 8)}`,
                // rejectUnauthorized: true
            })
        } catch (error) {
            console.error("error", error);
        }

        const client = clientRef.current;


        client.on('connect', function () {
            console.log("Connected!")
            client.subscribe(['cars/#', 'priora/#', 'bme280/#'])
            setLoad(true)
            toast.success('Соединение установленно')
        });

        client.on('message', (topic, payload) => {

            if (topic === 'cars/indications') {
                setVolt(JSON.parse(payload).volt.volt)
            }
            if (topic === 'priora/indications') {
                setPriora(JSON.parse(payload))
            }
            if (topic === 'bme280/indications') {
                setBme280(JSON.parse(payload))
            }
            if (topic === 'cars') {
                Number(payload) === 1 ? setStatusCars(true) : setStatusCars(false)
                Number(payload) === 1 ? toast.success('Машинка в сети') : toast.warning('Машинка не в сети')
            }
            if (topic === 'priora') {
                Number(payload) === 1 ? setStatusPriora(true) : setStatusPriora(false)
                Number(payload) === 1 ? toast.success('Приора в сети') : toast.warning('Приора не в сети')
            }
            if (topic === 'bme280') {
                Number(payload) === 1 ? setStatusBme280(true) : setStatusBme280(false)
                Number(payload) === 1 ? toast.success('Климат в сети') : toast.warning('Климат не в сети')
            }

        })
        client.on('disconnect', () => toast.success('Соединение разорвано'))
    }, [])


    const value = {load, bme280, volt, priora, statusBme280, statusCars, statusPriora}

    return <MqttContext.Provider value={value}>
        {children}
        <ToastContainer autoClose={2000} hideProgressBar={true} />
    </MqttContext.Provider>
};