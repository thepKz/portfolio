import React, {Fragment} from 'react';
import Header2 from './components/header2';
import Error from './components/404/404';
import Scrollbar from './components/scrollbar/scrollbar'
import CTASection from "./components/CTASection/CTASection";
import Footer2 from './components/footer2/Footer2';

const NotFound: React.FC = () => {

    return(
        <Fragment>
            <Header2/>
            <Error/>
            <CTASection />
            <Footer2/>
            <Scrollbar/>
        </Fragment>
    )
};
export default NotFound;

