import { Field, Exits, FieldType } from "./field.js";
import { easy, hard } from "./maps.js";

export const Stage = {
    STARTED: 0,
    ENDED: 1
}

export class AppState {
    stage = Stage.STARTED
    board = [];
    name = ''
    size = 0
    mapLoadFrom = []

    //Timer's fields
    seconds = 0;
    timerId = null;
    isRunning = false;


    init(size, name) {
        this.name=name
        this.size=size

        this.mapLoadFrom=this.getRandomMap()

        this.board = [];
        for (let y = 0; y<size; y++) {
            this.board[y] = [];
            for (let x = 0; x<size; x++) {
                this.board[y][x]=new Field();
                this.setField(y, x);
            }
        }
        this.startTimer();
    }

    getRandomMap() {
        if(this.size === 5) {
            let i = Math.floor(Math.random()*easy.length)
            console.log(i)
            return easy[i];

        }
        if(this.size === 7) {
            let i = Math.floor(Math.random()*hard.length)
            return hard[i];
        }
    }

    setField(y, x) {
        let fieldTypeText = this.mapLoadFrom[y][x];
        if( fieldTypeText === 'DESERT' ) {
            this.board[y][x].Type=FieldType.DESERT;
        }
        if( fieldTypeText === 'BRIDGE_HOR' ) {
            this.board[y][x].Type=FieldType.BRIDGE_HOR;
        }
        if( fieldTypeText === 'BRIDGE_VERT' ) {
            this.board[y][x].Type=FieldType.BRIDGE_VERT;
        }
        if( fieldTypeText === 'MOUNT_NE' ) {
            this.board[y][x].Type=FieldType.MOUNT_NE;
        }
        if( fieldTypeText === 'MOUNT_SE' ) {
            this.board[y][x].Type=FieldType.MOUNT_SE;
        }
        if( fieldTypeText === 'MOUNT_SW' ) {
            this.board[y][x].Type=FieldType.MOUNT_SW;
        }
        if( fieldTypeText === 'MOUNT_NW' ) {
            this.board[y][x].Type=FieldType.MOUNT_NW;
        }
        if( fieldTypeText === 'OASIS' ) {
            this.board[y][x].Type=FieldType.OASIS;
        }
    }

    changeField(y, x) {
        let coordinate = this.board[y][x]
        if (coordinate.Type === FieldType.OASIS) {
            return
        }
        else if (coordinate.Type === FieldType.BRIDGE_HOR) {
            if ( coordinate.isRailOn === false) {
                coordinate.isRailOn = true;
                coordinate.choosenExits.push(Exits.EAST, Exits.WEST)
            }
            else {
                coordinate.isRailOn = false
                coordinate.choosenExits = []
            }
        }
        else if (coordinate.Type === FieldType.BRIDGE_VERT) {
            if ( coordinate.isRailOn === false) {
                coordinate.isRailOn = true;
                coordinate.choosenExits.push(Exits.NORTH, Exits.SOUTH)
            }
            else {
                coordinate.isRailOn = false
                coordinate.choosenExits = []
            }
        }
        else if (coordinate.Type === FieldType.MOUNT_NE) {
            if ( coordinate.isRailOn === false) {
                coordinate.isRailOn = true;
                coordinate.choosenExits.push(Exits.NORTH, Exits.EAST)
            }
            else {
                coordinate.isRailOn = false
                coordinate.choosenExits = []
            }
        }
        else if (coordinate.Type === FieldType.MOUNT_SE) {
            if ( coordinate.isRailOn === false) {
                coordinate.isRailOn = true;
                coordinate.choosenExits.push(Exits.EAST, Exits.SOUTH)
            }
            else {
                coordinate.isRailOn = false
                coordinate.choosenExits = []
            }
        }
        else if (coordinate.Type === FieldType.MOUNT_SW) {
            if ( coordinate.isRailOn === false) {
                coordinate.isRailOn = true;
                coordinate.choosenExits.push(Exits.WEST, Exits.SOUTH)
            }
            else {
                coordinate.isRailOn = false
                coordinate.choosenExits = []
            }
        }
        else if (coordinate.Type === FieldType.MOUNT_NW) {
            if ( coordinate.isRailOn === false) {
                coordinate.isRailOn = true;
                coordinate.choosenExits.push(Exits.NORTH, Exits.WEST)
            }
            else {
                coordinate.isRailOn = false
                coordinate.choosenExits = []
            }
        }
        else if (coordinate.Type === FieldType.DESERT) {
            if ( coordinate.isRailOn === false) {
                coordinate.isRailOn = true;
                coordinate.choosenExits.push(Exits.EAST, Exits.WEST)
            }
            else {
                if (coordinate.choosenExits.includes(Exits.WEST) && coordinate.choosenExits.includes(Exits.EAST)) {
                    coordinate.choosenExits = []
                    coordinate.choosenExits.push(Exits.NORTH, Exits.SOUTH)
                }
                else if (coordinate.choosenExits.includes(Exits.NORTH) && coordinate.choosenExits.includes(Exits.SOUTH)) {
                    coordinate.choosenExits = []
                    coordinate.choosenExits.push(Exits.NORTH, Exits.EAST)
                }
                else if (coordinate.choosenExits.includes(Exits.NORTH) && coordinate.choosenExits.includes(Exits.EAST)) {
                    coordinate.choosenExits = []
                    coordinate.choosenExits.push(Exits.SOUTH, Exits.EAST)
                }
                else if (coordinate.choosenExits.includes(Exits.EAST) && coordinate.choosenExits.includes(Exits.SOUTH)) {
                    coordinate.choosenExits = []
                    coordinate.choosenExits.push(Exits.SOUTH, Exits.WEST)
                }
                else if (coordinate.choosenExits.includes(Exits.SOUTH) && coordinate.choosenExits.includes(Exits.WEST)) {
                    coordinate.choosenExits = []
                    coordinate.choosenExits.push(Exits.NORTH, Exits.WEST)
                }
                else if (coordinate.choosenExits.includes(Exits.NORTH) && coordinate.choosenExits.includes(Exits.WEST)) {
                    coordinate.choosenExits = []
                    coordinate.isRailOn = false
                }
            }
        }

    }

    checkForWin() {
        for (let i = 0; i < this.board.length; i++){
            for ( let j = 0; j < this.board[i].length; j++) {
                if ( this.board[i][j].Type == FieldType.OASIS) {//Oasis can be skipped
                    continue
                }
                if (this.board[i][j].isRailOn === false) {//The field has to have rails.
                    return
                }
                if (this.board[i][j].choosenExits.includes(Exits.NORTH)) {
                    if(!this.board[i-1] || !this.board[i-1][j]) {//Neighbour field valid?
                        return
                    }
                    if (!this.board[i-1][j].choosenExits.includes(Exits.SOUTH)) {////Neighbour field valid has correct exit?
                        return
                    }
                }
                if (this.board[i][j].choosenExits.includes(Exits.EAST)){
                    if(!this.board[i] || !this.board[i][j+1]) {
                        return
                    }
                    
                    if (!this.board[i][j+1].choosenExits.includes(Exits.WEST)) {
                        return
                    }
                }
                if (this.board[i][j].choosenExits.includes(Exits.SOUTH)){
                    if(!this.board[i+1] || !this.board[i+1][j]) {
                        return
                    }
                    if (!this.board[i+1][j].choosenExits.includes(Exits.NORTH)) {
                        return
                    }
                }
                if (this.board[i][j].choosenExits.includes(Exits.WEST)){
                    if(!this.board[i] || !this.board[i][j-1]) {
                        return
                    }
                    if (!this.board[i][j-1].choosenExits.includes(Exits.EAST)) {
                        return
                    }
                }
            }
        }
        this.stage = Stage.ENDED
        console.log('OK')
    }

    //Timer and helper functions
    formatTime(secs) {
        const minutes = Math.floor(secs / 60);
        const remainingSeconds = secs % 60;
        return (
            String(minutes).padStart(2, '0') + ':' +
            String(remainingSeconds).padStart(2, '0')
        );
    }
    
    updateTimer() {
        const timeIDAccess = document.querySelector("#time")
        timeIDAccess.innerText = this.formatTime(this.seconds);
        this.seconds++;
        this.timerId = setTimeout(() => this.updateTimer(), 1000);
    }
    
    startTimer() {
        if (!this.isRunning) { // Prevent multiple timers from running simultaneously
            this.isRunning = true;
            this.updateTimer();
        }
    }
    
    stopTimer() {
        clearTimeout(this.timerId);
        this.isRunning = false;
    }
}