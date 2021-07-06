import './App.css';
import {useState, useEffect} from 'react';
import examples from './examples';
import {ConfigType, WorldType, WorldPropsType, ExamplesPropsType} from './types';

const defaultConfig: ConfigType = {
    // TODO: Add possibility to create rectangle world like 50x100
    worldScale: 50,
    aliveProbability: 0.25,
    refreshInterval: 1000
};

/**
 * @return a world:WorldType
 * @param worldScale
 * @param aliveProbability
 */
const generateWorld = ({worldScale, aliveProbability}: ConfigType): WorldType => {
    const worldRow = Array(worldScale).fill(0);
    return worldRow.map(() => worldRow.map(cell => Math.random() < aliveProbability ? 1 : cell));
};

/**
 * @return an index in range from 0 to worldScale
 * @param index
 * @param worldScale
 */
const getCellIndex = (index: number, worldScale: number): number => (
    index === -1 ? worldScale - 1 : index % worldScale
);

/**
 * @return cell value by in the world, world is considered as a Tor
 * @param worldScale
 * @param world
 * @param rowI
 * @param cellI
 */
const getCell = (worldScale: number, world: WorldType, rowI: number, cellI: number) => (
    world[getCellIndex(rowI, worldScale)][getCellIndex(cellI, worldScale)]
);

/**
 * @return cell state, is the cell alive or dead
 * @param worldScale
 * @param world
 * @param rowI
 * @param cellI
 */
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

/**
 * @return a new calculated world state
 * @param worldScale
 * @param prevWorld
 */
export const calculateWorldState = (worldScale: number, prevWorld: WorldType): WorldType => (
    prevWorld.map((row, rowI) => (
        row.map((cell, cellI) => calculateCellState(worldScale, prevWorld, rowI, cellI))
    ))
);

const World = ({config, defaultWorld}: WorldPropsType) => {
    const [world, setWorld] = useState(defaultWorld);

    useEffect(() => {
        // TODO: This algorithm is not effective when there are not many alive cells in the world and if the world is huge.
        // Depending on the requirements I'd chose a different algorithm, It could be some kind of communication
        // between cells using events or something like that.
        const intervalId = setInterval(() => {
            setWorld(calculateWorldState.bind(null, config.worldScale));
        }, config.refreshInterval);
        return () => clearInterval(intervalId);
    }, [config]);

    return <table className="world-component">
        <tbody>
        {world.map((row, rowI) => {
            return <tr key={rowI} className="row">
                {row.map((cell, cellI) => <td key={cellI} className={`cell${cell > 0 ? " alive" : ""}`}/>)}
            </tr>
        })}
        </tbody>
    </table>
}

const Examples = ({config, examples}: ExamplesPropsType) => (
    <div className="examples-component">
        {examples.map(col => (
            <div key={col.title}>
                <h2>{col.title}</h2>
                {col.patterns.map(pattern => {
                    const worldScale = pattern.world.length;
                    return <div className="example-pattern" key={pattern.title}>
                        <World config={{...config, worldScale}} defaultWorld={pattern.world}/>
                        {pattern.title}
                    </div>
                })}
            </div>
        ))}
    </div>
);

const App = () => (
    <div>
        <World config={defaultConfig} defaultWorld={generateWorld(defaultConfig)}/>
        <Examples config={defaultConfig} examples={examples}/>
    </div>
);

export default App;
