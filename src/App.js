import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import BowerList from "./components/BowerList";
import Search from "./components/Search";
import Repositories from "./components/Repositories";

class App extends Component {
    constructor() {
        super();
        this.state = {
          repositories: []
        };
    }
    //todo: Quitar atributo repositories del componente
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to Guacamayo</h1>
                    </header>
                <Repositories repositories={this.state.repositories}></Repositories>
            </div>
        );
    }
}

export default App;
