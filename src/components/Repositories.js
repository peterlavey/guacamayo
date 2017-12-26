import React, { Component } from 'react';

class Repositories extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            repositories: props.repositories,
            error: {error:{message:''}}
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
            if(data.type === 'error'){
                self.setState({error: data});
                self.state.error = data;
                return false;
            }
            //self.setState({repositories: [...self.setState, data.values]});
        }).catch((error) => {

        });
    }

    handleErrors(response) {
        if (!response.ok) throw Error(response.statusText);
        return response;
    }

    render() {
        let error = null;

        const repositoriesElement = this.state.repositories.map(function(repository){
            return (<li>{repository}</li>)
        });

        if(this.state.error)  {
            error = <h1>{this.state.error.error}</h1>
        }
        return (
            <div>
                <input className="form-control" type="text" placeholder="Type the name of your repository" value={this.state.userName} onChange={this.handleChange} />
                <button className="btn btn-outline-primary" onClick={(e) => this.getRepositories(this.state.userName, e)}>Primary</button>
                <ul>
                    {repositoriesElement}
                </ul>
                <h1>{this.state.error.error.message}</h1>
            </div>
        );
    }
}

export default Repositories;