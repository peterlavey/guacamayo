import React, { Component } from 'react'

class BowerList extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        const repositoriesElement = this.props.repositories.map(function(repository, i){
            return (<a href="#" className="list-group-item list-group-item-action" key={i}>{repository.name}</a>)
        });
        return (
            <div className="list-group">
                {repositoriesElement}
            </div>
        );
    }
}

export default BowerList;