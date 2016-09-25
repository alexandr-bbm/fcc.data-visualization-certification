import React, {Component} from 'react';


export default class Description extends Component {
    render () {
        return (
            <div>
                <h4 style={{textAlign: 'center'}}>
                    Description
                </h4>
                <h5>Game rules</h5>
                <p>
                    The universe of the Game of Life is an infinite two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, alive or dead, or "populated" or "unpopulated" (the difference may seem minor, except when viewing it as an early model of human/urban behavior simulation or how one views a blank space on a grid). Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:
                </p>
                <div>
                    <ol>
                        <li>Any live cell with fewer than two live neighbours dies, as if caused by under-population.</li>
                        <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
                        <li>Any live cell with more than three live neighbours dies, as if by over-population.</li>
                        <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
                    </ol>
                </div>
                <p>
                    The initial pattern constitutes the seed of the system. The first generation is created by applying the above rules simultaneously to every cell in the seed—births and deaths occur simultaneously, and the discrete moment at which this happens is sometimes called a tick (in other words, each generation is a pure function of the preceding one). The rules continue to be applied repeatedly to create further generations.
                </p>
            </div>
        )
    }
}