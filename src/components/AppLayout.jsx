import Navigation from '../pages/Session/Navigation'
import { Outlet } from 'react-router-dom'
import {ScrollContainer} from '../styles/StyledComponents'


function AppLayout() {
    return (
        <>
            <Navigation />
            <Outlet />
        </>
    )
}

export default AppLayout
