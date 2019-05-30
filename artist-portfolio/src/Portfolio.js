import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import React, {Component} from 'react';
import Lightbox from 'react-image-lightbox';
import {CSSTransitionGroup} from 'react-transition-group';
import {withLocalize, Translate} from 'react-localize-redux';
import globalTranslations from './translations/global.json';
import './Portfolio.css';

function imgSourceTemplate(img) {
    return `${process.env.PUBLIC_URL}/photos${img.slice(1)}`;
}

function getTitle(imgSrc) {
    return imgSrc.split('/').pop().split('_')[0];
}

function getMeasurements(imgSrc) {
    const measurementsArray = imgSrc.split('/').pop().split('.')[0].split('_');
    return measurementsArray.length === 3
        ? `${measurementsArray[1].replace(/,/g, '.')}cm x ${measurementsArray[2].replace(/,/g, '.')}cm`
        : '';
}

const imagesUrls = require.context('../public/photos', true, /.*\.jpg$/).keys();
imagesUrls.sort((a, b) => {
    const titleA = parseInt(getTitle(a), 10),
        titleB = parseInt(getTitle(b), 10);
    if (titleA < titleB) {
        return -1;
    }
    if (titleA > titleB) {
        return 1;
    }
    return 0;
});


const groupedSections = imagesUrls.reduce((sections, currentUrl) => {
    const currentObj = sections.find(section => section.name === currentUrl.split('/')[1]);
    if (currentObj != null) {
        currentObj.images.push(currentUrl);
    } else {
        sections.push({name: currentUrl.split('/')[1], images: [currentUrl]});
    }
    return sections;
}, []);

const imagesForLightbox = [];
groupedSections.forEach((group) => {
    group.images.forEach((image) => {
        imagesForLightbox.push(imgSourceTemplate(image));
    });
});


class Portfolio extends Component {
    constructor(props) {
        super(props);

        this.props.addTranslation(globalTranslations);

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
                            photoIndex: imagesForLightbox.indexOf(imgSourceTemplate(img)),
                        })}
                    >
                        <img alt={img.slice(1)} src={imgSourceTemplate(img)}/>
                        <div className="hover-elements middle">
                            <div className="text">+</div>
                        </div>
                        <div className="hover-elements top-left">
                            <div className="text">{getTitle(img)}</div>
                        </div>
                        <div className="hover-elements bottom-left">
                            <div className="text">{getMeasurements(img)}</div>
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
                    <div className="Page-Header">
                        <h2><Translate id="portfolio.header">Portfolio</Translate></h2>
                    </div>
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
                            imageTitle={getTitle(imagesForLightbox[photoIndex])}
                            imageCaption={getMeasurements(imagesForLightbox[photoIndex])}
                        />
                    )}

                </div>
            </CSSTransitionGroup>
        );
    }
}

export default withLocalize(Portfolio);
