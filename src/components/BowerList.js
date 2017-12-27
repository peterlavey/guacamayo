import React, { Component } from 'react'

class BowerList extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    filterByBowerProjects(repository) {
        fetch(`https://api.bitbucket.org/2.0/repositories/${repository.full_name}/src?pagelen=100`)
            .then((response) => {
                if (!response.ok){
                    console.log(`Error: ${repository.name}`);
                    return false;
                }
                return response.json();
            })
            .then(data =>{
                let _haveBowerFile = false;
                data.values.map((file) => {
                    if(file.path === 'bower.json'){
                        _haveBowerFile = true;
                    }
                });
                return _haveBowerFile;
            }).catch((error) => {
                console.log(error);
            });
    }

    render() {
        const self = this;
        const repositoriesElement = this.props.repositories.map(function(repository, i){
            if(self.filterByBowerProjects(repository)){
                return (<a href="#" className="list-group-item list-group-item-action" key={i}>{repository.name}</a>)
            }
        });
        return (
            <div className="list-group">
                {repositoriesElement}
            </div>
        );
    }
}

export default BowerList;