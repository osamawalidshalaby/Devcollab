import styled from "styled-components";
import Button from "./Button";
import { UserCheck } from "lucide-react";
import GetPending from "../Authentication/getPending";
import AcceptFriend from "../Authentication/acceptFriend";


const user = {
  "id": "user-1-uuid",
  "username": "Osama Walid",
  "random_id": "AB12CD",
  "avatar": "OW"
}


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

const Friends = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

function FriendsList() {
    const {acceptFriendMutate , isAccepting} = AcceptFriend()
    const {pendingFriends , isLoadingPending} = GetPending()
    console.log(pendingFriends?.[0])
    if(isLoadingPending) return <div>Loading...</div>
    if(!pendingFriends?.length) return <div>No Pending Requests</div>
    return (
        <Friends>
            {pendingFriends.map((friendReq) => (
                <Friend key={friendReq.id}>
                    <Info>
                        <Avtar>{friendReq.from['avatar']}</Avtar>
                        <P>{friendReq.from['username']}</P>
                    </Info>
                    <Button variant="success" size="small" onClick={() => acceptFriendMutate({id: friendReq.id})} disabled={isAccepting}>
                        <UserCheck size={16}/>
                        <span>Accept</span>
                    </Button>
                </Friend>
            ))}
        </Friends>
    )
}

export default FriendsList
