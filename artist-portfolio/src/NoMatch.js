import React, {Component} from 'react';
import {CSSTransitionGroup} from 'react-transition-group';
import './NoMatch.css';

class NoMatch extends Component {
    render() {
        return (
            <CSSTransitionGroup
                transitionName="contact"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}
            >
                <div className="NoMatch">
                    <h2>NoMatch</h2>
                    <h3>This page does not exist <span role="img">&#x1F631;</span></h3>
                </div>
            </CSSTransitionGroup>
        );
    }
}

export default NoMatch;
