import React, { useEffect } from "react";
import { Link } from 'react-router-dom'
import erimg from '../../images/404.png'
import arrow from '../../images/arrow-2.svg'


const Error: React.FC = () => {
    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    },);


    return (
        <section className="error-404-section section-padding pb-0">
            <div className="container">
                <div className="row">
                    <div className="col col-xs-12">
                        <div className="content clearfix">
                            <div className="error-img">
                                <img src={erimg} alt="" />
                            </div>
                            <div className="error-message">
                                <h3>Rất tiếc, không tìm thấy trang!</h3>
                                <div className="theme-btn">
                                    <i className="icon">
                                        <Link onClick={ClickHandler} to="/">
                                            <img src={arrow} alt="" />
                                        </Link>
                                    </i>
                                    <i className="link-text">
                                        <span><Link onClick={ClickHandler} to="/">Về</Link></span>
                                        <span><Link onClick={ClickHandler} to="/">trang chủ</Link></span>
                                    </i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Error;