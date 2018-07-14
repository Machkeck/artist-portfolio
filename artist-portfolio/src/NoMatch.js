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
                    <div className="NoMatch-Content">
                        <div className="NoMatch-Banner">
                            <p>This page does not exist <span role="img">&#x1F631;</span></p>
                        </div>
                    </div>
                </div>
            </CSSTransitionGroup>
        );
    }
}

export default NoMatch;
