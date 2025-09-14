import styled, { css } from "styled-components";

const Row = styled.div`
    display : flex;
    ${props => props.type === 'rowB' && css`
        justify-content : space-between ;
        flex-direction : row ;
        align-items : center ;
    `}
    ${props => props.type === 'row' && css`
        justify-content : center ;
        flex-direction : row ;
        align-items : center ;
    `}
    ${props => props.type === 'column' && css`
        justify-content : center ;
        flex-direction : column ;
        align-items : center ;
    `}
`

export default Row