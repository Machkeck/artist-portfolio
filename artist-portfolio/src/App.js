import React, {Component} from 'react';
import {Switch, Route, NavLink} from 'react-router-dom';
import {slide as Menu} from 'react-burger-menu';
import News from './News';
import Portfolio from './Portfolio';
import AboutMe from './AboutMe';
import Contact from './Contact';
import NoMatch from './NoMatch';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {width: 0, height: 0};
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
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

    showSettings(event) {
        event.preventDefault();
    }

    toggleMenu() {
        this.setState({menuOpen: !this.state.menuOpen});
    }

    render() {
        const menu = this.state.width <= 720
            ? (
                <Menu width="100%">
                    <NavLink
                        id="news"
                        className="menu-item App-title App-title-menu"
                        to="/"
                        onClick={this.toggleMenu}
                    >Renata NW
                    </NavLink>
                    <NavLink
                        id="aboutme"
                        className="menu-item"
                        to="/aboutme"
                        onClick={this.toggleMenu}
                        activeClassName="active-link"
                    >About Me
                    </NavLink>
                    <NavLink
                        id="portfolio"
                        className="menu-item"
                        to="/portfolio"
                        onClick={this.toggleMenu}
                        activeClassName="active-link"
                    >Portfolio
                    </NavLink>
                    <NavLink
                        id="contact"
                        className="menu-item"
                        to="/contact"
                        onClick={this.toggleMenu}
                        activeClassName="active-link"
                    >Contact
                    </NavLink>
                </Menu>)
            : (
                <header className="App-header">
                    <div className="header-top">
                        <NavLink to="/" className="App-title">Renata<br/>NW</NavLink>
                        <nav>
                            <ul className="App-list">
                                <li><NavLink to="/aboutme" activeClassName="active-link">About Me</NavLink></li>
                                <li><NavLink to="/portfolio" activeClassName="active-link">Portfolio</NavLink></li>
                                <li><NavLink to="/contact" activeClassName="active-link">Contact</NavLink></li>
                            </ul>
                        </nav>
                    </div>
                    <footer>
                        <p>Copywrite 2018</p>
                    </footer>
                </header>);
        return (
            <div>
                <div className="App">
                    {menu}
                    <div className="App-content">
                        <Switch>
                            <Route
                                exact
                                path="/"
                                component={News}
                            />
                            <Route
                                path="/portfolio"
                                component={Portfolio}
                            />
                            <Route
                                path="/aboutme"
                                component={AboutMe}
                            />
                            <Route
                                path="/contact"
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

export default App;
