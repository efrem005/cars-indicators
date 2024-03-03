import mqtt from 'mqtt'
import {useEffect, useState} from "react";

const useMqtt = () => {

    const client = mqtt.connect({
        protocol: 'ws',
        host: '192.168.3.15',
        port: Number(8080),
        clientId: `mqtt_${Math.random().toString(16).substring(2, 8)}`,
        protocolVersion: 5
    });

    const [volt, setVolt] = useState(0)
    const [priora, setPriora] = useState({
        "temp": {
            "tempSalon": 20.1,
            "tempBagaj": 4.3,
            "tempDvig": 57.9,
            "tempKomp": -10.3,
            "tempYlica": -9.4,
            "temp12Volt": -7.4,
            "temp5Volt": -10.9
        },
        "volt": {
            "voltAKB": 14.1
        },
        "pressure": {
            "dlpl": 3.5,
            "dlpp": 3,
            "dlzl": 4.1,
            "dlzp": 5,
            "drg": 4.6
        },
        "level": {
            "ypl": 18,
            "ypp": 33,
            "yzl": 55,
            "yzp": 47
        }
    })
    const [bme280, setBme280] = useState({
        "temp": 26.9,
        "press": 747,
        "humid": 35
    })
    const [statusCars, setStatusCars] = useState(false)
    const [statusPriora, setStatusPriora] = useState(false)
    const [statusBme280, setStatusBme280] = useState(false)

    useEffect(() => {
        client.on('connect', function() {
            console.log("Connected!")
            client.subscribe(['cars/#', 'priora/#', 'bme280/#'])
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
            }
            if (topic === 'priora') {
                Number(payload) === 1 ? setStatusPriora(true) : setStatusPriora(false)
            }
            if (topic === 'bme280') {
                Number(payload) === 1 ? setStatusBme280(true) : setStatusBme280(false)
            }

        })
    }, [])


    return { client, bme280, volt, priora, statusBme280, statusCars, statusPriora }

};

export default useMqtt;