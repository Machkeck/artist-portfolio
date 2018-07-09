import React, {Component} from 'react';
import './News.css';

class News extends Component {
    render() {
        return (
            <div className="News">
                <h2>News</h2>
                <div className="News-Content">
                    <p>Currently there is nothing to display</p>
                </div>
            </div>
        );
    }
}

export default News;
