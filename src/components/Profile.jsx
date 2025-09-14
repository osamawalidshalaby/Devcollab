import { ChevronDown  , LogOut  , ChevronUp} from "lucide-react"
import { useState } from "react"
import styled from "styled-components"
import useLogout from "../Authentication/useLogout"
import useProfile from "../Authentication/useProfile"
import { Spinner } from "./Spinner"



const Header = styled.div`
    display : flex ;
    flex-direction : row ;
    justify-content : center ; 
    align-items : center ;
    position : relative ;
`
const Avtar = styled.div`
    border-radius : 50% ;
    width : 40px ; 
    height : 40px ; 
    display : flex ;
    flex-direction : row ;
    justify-content : center ; 
    align-items : center ;
    background: linear-gradient(135deg, rgb(245, 158, 11) 0%, rgb(249, 115, 22) 100%);
    color : black ; 
    margin : 11px;
    font-weight : bolder ;
`
const Name = styled.div`
    display : flex ;
    flex-direction : row ;
    justify-content : center ; 
    align-items : center ;
    background-color: #7e7e7e87;
    color: #FFF;
    padding: 5px 8px;
    border-radius: 9px;
    cursor: pointer;
    margin-right: 20px;
`

const UserDate = styled.div`
    position: absolute;
    display: none;
    background-color: #565656;
    top: 100%;
    left: 12%;
    color: #ffffff;
    border-radius: 10px;
    padding: 10px 21px;
`

const FullPage = styled.div`
    position : fixed;
    height : 100vh ;
    width : 100%;
    left : 50%;
    top : 50%;
    transform : translate(-50%,-50%);
    background-color : var(--color-bg);
`



function Profile() {
    const { profile, isLoading  , error} = useProfile()
    console.log(profile)
    const {Logout , isLogout} = useLogout()
    const [open  , setOpen] = useState(false)
    if(isLoading) return <FullPage><Spinner /></FullPage>
    return (
        <Header>
            <Avtar>{profile.avatar}</Avtar>
            <Name onClick={() => setOpen(open => !open)}>{profile.username} {!open ? <ChevronDown /> : <ChevronUp />}</Name>
            <LogOut cursor={'pointer'} onClick={Logout}/>
            <UserDate style={open ? {display : 'block'} : {display : 'none'}}>
                <p style={{marginBottom : '12px'}}>Name : {profile.username}</p>
                <p>ID : {profile.random_id}</p>
            </UserDate>
        </Header>
    )
}

export default Profile
