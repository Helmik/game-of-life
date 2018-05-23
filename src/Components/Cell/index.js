import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

class Cell extends Component {

    constructor() {
        super();
        this.countNeighbors = this.countNeighbors.bind(this);
        this.nextStep = this.nextStep.bind(this);

        this.state = {
            neighbors: []
        }
    }

    componentDidMount() {
        let { updateState, xPosition, yPosition } = this.props;

        let x = xPosition;
        let y = yPosition;

        let neighbors = [];
        neighbors.push({
            x: x-1 >= 0 ? x-1 : 0,
            y: y-1 >= 0 ?  y-1 : 0
        });

        neighbors.push({
            x: x,
            y: y-1 >= 0 ?  y-1 : 0
        });

        neighbors.push({
            x: x+1 < 50 ? x+1 : 49,
            y: y-1 >= 0 ?  y-1 : 0
        });



        neighbors.push({
            x: x-1 >= 0 ? x-1 : 0,
            y: y
        });

        neighbors.push({
            x: x+1 < 50 ? x+1 : 49,
            y: y
        });



        neighbors.push({
            x: x-1 >= 0 ? x-1 : 0,
            y: y-1 >= 0 ?  y-1 : 0
        });

        neighbors.push({
            x: x,
            y: y+1 < 50 ?  y+1 : 49
        });

        neighbors.push({
        x: x+1 < 50 ? x+1 : 49,
            y: y+1 < 50 ?  y+1 : 49
    });

    this.setState({ neighbors }, () => {
            let status = this.nextStep();
            updateState(status, x, y);
        });

    }


    nextStep() {
        let { data, xPosition, yPosition } = this.props;
        let cell = data[yPosition][xPosition];


        let { alive } = this.countNeighbors();
        let { isAlive } = cell;

        if (isAlive && (alive < 2 || alive > 3)) {
            return false;
        }

        if (!isAlive && alive === 3) {
            return true;
        }

        return isAlive;
    }

    countNeighbors(){
        let { neighbors } = this.state;
        let { data } = this.props;

        let alive = 0;
        let dead = 0;

        neighbors.forEach(n => {
            if (data[n.y][n.x].isAlive) {
                alive++;
            } else {
                dead++;
            }
        });

        return { alive, dead };
    }

    render() {
        let { data, xPosition, yPosition } = this.props;
        let cell = data[yPosition][xPosition];
        let stateClass = cell.isAlive ? 'dead' : 'live';


        return (
            <div className={`app-cell ${stateClass}`}>

            </div>
        )
    }
}

Cell.propTypes = {
    data: PropTypes.array.isRequired,
    updateState: PropTypes.func.isRequired
};

export default Cell;