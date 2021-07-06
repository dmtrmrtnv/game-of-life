import {calculateWorldState} from './App';
import examples from './examples';
import {ExampleType, PatternType} from './types';

test('calculating world states', () => {
    //TODO: About the test style. It's a big question testing a single assert or testing a single thing. :)
    examples.forEach(({patterns}: ExampleType) => {
        patterns.forEach(({world, period}: PatternType) => {
            const worldScale = world.length;
            const newWorld = Array(period)
                .fill(null)
                .reduce((a) => calculateWorldState(worldScale, a), world);
            expect(newWorld).toEqual(world);
        });
    });
});
