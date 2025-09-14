// src/components/Container.jsx
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;

  /* Breakpoints */
    @media (min-width: 640px) {
        max-width: 640px;
    }

    @media (min-width: 768px) {
        max-width: 768px;
        
    }

    @media (min-width: 1024px) {
        max-width: 1024px;
    }

    @media (min-width: 1280px) {
        max-width: 1280px;
    }

    @media (min-width: 1536px) {
        max-width: 1536px;
    }
`;

export default Container;
