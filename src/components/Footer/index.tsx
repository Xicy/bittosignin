import * as React from 'react';

const Footer: React.SFC = () => (
    <footer className="bitto-footer">
        <div className="bitto-footer__wrapper">
            <div className="bitto-footer__links">
                <span className="bitto-footer__links-wrapper">
                    <a href="#">About</a>
                    <a href="#">Terms</a>
                    <a href="#">Privacy</a>
                </span>
                <span className="bitto-footer__links-wrapper">
                    <a href="#">Apply to list</a>
                    <a href="#">Contact Us</a>
                </span>
            </div>
            <p className="bitto-footer__copy">
                <i className="fa fa-copyright" />
                {' 2018 by Bitto Exchange. All Rights Reserved.'}
            </p>
            <div className="bitto-footer__social">
                <a href="#"><i className="fab fa-facebook-f" /></a>
                <a href="#"><i className="fab fa-instagram" /></a>
                <a href="#"><i className="fab fa-youtube" /></a>
                <a href="#"><i className="fab fa-twitter" /></a>
                <a href="#"><i className="fab fa-telegram-plane" /></a>
                <a href="#"><i className="fab fa-bitcoin" /></a>
                <i className="bitto-footer__wifi fas fa-wifi" />
            </div>
        </div>
    </footer>
);

export {
    Footer,
};
