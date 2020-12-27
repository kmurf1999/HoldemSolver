import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

const LandingStyle = styled.div`
    display: flex;
    flex-direction: column;

`;

function Landing(): React.ReactElement {
    return (
        <LandingStyle>
            Home Page
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </LandingStyle>
    );
}

export default Landing;
