// Drum Arrays
let kicks = [];
let snares = [];
let hiHats = [];
let rideCymbals = [];

const ARRAY_NAMES = ['kicks', 'snares', 'hiHats', 'rideCymbals'];
const ARRAY_LENGTH = 16;

const initializeArray = arr => {
    let initialLength = arr.length;
    for (let i = 0; i < ARRAY_LENGTH - initialLength; i++) {
        arr.push(false);
    }
}

const resetArray = arr => {
    initializeArray(arr);
    arr.fill(false);
}

const verifyToggleDrumInput = (arrayName, index) => {
    return ARRAY_NAMES.includes(arrayName) && index < ARRAY_LENGTH && index >= 0 && index != null;
}

const getArrayByName = arrayName => {
    switch (arrayName) {
        case 'kicks':
            return kicks;
        case 'snares':
            return snares;
        case 'hiHats':
            return hiHats;
        case 'rideCymbals':
            return rideCymbals;
        default:
            return undefined;
    }
}

const toggleDrum = (arrayName, index) => {
    if (!verifyToggleDrumInput(arrayName, index)){
        return;
    }

    arr = getArrayByName(arrayName);
    arr[index] = !arr[index];
    
}

const clear = arrayName => {
    if(!ARRAY_NAMES.includes(arrayName)) {
        return;
    }

    arr = getArrayByName(arrayName);
    resetArray(arr);
}

const invert = arrayName => {
    if(!ARRAY_NAMES.includes(arrayName)) {
        return;
    }
    
    arr = getArrayByName(arrayName);
    arr.forEach((elem, index, array) => {
        array[index] = !elem;
    });
}

const getNeighborPads = (x, y, size) => {
    const result = [];
    if(x >= size || y >= size || size < 1 || x < 0 || y < 0){
        return result;
    }

    result.push([x, y + 1]);
    result.push([x, y - 1]);
    result.push([x + 1, y]);
    result.push([x - 1, y]);

    return result.filter(elem => {
        return elem.every(value => {
            return value >= 0 && value < size; 
        });
    });
}

resetArray(kicks);
resetArray(snares);
resetArray(hiHats);
resetArray(rideCymbals);



