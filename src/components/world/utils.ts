import {WorldType} from './types';

export const generateWorld = (worldScale: number, aliveProbability: number): WorldType => {
    const worldRow = Array(worldScale).fill(0);
    return worldRow.map(() => worldRow.map(cell => Math.random() < aliveProbability ? 1 : cell));
};

const getCellIndex = (index: number, worldScale: number): number => (
    index === -1 ? worldScale - 1 : index % worldScale
);

const getCell = (worldScale: number, world: WorldType, rowI: number, cellI: number) => (
    world[getCellIndex(rowI, worldScale)][getCellIndex(cellI, worldScale)]
);

const calculateCellState = (worldScale: number, world: WorldType, rowI: number, cellI: number) => {
    const neighboursAlive = (
        getCell(worldScale, world, rowI - 1, cellI - 1) +
        getCell(worldScale, world, rowI - 1, cellI) +
        getCell(worldScale, world, rowI - 1, cellI + 1) +
        getCell(worldScale, world, rowI, cellI - 1) +
        getCell(worldScale, world, rowI, cellI + 1) +
        getCell(worldScale, world, rowI + 1, cellI - 1) +
        getCell(worldScale, world, rowI + 1, cellI) +
        getCell(worldScale, world, rowI + 1, cellI + 1)
    );
    if (neighboursAlive === 3 || (world[rowI][cellI] === 1 && neighboursAlive >= 2 && neighboursAlive <= 3)) {
        return 1;
    }
    return 0;
}

export const calculateWorldState = (worldScale: number, prevWorld: WorldType): WorldType => (
    prevWorld.map((row, rowI) => (
        row.map((cell, cellI) => calculateCellState(worldScale, prevWorld, rowI, cellI))
    ))
);