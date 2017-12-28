import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import Repositories from "./components/Repositories";

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to Guacamayo</h1>
                </header>
                <Repositories></Repositories>
            </div>
        );
    }
}

export default App;
