import React, { Component } from 'react';
class Filter extends Component {
    render() {
        return (
            <div className='Filter'>
                <div className="filterWrapper">
                    <div className="row">
                        <div className='filterHeading'> Filter </div>
                        <div className='selectWrapper'>
                        <select name='filter' onChange={this.props.handleFilterChange}>
                            <option name="all" value="Sort By Date Created">Sort By Date Created</option>
                            <option name="due" value="Remaining Task">Sort By Due Date</option>
                            <option name="done" value="All Done Task">All Done Task</option>
                            <option name="remaining" value="Remaining Task">Remaining Task</option>
                        </select>
                        </div>  
                    </div>
                </div>

            </div>
        );
    }
}

export default Filter;