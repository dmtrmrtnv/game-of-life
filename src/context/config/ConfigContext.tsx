import {createContext} from 'react';
import {ConfigType} from './types';

export const config: ConfigType = {
    worldScale: 50,
    aliveProbability: 0.25,
    refreshInterval: 1000
};

export const Config = createContext(config);