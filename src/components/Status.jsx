import {LiaCarBatterySolid} from "react-icons/lia";
import {PiSteeringWheelLight, PiBatteryEmptyBold} from "react-icons/pi";
import {BsBatteryCharging} from "react-icons/bs";
import {FaTemperatureEmpty} from "react-icons/fa6";
import {WiHumidity} from "react-icons/wi";
import {IoSpeedometerOutline, IoCarSportOutline } from "react-icons/io5";

import {Cart} from './priora/Cart.jsx'

import {useContext} from 'react'
import {MqttContext} from "../hook/useMqtt.jsx";

const Status = () => {

    const {statusPriora, statusBme280, bme280, statusCars, volt, priora} = useContext(MqttContext)

    const prioraArr = [
        {
            id: 1,
            Icon: LiaCarBatterySolid,
            value: priora.volt.voltAKB.toFixed(1),
            keyValue: "в"
        },
        {
            id: 2,
            Icon: PiSteeringWheelLight,
            value: priora.temp.tempSalon.toFixed(1),
            keyValue: "°C"
        },
        {
            id: 3,
            Icon: PiBatteryEmptyBold,
            value: priora.pressure.drg.toFixed(1),
            keyValue: "бар"
        },
        {
            id: 4,
            Icon: IoCarSportOutline,
            value: priora.temp.tempDvig.toFixed(1),
            keyValue: "°C"
        },
    ]

    const bmeArr = [
        {
            id: 1,
            Icon: FaTemperatureEmpty,
            value: bme280.temp.toFixed(1),
            keyValue: "°C"
        },
        {
            id: 2,
            Icon: IoSpeedometerOutline,
            value: bme280.press,
            keyValue: "мм рт.ст"
        },
        {
            id: 3,
            Icon: WiHumidity,
            value: bme280.humid,
            keyValue: "%"
        },
    ]

    return (
        <>
            <div className="mt-3 py-2 border rounded-lg shadow-md uppercase flex justify-center items-center">
                <h4 className="font-bold pr-3 cursor-pointer">приора</h4>
                {statusPriora ? (
                    <span className="relative flex h-3 w-3">
                  <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                ) : (
                    <span className="relative flex h-3 w-3">
                  <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                )}
            </div>


            {statusPriora && (
                <div className="flex flex-row gap-3 px-4">
                    {prioraArr.map(item => (
                        <Cart key={item.id} {...item} />
                    ))}
                </div>
            )}

            <div className="py-2 border rounded-lg shadow-md uppercase flex justify-center items-center">
                <h4 className="font-bold pr-3">машинка</h4>
                {statusCars ? (
                    <span className="relative flex h-3 w-3">
                  <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                ) : (
                    <span className="relative flex h-3 w-3">
                  <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                )}
            </div>

            {statusCars && (
                <div className="flex flex-row gap-3 px-4">
                    <Cart Icon={BsBatteryCharging} value={volt.toFixed(2)} keyValue={"в"}/>
                </div>
            )}

            <div className="py-2 border rounded-lg shadow-md uppercase flex justify-center items-center">
                <h4 className="font-bold pr-3">климат</h4>
                {statusBme280 ? (
                    <span className="relative flex h-3 w-3">
                  <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                ) : (
                    <span className="relative flex h-3 w-3">
                  <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                )}
            </div>

            {statusBme280 && (
                <div className="flex flex-row gap-3 px-4">
                    {bmeArr.map(item => (
                        <Cart key={item.id} {...item} />
                    ))}
                </div>
            )}
        </>
    )

}

export default Status