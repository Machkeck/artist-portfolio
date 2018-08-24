import React, {Component} from 'react';
import {CSSTransitionGroup} from 'react-transition-group';
import {withLocalize, Translate} from 'react-localize-redux';
import globalTranslations from './translations/global.json';
import './NoMatch.css';

class NoMatch extends Component {
    constructor(props){
        super(props);
        this.props.addTranslation(globalTranslations);
    }
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
                    <h2><Translate id="nomatch.header">NoMatch</Translate></h2>
                    <div className="NoMatch-Content">
                        <div className="NoMatch-Banner">
                            <p><Translate id="nomatch.banner">This page does not exist</Translate><span role="img">&#x1F631;</span></p>
                        </div>
                    </div>
                </div>
            </CSSTransitionGroup>
        );
    }
}

export default withLocalize(NoMatch);
