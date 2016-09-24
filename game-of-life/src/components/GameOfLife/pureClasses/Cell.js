export default class Cell {
    constructor (options) {
        this.alive = options.alive || false;
        this.x = options.x;
        this.y = options.y;
    }

    get dead () {
        return !this.alive;
    }

    toggle () {
        this.alive = !this.alive;
    }

    live () {
        this.alive = true;
    }

    die () {
        this.alive = false;
    }
}
