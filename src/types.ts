export type ConfigType = {
    worldScale: number;
    aliveProbability: number;
    refreshInterval: number;
};

export type WorldType = Array<Array<number>>;

export type WorldPropsType = {
    config: ConfigType;
    defaultWorld: WorldType;
};

export type PatternType = {
    title: string;
    period: number;
    world: WorldType;
}

export type ExampleType = {
    title: string;
    patterns: Array<PatternType>;
};

export type ExamplesType = Array<ExampleType>;

export type ExamplesPropsType = {
    config: ConfigType;
    examples: ExamplesType;
}