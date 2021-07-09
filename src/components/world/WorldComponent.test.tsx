import {World} from './';
import {cleanup, fireEvent, render} from '@testing-library/react';

test('renders world', () => {
    const worldRendered = render(
        <World config={{
            worldScale: 2,
            aliveProbability: 1,
            refreshInterval: 1
        }}
        defaultWorld={[[1,1,0],[1,1,0],[0,0,0]]}/>,
    );
    //TODO: Create assertion
});