import styled from "styled-components"


const Main = styled.main`
    display : flex ; 
    flex-direction : column ; 
    justify-content : center ; 
    align-items : center;
    width : 95%;
    max-width : 950px ;
    margin : auto ;
    margin-top : 100px;

`
const Tasks = styled.div`
    display : flex ; 
    flex-direction : column ; 
    justify-content : center ; 
    align-items : center;
    padding : 1rem ;
    background-color : var(--color-surface);
    width : 100%;
`
const Task = styled.div`
    display : flex ; 
    flex-direction : row ; 
    justify-content : center ; 
    align-items : center;
    padding : 1rem ;

`

function TasksBox() {
    return (
        <Main>
            <Tasks>
                <Task>
                    osama
                </Task>
            </Tasks>
        </Main>
    )
}

export default TasksBox
