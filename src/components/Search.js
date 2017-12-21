import React, { Component } from 'react'

class Search extends Component {
    constructor(props) {
        super(props);

        this.searchText = '';
    }

    componentWillMount() {
        fetch('https://api.bitbucket.org/2.0/repositories/peterlavey').then((response) => {
            console.log(response);
        });
    }

    render() {
        return (
            <input class="form-control" type="search" placeholder="Type the name of your repository" value={this.searchText}/>
        );
    }
}

export default Search;