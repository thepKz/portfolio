import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";

import './style.scss';

const Logo = ({logo, className = '', alt = 'logo'}) => {
    return (
        <Grid className={`${className}`}>
            <Link to="/"><img src={logo} alt={alt}/></Link>
        </Grid>
    )
};

export default Logo;