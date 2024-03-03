import Priora from "/src/assets/priora.png"
import {FaCarBattery} from "react-icons/fa";
import {PiSteeringWheelFill} from "react-icons/pi";


const Status = ({statusBme280, statusCars, statusPriora, volt, priora}) => {

    return (
        <>
            <img src={Priora} style={{backgroundColor: 'transparent'}} alt="priora"/>
            {statusPriora ? <h2 style={{color: 'green'}}>Статус Приора</h2> :
                <h2 style={{color: 'Red'}}>Статус Приора</h2>}
            {statusBme280 ? <h2 style={{color: 'green'}}>Статус BME280</h2> :
                <h2 style={{color: 'Red'}}>Статус BME280</h2>}
            {statusCars ? <h2 style={{color: 'green'}}>Статус Машинка</h2> :
                <h2 style={{color: 'Red'}}>Статус Машинка</h2>}
            <h3>Напряжение: {volt} в</h3>
            <FaCarBattery size={32}/>
            <h3>{priora.volt.voltAKB} в</h3>
            <h3>Давление в ресивере: {priora.pressure.drg} бар</h3>
            <PiSteeringWheelFill size={32}/>
            <h3>{priora.temp.tempSalon} °C</h3>
        </>
    )

}

export default Status