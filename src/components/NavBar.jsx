import styled from "styled-components"

import Heading from "./Heading"
import Container from "./Container"
import Row from "./Row"
import Profile from "./Profile"


const Nav = styled.nav`
    background-color: var(--color-navbar);
    border-bottom: 1px solid var(--color-border);
`



function NavBar() {
    return (
        <Nav>
            <Container>
                <Row type = 'rowB'>
                    <Heading as='h1'>hello</Heading>
                    <Profile/>
                </Row>
            </Container>
        </Nav>
    )
}

export default NavBar


