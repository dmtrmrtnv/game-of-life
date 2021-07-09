import {useContext} from 'react';
import {World, generateWorld} from '../../components/world';
import {Examples, examples} from '../../components/examples';
import {Config} from '../../context/config';

export const LandingPage = () => {
    const config = useContext(Config);
    const {worldScale, aliveProbability} = config;
    return (
        <div>
            <World config={config} defaultWorld={generateWorld(worldScale, aliveProbability)}/>
            <Examples config={config} examples={examples}/>
        </div>
    )
};
