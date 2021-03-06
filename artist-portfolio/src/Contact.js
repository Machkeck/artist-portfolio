import React, {Component} from 'react';
import {CSSTransitionGroup} from 'react-transition-group';
import {withLocalize, Translate} from 'react-localize-redux';
import globalTranslations from './translations/global.json';
import './Contact.css';

class Contact extends Component {
    constructor(props) {
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
                transitionLeave={false}>
                <div className="Contact">
                    <h2><Translate id="contact.header">Contact</Translate></h2>
                    <h2 className="Contact-mail">
                        <a
                            href="mailto:rwlazlo@hotmail.com"
                            data-link-type="mailto"
                            data-link-value="rwlazlo@hotmail.com">rwlazlo@hotmail.com
                        </a>
                    </h2>
                    <h2 className="Contact-number"><span className="number-prefix">+48</span> 604 695 712</h2>
                </div>
            </CSSTransitionGroup>
        );
    }
}

export default withLocalize(Contact);
