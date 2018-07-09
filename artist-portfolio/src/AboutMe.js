import React, {Component} from 'react';
import logo from './logo.svg';
import './AboutMe.css';
import {CSSTransitionGroup} from 'react-transition-group'

class AboutMe extends Component {
    render() {
        return (
            <CSSTransitionGroup
                transitionName="aboutme"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}>
                <div className="AboutMe">
                    <h2>About Me</h2>
                    <div className="AboutMe-text">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fringilla auctor ipsum, vel
                            pretium enim mollis eu. Fusce non nulla sit amet neque interdum porttitor quis vel magna.
                            Curabitur feugiat bibendum ullamcorper. Nulla at dolor massa. Fusce egestas ac purus sit
                            amet
                            rutrum. Vivamus lobortis, urna eu placerat sollicitudin, lorem diam viverra diam, bibendum
                            varius diam augue interdum urna. Vivamus tortor dolor, volutpat eu semper id, dignissim et
                            arcu.
                            Donec sapien leo, facilisis ut eros eleifend, lacinia molestie erat. Quisque vel justo
                            porta,
                            sollicitudin urna sit amet, faucibus neque. Morbi eu facilisis nunc. Ut vel nunc
                            pellentesque
                            nisl cursus lobortis.</p>
                    </div>
                    <ul>
                        <li><span>Blabsl</span></li>
                        <li><span>2012 dsfsdf</span></li>
                        <li><span>210-2130 sdffdsdf</span></li>
                        <li><span>ljsfklsdjf sdfkjsdkljfsdkl jsdfkl</span></li>
                    </ul>
                </div>
            </CSSTransitionGroup>
        );
    }
}

export default AboutMe;
