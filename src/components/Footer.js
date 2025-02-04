import React from 'react';

const Footer = () => {
    return (
        <>
        <footer className="footer-container">
            <div className="footer-info">
                <p>copyright &copy; 2024 @ASFIisHUMAN. All rights reserved.</p>
                <p>Special thanks to contributors and supporters.</p>
                <p>Special thanks to  <b><i>
                    {/* eslint-disable-next-line */}
                    <a className='ank' href="https://www.youtube.com/@CodeWithHarry" target="_blank" rel="noopener noreferrer">@Code-with-Harry</a></i></b> and <b><i><a className='ank' href="https://chat.openai.com/chat" target="_blank" rel="noopener  noreferrer">Chat-gpt</a></i></b></p>
               
            </div>
            <div className="white-line" />
            <div className="social-icons">0
                {/* eslint-disable-next-line */}<a href="https://www.instagram.com/@unknown.midfielder/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i>follow us</a>
                {/* eslint-disable-next-line */}<a href="#"> {/*target="_blank" rel="noopener noreferrer"*/}<i className="fab fa-facebook"></i>our community</a>
                {/* eslint-disable-next-line */}<a href="#"> {/*target="_blank" rel="noopener noreferrer"*/}<i className="fab fa-linkedin"></i>contact us</a>
                {/* // eslint-disable-next-line */}<a href="#"> {/*target="_blank" rel="noopener noreferrer"*/}<i className="fab fa-youtube"></i>Our channel</a>
               {/* // eslint-disable-next-line */}<a href="https://github.com/ASFIisHUMAN"target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i>our projects</a>
               {/* // eslint-disable-next-line */}<a href="https://www.fiverr.com/s/87lZrg"target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="-2.5 -2 24 24"><g fill="currentColor"><path d="M16.25 16.25v-10h-10v-.625c0-1.034.841-1.875 1.875-1.875H10V0H8.125A5.632 5.632 0 0 0 2.5 5.625v.625H0V10h2.5v6.25H0V20h8.75v-3.75h-2.5V10h6.285v6.25H10V20h8.75v-3.75z"></path></g></svg>hire for any projects</a>
            </div>
        </footer>
        </>
    );
};

export default Footer;