import React, {Component} from 'react';
import {Switch, Route, NavLink} from 'react-router-dom';
import {slide as Menu} from 'react-burger-menu';
import {renderToStaticMarkup} from 'react-dom/server';
import {withLocalize, Translate} from 'react-localize-redux';
import globalTranslations from './translations/global.json';
import News from './News';
import Portfolio from './Portfolio';
import AboutMe from './AboutMe';
import Contact from './Contact';
import NoMatch from './NoMatch';
import logo from './logo.svg';
import './App.css';

class NormalMenu extends Component {
    constructor(props) {
        super(props);
        this.props.addTranslation(globalTranslations);
    }

    render() {

        const LanguageToggle = ({languages, activeLanguage, setActiveLanguage}) => (
            <select className="App-lang-selector" value={activeLanguage.code}
                    onChange={event => setActiveLanguage(event.target.value)}>
                {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>
                        {lang.name}
                    </option>
                ))}
            </select>
        );
        const Langua = withLocalize(LanguageToggle);
        return (
            <header className="App-header">
                <div className="header-top">
                    <NavLink to={`/`} className="App-title">Renata<br/>NW</NavLink>
                    <nav>
                        <ul className="App-list">
                            <li>
                                <NavLink to={`/aboutme`} activeClassName="active-link">
                                    <Translate id="sections.aboutme"></Translate>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/portfolio`} activeClassName="active-link">
                                    <Translate id="sections.portfolio">Portfolio</Translate>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/contact`} activeClassName="active-link">
                                    <Translate id="sections.contact">Contact</Translate>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                <footer>
                    <Langua/>
                    <p>by Machkeck 2018</p>
                </footer>
            </header>
        );
    }
}

class HamburgerMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {menuOpen: false};
        this.props.addTranslation(globalTranslations);
    }

    showSettings(event) {
        event.preventDefault();
    }

    // This keeps your state in sync with the opening/closing of the menu
    // via the default means, e.g. clicking the X, pressing the ESC key etc.
    handleStateChange(state) {
        this.setState({menuOpen: state.isOpen});
    }

    // This can be used to close the menu, e.g. when a user clicks a menu item
    closeMenu() {
        this.setState({menuOpen: false});
    }

    // This can be used to toggle the menu, e.g. when using a custom icon
    // Tip: You probably want to hide either/both default icons if using a custom icon
    // See https://github.com/negomi/react-burger-menu#custom-icons
    toggleMenu() {
        this.setState({menuOpen: !this.state.menuOpen});
    }

    render() {
        const LanguageToggle = ({languages, activeLanguage, setActiveLanguage}) => (
            <div>
                <select className="App-lang-selector" value={activeLanguage != null ? activeLanguage.code : ''}
                        onChange={event => setActiveLanguage(event.target.value)}>
                    {languages.map(lang => (
                        <option key={lang.code} value={lang.code}>
                            {lang.name}
                        </option>
                    ))}
                </select>
            </div>
        );
        const Langua = withLocalize(LanguageToggle);
        const LocalizedMenu = withLocalize(Menu);
        return (
            <Menu
                width="80%"
                isOpen={this.state.menuOpen}
                onStateChange={(state) => this.handleStateChange(state)}
            >
                <NavLink
                    id="news"
                    className="menu-item App-title App-title-menu"
                    to={`/`}
                    onClick={() => this.closeMenu()}
                >Renata NW
                </NavLink>
                <NavLink
                    id="aboutme"
                    className="menu-item"
                    to={`/aboutme`}
                    onClick={() => this.closeMenu()}
                    activeClassName="active-link"
                ><Translate id="sections.aboutme">About Me</Translate>
                </NavLink>
                <NavLink
                    id="portfolio"
                    className="menu-item"
                    to={`/portfolio`}
                    onClick={() => this.closeMenu()}
                    activeClassName="active-link"
                ><Translate id="sections.portfolio">Portfolio</Translate>
                </NavLink>
                <NavLink
                    id="contact"
                    className="menu-item"
                    to={`/contact`}
                    onClick={() => this.closeMenu()}
                    activeClassName="active-link"
                ><Translate id="sections.contact">Contact</Translate>
                </NavLink>
                <Langua/>
            </Menu>);
    }
}


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {width: 0, height: 0};
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.props.initialize({
            languages: [
                {name: 'English', code: 'en'},
                {name: 'Polski', code: 'pl'},
            ],
            translation: globalTranslations,
            options: {renderToStaticMarkup},
        });
        this.props.addTranslation(globalTranslations);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    }

    render() {
        const menu = this.state.width <= 720 ? HamburgerMenu : NormalMenu;
        const WrappedMenu = withLocalize(menu);
        return (
            <div>
                <div className="App">
                    <WrappedMenu/>
                    <div className="App-content">
                        <Switch>
                            <Route
                                exact
                                path={`/`}
                                component={News}
                            />
                            <Route
                                path={`/portfolio`}
                                component={Portfolio}
                            />
                            <Route
                                path={`/aboutme`}
                                component={AboutMe}
                            />
                            <Route
                                path={`/contact`}
                                component={Contact}
                            />
                            <Route component={NoMatch}/>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default withLocalize(App);
