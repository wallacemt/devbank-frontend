import React from "react"
import {AuthBanner} from "../Utils/AuthBanner";
export const Login = () => {
    return (
        <>
            <div className="h-screen bg-[#2a3240]">
                <div className="h-full">
                    <AuthBanner position="left" />
                </div>  
            </div>
        </>
    )
}