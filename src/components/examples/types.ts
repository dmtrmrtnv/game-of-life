import {ConfigType} from '../../context/config';
import {WorldType} from '../world';

export type PatternType = {
    title: string;
    period: number;
    world: WorldType;
};

export type ExampleType = {
    title: string;
    patterns: Array<PatternType>;
};

export type ExamplesType = Array<ExampleType>;

export type ExamplesPropsType = {
    config: ConfigType;
    examples: ExamplesType;
    className?: string;
};