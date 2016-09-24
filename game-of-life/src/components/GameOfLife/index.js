// todo обработать ситуацию когда в игре не остается живых клеток.

import React, {Component} from 'react';

import Grid from './pureClasses/Grid';
import Description from 'components/Description';

import cloneInst from 'helpers/cloneInst';

import './style.scss';

export default class GameOfLife extends Component {
    state = {
        grid: new Grid,
        isRunning: false,
        speed: 1000,
        generation: 0,
    };

    timer = null;

    clear () {
        clearInterval(this.timer);
        this.setState({
            grid: new Grid,
            isRunning: false,
            generation: 0,
        });
    }

    start () {
        this.timer = setInterval(this.calcGeneration.bind(this), this.state.speed);
        this.setState({
            isRunning: true,
        });
    }

    pause () {
        clearInterval(this.timer);
        this.setState({
            isRunning: false,
        });
    }

    calcGeneration () {
        const {grid, generation} = this.state;
        let prevGrid = grid.clone();
        let nextGrid = prevGrid.clone();

        const rows = prevGrid.arr.length;
        const cols = prevGrid.arr[0].length;


        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const prevCell = prevGrid.getCell(i, j);
                let nextCell = nextGrid.getCell(i, j);

                let n = prevGrid.getAliveNeighbours(i, j).length;
                if (prevCell.dead && n === 3) {
                    nextCell.live();
                }

                if (prevCell.alive && (!(n === 2 || n === 3))) {
                    nextCell.die();
                }
            }
        }
        this.setState({
            grid: nextGrid,
            generation: generation + 1
        })
    }

    toggleCell (row, col) {
        if (this.state.isRunning) {
            return;
        }

        let grid = cloneInst(this.state.grid);
        grid.getCell(row, col)
            .toggle();

        this.setState({grid});
    }

    handleGridMouseEnter = (e, i, j) => {
        const leftMouseBtnPressed = e.buttons === 1;
        if (leftMouseBtnPressed) {
            this.toggleCell(i, j)
        }
    };

    handleGridMouseDown = (e, i, j) => {
        e.preventDefault();
        this.toggleCell(i, j);
        return false;
    };

    render () {
        return (
            <div className="container offset-t-1">
                <div className="row">
                    <div className="six columns">
                        <div className="game-of-life">
                            {this.renderCounter()}
                            {this.renderControls()}
                            {this.renderGrid()}
                        </div>
                    </div>
                    <div className="six columns">
                        <Description />
                    </div>
                </div>
            </div>
        )
    }

    renderCounter () {
        return <div className="game-of-life__counter offset-b-1">Generation: {this.state.generation}</div>
    }

    renderControls () {
        const {isRunning} = this.state;

        const btns = {
            play: <button className="button-primary game-of-life__control-btn" onClick={() => this.start()}>
                    Play
                </button>,
            pause: <button className="game-of-life__control-btn" onClick={() => this.pause()}>
                    Pause
                </button>,
        };
        const btnToShow = isRunning ? btns.pause : btns.play;

        const disabledClearBtnClass = isRunning ? '' : 'game-of-life__control-btn_disabled';
        return (
            <div className="game-of-life__controls-container offset-b-1">
                {btnToShow}
                <button className={'game-of-life__control-btn ' + disabledClearBtnClass} onClick={() => this.clear()}>
                    Clear
                </button>
            </div>
        )
    }

    renderGrid () {
        const {grid} = this.state;
        const renderRow = (row, i) =>
            <div className="grid__row" key={'row-' + i}>
                {row.map((cell, j) => {
                        const aliveClass = cell.alive ? 'grid__cell_alive' : '';
                        return <div className={'grid__cell ' + aliveClass}
                                    key={'col-' + j}
                                    onMouseDown={(e) => this.handleGridMouseDown(e, i, j)}
                                    onMouseEnter={(e) => this.handleGridMouseEnter(e, i, j)}
                        ></div>
                    }
                )}
            </div>;

        return (
            <div className="grid-container">
                <div className="grid">
                    {grid.arr.map((row, i) => renderRow(row, i))}
                </div>
            </div>
        )
    }
}

