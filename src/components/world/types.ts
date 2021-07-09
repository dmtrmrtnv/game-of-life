import {ConfigType} from '../../context/config';

export type WorldType = Array<Array<number>>;

export type WorldPropsType = {
    config: ConfigType;
    defaultWorld: WorldType;
    className?: string;
};