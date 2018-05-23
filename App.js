import React, { Component } from 'react';
import Cell from './Components/Cell';
import _ from 'lodash';
import './index.css';

const height = 50;
const width = 50;

class GameOfLife extends Component {

    constructor() {
        super();

        let dataGrid = [];
        for(let i=0 ; i<height ; i++) {
            let cells = [];
            for (let j = 0; j < width; j++) {
                cells.push({
                    isAlive: false
                })
            }
            dataGrid.push(_.cloneDeep(cells));
        }

        this.state = {
            grid: [],
            dataGrid
        }
    }

    componentWillMount() {
        this.createGrid();
    }

    componentDidMount() {
        let alives = [
            { x: 0, y:0 },
            { x: 0, y:1 },
            { x: 1, y:0 },
            { x: 1, y:3 },
            { x: 2, y:1 },
            { x: 2, y:2 }
        ];

        alives.forEach(a => {
            this.changeCellState(true, a.x, a.y);
        });

        this.createGrid();
        setInterval(() => {
            this.createGrid();
        }, 1000);
    }

    // True for live, false for dead
    changeCellState(state, xPosition, yPosition) {
        let { dataGrid } = this.state;
        dataGrid[yPosition][xPosition].isAlive = state;
        this.setState({ dataGrid });
    }

    createGrid() {
        let rows = [];

        for(let i=0 ; i<height ; i++) {
            let cells = [];
            for(let j=0 ; j<width ; j++) {
                cells.push(<Cell key={`cell-${j}`} data={this.state.dataGrid} xPosition={j} yPosition={i} updateState={this.changeCellState.bind(this)}></Cell>)
            }
            rows.push(
                <div key={`row-${i}`}>
                    { cells }
                </div>
            )
        }
        this.setState({ grid: rows });
    }

    render() {


        return (
            <div>
                { this.state.grid }
            </div>
        );
    }
}

export default GameOfLife;