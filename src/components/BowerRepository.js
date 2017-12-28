import React, { Component } from 'react'

class BowerRepository extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repository: props.repository,
            isBower: false
        };
    }

    componentWillMount() {
        this.filterByBowerProjects();
    }

    filterByBowerProjects() {
        fetch(`https://api.bitbucket.org/2.0/repositories/${this.state.repository.full_name}/src?pagelen=100`).then((response) => {
            if (!response.ok){
                console.log(`Error: ${this.state.repository.name}`);
                this.setState({
                    isBower: false
                });
            }
            return response.json();
        }).then(data =>{
            let _haveBowerFile = false;
            data.values.map((file) => {
                if(file.path === 'bower.json'){
                    _haveBowerFile = true;
                }
            });
            this.setState({
                isBower: _haveBowerFile
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <a href="#" className="list-group-item list-group-item-action" style={{display: this.state.isBower ? 'block' : 'none' }}>{this.state.repository.name}</a>
        );
    }
}

export default BowerRepository;