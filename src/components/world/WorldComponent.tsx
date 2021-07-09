import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {WorldPropsType} from './types';
import {calculateWorldState} from './utils';

const WorldComponent = ({config, defaultWorld, className}: WorldPropsType) => {
    const [world, setWorld] = useState(defaultWorld);

    useEffect(() => {
        // TODO: Calculate the state before rendering so setInterval will just set it.
        const intervalId = setInterval(() => {
            setWorld((prevWorld) => calculateWorldState(config.worldScale, prevWorld));
        }, config.refreshInterval);
        return () => clearInterval(intervalId);
    }, [config]);

    return (
        <table className={className}>
            <tbody>
            {world.map((row, rowI) => (
                <tr key={rowI}>
                    {row.map((cell, cellI) => {
                        const label = cell > 0 ? 'alive' : 'dead';
                        return <td title={label} key={cellI} className={label}/>
                    })}
                </tr>
            ))}
            </tbody>
        </table>
    )
};

export const World = styled(WorldComponent)`
  border-collapse: collapse;

  &, td {
    border: 1px solid #ccc;
  }

  td {
    width: 10px;
    height: 10px;
    background-color: #fff;
  }

  td.alive {
    background-color: #000;
  }
`;