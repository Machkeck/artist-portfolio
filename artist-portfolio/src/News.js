import React, {Component} from 'react';
import {withLocalize, Translate} from 'react-localize-redux';
import globalTranslations from './translations/global.json';
import './News.css';

class News extends Component {
    constructor(props){
        super(props);
        this.props.addTranslation(globalTranslations);
    }
    render() {
        return (
            <div className="News">
                <h2><Translate id="news.header">News</Translate></h2>
                <div className="News-Content">
                    <div className="News-Banner">
                        <p><Translate id="news.nothing">Currently there is nothing to display</Translate></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default withLocalize(News);
