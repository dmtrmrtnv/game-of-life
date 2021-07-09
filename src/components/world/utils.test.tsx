import {calculateWorldState} from './utils';
import {examples, ExampleType, PatternType} from '../examples';

test('calculating world states', () => {
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