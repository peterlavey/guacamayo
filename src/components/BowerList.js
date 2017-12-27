import React, { Component } from 'react'

class BowerList extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }


    /*componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate');
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('componentWillUpdate');
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps');
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate');
    }*/

    filterByBowerProjects(repository) {
        fetch(`https://api.bitbucket.org/2.0/repositories/${repository.full_name}/src?pagelen=100`).then((response) => {
            if (!response.ok){
                console.log(`Error: ${repository.name}`);
                repository.isBower = false;
            }
            return response.json();
        }).then(data =>{
            let _haveBowerFile = false;
            data.values.map((file) => {
                if(file.path === 'bower.json'){
                    _haveBowerFile = true;
                }
            });
            repository.isBower = _haveBowerFile;
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        const self = this;
        let isFinished = false;
        const repositoriesElement = this.props.repositories.map(function(repository, i){
            self.filterByBowerProjects(repository);
            if(repository.isBower){
                return (<a href="#" className="list-group-item list-group-item-action" key={i} style={{display: repository.isBower ? 'block' : 'none' }}>{repository.name}</a>);
            }
            if(self.props.repositories.length === i + 1){
                isFinished = true;
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