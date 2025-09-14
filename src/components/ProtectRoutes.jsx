import styled from "styled-components"
import  Spinner  from "./Spinner"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import useUser from "../Authentication/useUser"

const FullPage = styled.div`
    display : flex ;
    height : 100vh ;
    justify-content : center ; 
    align-items : center ;
`

function ProtectingRoutes({children}) {
    const navigate = useNavigate()
    const {isLoading , isAuthenticated} = useUser()

    useEffect(function(){
        if(!isAuthenticated && !isLoading) navigate('landing' , {replace : true})
    },[isAuthenticated , isLoading , navigate])

    if (isLoading) {
        return <Spinner />
    }

    if(isAuthenticated) return <Outlet />
}

export default ProtectingRoutes

