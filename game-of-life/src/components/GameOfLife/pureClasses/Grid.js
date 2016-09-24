import Cell from './Cell';

export default class Grid {
    constructor (arr = [], rowsCount = 40, colsCount = 40) {
        this.arr = [];
        this.rows = rowsCount;
        this.cols = colsCount;

        for (let i = 0; i < rowsCount; i++) {
            this.arr[i] = [];
            for (let j = 0; j < colsCount; j++) {
                if (arr.length) {
                    this.arr[i][j] = new Cell({
                        x: j,
                        y: i,
                        alive: arr[i][j].alive
                    });
                } else {
                    this.arr[i][j] = new Cell({
                        x: j,
                        y: i
                    });
                }
            }
        }
    }

    clone () {
        return new Grid(this.arr);
    }

    toggleCell (i, j) {
        this.arr[i][j].toggle();
        return this.arr;
    }

    getCell (i, j) {
        return this.arr[i][j];
    }

    getAliveNeighbours (i, j) {
        return this.getNeighbours(i, j).filter((neighbour) => neighbour.alive);
    }

    getNeighbours (i, j) {
        let neighbourCells = [];
        const l = this.arr.length;

        for (let a = i - 1; a <= i + 1; a++) {

            for (let b = j - 1; b <= j + 1; b++) {
                // Skip self
                if (!(a == i && b == j)) {
                    let A = Grid.checkArrayBounds(a, l);
                    let B = Grid.checkArrayBounds(b, l);
                    neighbourCells.push(this.arr[A][B])
                }
            }
        }
        return neighbourCells;
    }

    static checkArrayBounds(a, length) {
        if (a >= length) {
            a -= length;
        } else if (a < 0) {
            a += length;
        }
        return a;
    }

}
