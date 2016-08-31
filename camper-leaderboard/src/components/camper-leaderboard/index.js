import React, { Component } from 'react';
import Reactable from 'reactable';

const Table = Reactable.Table;

export default class CamperLeaderboard extends Component {


    render () {
        return (
            <div className="app">
                <Table className="table" data={[
                    { Name: 'Griffin Smith', Age: 18 },
                    { Age: 23,  Name: 'Lee Salminen' },
                    { Age: 28, Position: 'Developer' },
                ]} />
            </div>
        )
    }

}