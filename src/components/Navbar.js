import React from 'react'

export default function Navbar(props) {
    return (
        <nav className={`nav navi-${props.mode}`}>
                <p className={`loto loto-${props.mode}`}>{props.title}</p>
                <div className={`tglc text-${props.mode==='light'?'dark':'light'}`}>
                    <i className={props.mode==='light'?'fa-solid fa-sun':'fa-solid fa-moon'} onClick={props.toggleMode} id="flexSwitchCheckDefault"/>
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault"> <b>{props.mode==='light'?'Lightmode':'Darkmode'}</b></label>
                </div>
        </nav>
    )
};
