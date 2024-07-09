import React, { Children } from "react";
import { createContext } from "react";
import { useState } from "react";

export const LabContext = createContext();

export const LabProvider({Children})=>{
    const [Lab, setLab]= useState([])
return(
    <LabContext.Provider value={[Lab, setLab]}>
        {Children}
    </LabContext.Provider>
)
}