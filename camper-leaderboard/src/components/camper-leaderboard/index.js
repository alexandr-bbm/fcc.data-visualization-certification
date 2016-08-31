import React from 'react';
import Reactable from 'reactable';
import './style.scss';

const Table = Reactable.Table,
      Thead = Reactable.Thead,
      Th = Reactable.Th,
      unsafe = Reactable.unsafe;

export default class CamperLeaderboard extends React.Component {

    state = {
        allTimeCampers: '',
        recentCampers: '',
        sort: 'alltime',
    };

    componentDidMount () {
        CamperLeaderboardService.getCampersForRender()
            .then((campers) => this.setState({
                allTimeCampers: campers[0],
                recentCampers: campers[1],
            }))
    }

    onSort = (params) => {
        this.setState({sort: params.column});
        console.log(params);
    };

    render () {
        const {allTimeCampers, recentCampers, sort} = this.state;
        const campers = sort === 'recent' ? recentCampers : allTimeCampers;
        return (
            <div className="camper-leaderboard-wrapper">
                <Table className="camper-leaderboard"
                       data={campers}
                       sortable={['alltime', 'recent']}
                       defaultSort={{column: 'alltime', direction: 'desc'}}
                       noDataText="No matching records found."
                       onSort={this.onSort}
                       defaultSortDescending
                >
                    <Thead>
                    <Th column="number">#</Th>
                    <Th column="camper" className="camper-leaderboard__th camper-leaderboard__th_camper">Camper</Th>
                    <Th column="alltime" className="camper-leaderboard__th camper-leaderboard__th_sort">All time points</Th>
                    <Th column="recent" className="camper-leaderboard__th camper-leaderboard__th_sort" autoFocus>Points in last 30 days</Th>
                    </Thead>
                </Table>
            </div>
        )
    }
}

class CamperLeaderboardService {

    static fetchCampers (type = 'alltime') {
        const URLS = {
            recent: 'https://fcctop100.herokuapp.com/api/fccusers/top/recent',
            alltime: 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime'
        };
        return new Promise((resolve) => {
            fetch(URLS[type])
                .then((response) => {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' + response.status);
                        return;
                    }
                    response.json()
                        .then((data) => {
                            resolve(data);
                        });
                })
        });
    }

    /**
     * Prepares raw campers data for render
     * @param rawCampers {'username', 'img', 'alltime', 'recent', 'lastUpdate'}
     */
    static getCampersForRender () {
        return new Promise((resolve) => {
            const allTimeCampers = CamperLeaderboardService.fetchCampers('alltime');
            const recentCampers = CamperLeaderboardService.fetchCampers('recent');
            Promise.all([allTimeCampers, recentCampers])
                .then((camperGroupsRaw) => {
                    const camperGroups = camperGroupsRaw.map((camperGroup) => {
                        return camperGroup.map((rawCamper, idx) => {
                            const {alltime, recent, username, img} = rawCamper;
                            return {
                                'number': idx + 1,
                                'camper': unsafe(`<img src="${img}" class="camper-leaderboard__avatar" > 
                                            <a href="https://www.freecodecamp.com/${username}">${username}</a>`),
                                'alltime': alltime,
                                'recent': recent
                            };
                        });
                    });
                    resolve(camperGroups);
                })
        })
    }
}


