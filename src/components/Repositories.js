import React, { Component } from 'react';
import BowerList from "./BowerList";

class Repositories extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: 'PedroCisternas',
            repositories: [],
            error: {error:{message:''}}
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({userName: event.target.value});
    }

    handleKeyPress(target, event) {
        if(event.charCode==13){
            target.getRepositories(target.state.userName);
        }
    }

    getRepositories(userName) {
        const self = this;
        fetch(`https://api.bitbucket.org/2.0/repositories/${userName}?pagelen=100`)
            .then((response) => {
                if (!response.ok){
                    this.setState({error: {message: `Repository ${userName} not found`}});
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(data =>{
                self.setState({
                    repositories: data.values,
                    error: {error:{message:''}}
                });
            }).catch((error) => {
                console.log(error);
            });
    }

    render() {
        if(this.state.error)  {
            let error = <h1>{this.state.error.error}</h1>
        }

        return (
            <div>
                <input className="form-control" type="text" placeholder="Type the name of your repository" value={this.state.userName} onChange={this.handleChange} onKeyPress={(e) => this.handleKeyPress(this, e)}/>
                <BowerList repositories={this.state.repositories}></BowerList>
                <h1 className="text-danger">{this.state.error.message}</h1>
            </div>
        );
    }
}

export default Repositories;