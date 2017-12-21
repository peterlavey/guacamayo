import React, { Component } from 'react';

class Repositories extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            repositories: props.repositories
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({userName: event.target.value});
    }

    getRepositories(userName) {
        const self = this;
        fetch(`https://api.bitbucket.org/2.0/repositories/${userName}?pagelen=100`).then((response) => {
            return response.json();
        }).then(data =>{
            self.setState({repositories: data.values});
        });
    }

    render() {
        return (
            <div>
                <input className="form-control" type="text" placeholder="Type the name of your repository" value={this.state.userName} onChange={this.handleChange} />
                <button className="btn btn-outline-primary" onClick={(e) => this.getRepositories(this.state.userName, e)}>Primary</button>

            </div>
        );
    }
}

export default Repositories;