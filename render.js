import { Field, Exits, FieldType} from "./field.js";
import {toplist_easy, toplist_hard} from "./toplist.js";

//Render the gametable
export function render(state) {
    return renderTable(state.board);
}

function renderTable(board) {
    return `<table>${board.map(renderRow).join("")}</table>`;
}

function renderRow(row) {
    return `<tr>${row.map(renderField).join("")}</tr>`;
}

function renderField(field) {
    let stringTdPicture =''
    let stringTdRotate ='0'
    if (field.isRailOn === false) {
        if(field.Type === FieldType.DESERT) {
            stringTdPicture =  `empty.png`
            console.log("999999999999999999")
        }
        if(field.Type === FieldType.BRIDGE_HOR) {
            stringTdPicture = `bridge.png`
            stringTdRotate =`90`
        }
        if(field.Type === FieldType.BRIDGE_VERT) {
            stringTdPicture = `bridge.png`
        }
        if(field.Type === FieldType.MOUNT_NE) {
            stringTdPicture = `mountain.png`
            stringTdRotate =`-90`
        }
        if(field.Type === FieldType.MOUNT_SE) {
            stringTdPicture = `mountain.png`
        }
        if(field.Type === FieldType.MOUNT_SW) {
            stringTdPicture = `mountain.png`
            stringTdRotate =`90`
        }
        if(field.Type === FieldType.MOUNT_NW) {
            stringTdPicture = `mountain.png`
            stringTdRotate =`180`
        }
        if(field.Type === FieldType.OASIS) {
            stringTdPicture = `oasis.png`
        }
    }
    else {
            if(field.Type === FieldType.DESERT) {
                if(field.choosenExits.includes(Exits.WEST) && field.choosenExits.includes(Exits.EAST)) {
                    stringTdPicture =  `straight_rail.png`
                    stringTdRotate =`-90`
                }
                if(field.choosenExits.includes(Exits.NORTH) && field.choosenExits.includes(Exits.SOUTH)) {
                    stringTdPicture =  `straight_rail.png`
                }
                if(field.choosenExits.includes(Exits.NORTH) && field.choosenExits.includes(Exits.EAST)) {
                    stringTdPicture =  `curve_rail.png`
                    stringTdRotate =`-90`
                }
                if(field.choosenExits.includes(Exits.SOUTH) && field.choosenExits.includes(Exits.EAST)) {
                    stringTdPicture =  `curve_rail.png`
                }
                if(field.choosenExits.includes(Exits.SOUTH) && field.choosenExits.includes(Exits.WEST)) {
                    stringTdPicture =  `curve_rail.png`
                    stringTdRotate =`90`
                }
                if(field.choosenExits.includes(Exits.NORTH) && field.choosenExits.includes(Exits.WEST)) {
                    stringTdPicture =  `curve_rail.png`
                    stringTdRotate =`180`
                }
            }
            if(field.Type === FieldType.BRIDGE_HOR) {
                stringTdPicture = `bridge_rail.png`
                stringTdRotate =`-90`
            }
            if(field.Type === FieldType.BRIDGE_VERT) {
                stringTdPicture = `bridge_rail.png`
            }
            if(field.Type === FieldType.MOUNT_NE) {
                stringTdPicture = `mountain_rail.png`
                stringTdRotate =`-90`
            }
            if(field.Type === FieldType.MOUNT_SE) {
                stringTdPicture = `mountain_rail.png`
            }
            if(field.Type === FieldType.MOUNT_SW) {
                stringTdPicture = `mountain_rail.png`
                stringTdRotate =`90`
            }
            if(field.Type === FieldType.MOUNT_NW) {
                stringTdPicture = `mountain_rail.png`
                stringTdRotate =`180`
            }
            if(field.Type === FieldType.OASIS) {//might can be removed
                stringTdPicture = `oasis.png`
            }
        }

    return `<td style="background-image: url('resources/${stringTdPicture}'); transform: rotate(${stringTdRotate}deg);"></td>`;
}

//Render toplist
export function renderGameEnd(fieldSize) {
    if(fieldSize === 5) {
        return renderGameEndTable(toplist_easy)
    }
    if(fieldSize === 7) {
        return renderGameEndTable(toplist_hard)
    }
}

function renderGameEndTable(toplist_array) {
    return `<table><tr><td></td><td>Név</td><td>Idő</td></tr>${renderandprocessRowsGameEnd(toplist_array)}</table>`;
}

function renderandprocessRowsGameEnd(toplist_array) {
    let stringColl=''
    for(let i = 0; i<toplist_array.length; i++) {
        stringColl += renderRowGameEnd(i, toplist_array[i])
    }
    return stringColl;
}

function renderRowGameEnd(index, indexElem) {
    return`<tr><td>${index+1}.</td><td>${indexElem["name"]}</td><td>${indexElem["time"]}</td></tr>`
}

//Render easy or hard:
export function renderGameEndEasyOrHard(difficulty) {
    if(difficulty === 5) {
        return "Toplista KÖNNYŰ kategóriában:"
    }
    if(difficulty === 7) {
        return "Toplista NEHÉZ kategóriában:"
    }
}

