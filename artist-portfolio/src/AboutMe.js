import React, {Component} from 'react';
import {CSSTransitionGroup} from 'react-transition-group';
import {withLocalize, Translate} from 'react-localize-redux';
import globalTranslations from './translations/global.json';
import logo from './logo.svg';
import './AboutMe.css';

class AboutMe extends Component {
    constructor(props) {
        super(props);
        this.props.addTranslation(globalTranslations);
    }

    render() {
        return (
            <CSSTransitionGroup
                transitionName="aboutme"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}>
                <div className="AboutMe">
                    <h2><Translate id="aboutme.header">About Me</Translate></h2>
                    <div className="AboutMe-text">
                        <img alt="24_40_50.jpg" src={`${process.env.PUBLIC_URL}/24_40_50.jpg`}/>
                        <p><Translate id="aboutme.bio.header">Renata Nowakowska-Wlazło, krakowianka.</Translate></p>
                        <p>
                            <Translate id="aboutme.bio.body">
                                Ponad 10 lat temu zaczęła tworzyć małe obrazki
                                we własnej technice, którą nazwała RENATANGLE.
                                Następnie sięgnęła po pędzle i farby,
                                narzędzia właściwe malarstwu. Jej przewodnikiem w świecie sztuki i nauczycielem
                                malarstwa została Małgorzata Maćkowiak (malarka).
                                Ukończyła studia podyplomowe "Plastyka" na Uniwersytecie Warszawskim.
                                Pracuje głównie farbami akrylowymi.
                                Swoje prace pokazywała w Krakowie,
                                w Wieliczce dołączając do grupy twórczej
                                "W wolnej chwili" i w Katowicach.
                                Cały czas pragnie stworzyć coś ciekawego z gliny.
                            </Translate>
                        </p>
                    </div>
                    {/*<ul>
                        <li><span>Blabsl</span></li>
                        <li><span>2012 dsfsdf</span></li>
                        <li><span>210-2130 sdffdsdf</span></li>
                        <li><span>ljsfklsdjf sdfkjsdkljfsdkl jsdfkl</span></li>
                    </ul>*/}
                </div>
            </CSSTransitionGroup>
        );
    }
}

export default withLocalize(AboutMe);
