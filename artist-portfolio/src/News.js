import React, {Component} from 'react';
import {withLocalize, Translate} from 'react-localize-redux';
import globalTranslations from './translations/global.json';
import './News.css';

class News extends Component {
    constructor(props) {
        super(props);
        this.props.addTranslation(globalTranslations);
    }

    render() {
        return (
            <div className="News">
                <h2><Translate id="news.header">News</Translate></h2>
                <div className="News-Content">
                    <ul>
                        {/*<li>
                            <div className="News-Banner">
                                <p><Translate id="news.nothing">Currently there is nothing to display</Translate></p>
                            </div>
                        </li>*/}
                        <li>
                            <div className="News-Banner">
                                <div className="News-Header">
                                    <p>5/30/2019</p>
                                </div>
                                <div className="News-Body">
                                    <img alt="17_24_24.jpg" src={`${process.env.PUBLIC_URL}/17_24_24.jpg`}/>
                                    <p><Translate id="news.30/5/19"/></p>
                                </div>
                            </div>
                        </li>
                        {/*<li>
                            <div className="News-Banner">
                                <div className="News-Header">
                                    <p>5/30/2019</p>
                                </div>
                                <div className="News-Body">
                                    <img alt="17_24_24.jpg" src={`${process.env.PUBLIC_URL}/17_24_24.jpg`}/>
                                    <p>LOREMS IMPSU lbds bsldbf lsjdfl kbsdlkfjls bsdfl ArtJarmark 2019 Nikiszowiec</p>
                                </div>
                            </div>
                        </li>*/}
                    </ul>
                </div>
            </div>
        );
    }
}

export default withLocalize(News);
