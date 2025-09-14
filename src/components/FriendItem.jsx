import styled from "styled-components";
import Button from "./Button";
import { UserPlus } from "lucide-react";
import useAddFriend from "../Authentication/useAddFriend";
import useUser from "../Authentication/useUser";



const Friend = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: rgb(51, 65, 85);
    border-radius: 8px;
    gap: 1rem;
`
const Info = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1 1 0%;
    min-width: 0px;
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
`

const P = styled.div`
    font-size: 1rem;
    font-weight: 600;
    color: rgb(248, 250, 252);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

function FriendItem({friend}) {
    const {addFriendMutate , isAdding} = useAddFriend();
    const {user} = useUser()

    function handleAddFriend() {
        addFriendMutate({userId: user.id, friendId: friend.id});
    }

    return (
        <Friend>
            <Info>
                <Avtar>{friend?.avatar}</Avtar>
                <P>{friend?.username}</P>
            </Info>
            <Button variant="primary" size="small" onClick={handleAddFriend} disabled={isAdding}>
                <UserPlus size={16}/>
                Add
            </Button>
        </Friend>
    )
}

export default FriendItem
