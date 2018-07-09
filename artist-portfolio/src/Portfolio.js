import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import React, {Component} from 'react';
import Lightbox from 'react-image-lightbox';
import {CSSTransitionGroup} from 'react-transition-group';
import './Portfolio.css';

const
    imagesUrls = require.context('../public/photos', true, /.*\.jpg$/),
    imagesForLightbox = imagesUrls.keys().map(img => 'photos' + img.slice(1)),

    groupedSections = imagesUrls.keys().reduce((sections, currentUrl) => {
        const currentObj = sections.find(section => section.name === currentUrl.split('/')[1]);
        if (currentObj != null) {
            currentObj.images.push(currentUrl);
        } else {
            sections.push({name: currentUrl.split('/')[1], images: [currentUrl]});
        }
        return sections;
    }, []);


class Portfolio extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photoIndex: 0,
            isOpen: false,
        };
    }

    render() {
        const {photoIndex, isOpen} = this.state;
        const uiSections = groupedSections.map((gsection, sIndex) => {
            const uiImages = gsection.images.map((img, index) => {
                return (
                    <div
                        key={index}
                        className="cell"
                        onClick={() => this.setState({
                            isOpen: true,
                            photoIndex: imagesForLightbox.indexOf('photos' + img.slice(1)),
                        })}
                    >
                        <img alt={img.slice(1)} src={'photos' + img.slice(1)}/>
                        <div className="middle">
                            <div className="text">+</div>
                        </div>
                    </div>
                );
            });
            return (
                <div key={sIndex} className="Gallery-section">
                    <h3>{gsection.name}</h3>
                    <div className="grid">
                        {uiImages}
                    </div>
                </div>
            );
        });
        return (
            <CSSTransitionGroup
                transitionName="portfolio"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}
            >
                <div className="Gallery">
                    <h2>Portfolio</h2>
                    {uiSections}

                    {isOpen && (
                        <Lightbox
                            mainSrc={imagesForLightbox[photoIndex]}
                            nextSrc={imagesForLightbox[(photoIndex + 1) % imagesForLightbox.length]}
                            prevSrc={imagesForLightbox[(photoIndex + (imagesForLightbox.length - 1)) % imagesForLightbox.length]}
                            onCloseRequest={() => this.setState({isOpen: false})}
                            onMovePrevRequest={() =>
                                this.setState({
                                    photoIndex: (photoIndex + (imagesForLightbox.length - 1)) % imagesForLightbox.length,
                                })
                            }
                            onMoveNextRequest={() =>
                                this.setState({
                                    photoIndex: (photoIndex + 1) % imagesForLightbox.length,
                                })
                            }
                        />
                    )}

                </div>
            </CSSTransitionGroup>
        );
    }
}

export default Portfolio;
