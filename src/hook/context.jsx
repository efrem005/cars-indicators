import {createContext} from "react";
import useMqtt from "./useMqtt.jsx";


export const CustomContext = createContext({})

export const Context = (props) => {
    const value = useMqtt()

    return <CustomContext.Provider value={value}>
        {props.children}
    </CustomContext.Provider>
}