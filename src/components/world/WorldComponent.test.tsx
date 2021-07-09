import {World} from './';
import {act, render} from '@testing-library/react';

beforeEach(() => {
    jest.useFakeTimers();
})

afterEach(() => {
    jest.useRealTimers();
});

it('renders world', () => {
    const {queryAllByTitle} = render(
        <World
            config={{
                worldScale: 3,
                aliveProbability: 1,
                refreshInterval: 1
            }}
            defaultWorld={[[1, 1, 0], [0, 1, 0], [0, 0, 0]]}
        />,
    );
    act(() => jest.advanceTimersByTime(1));
    expect(queryAllByTitle('alive')).toHaveLength(9);
});