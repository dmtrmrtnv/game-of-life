import styled from 'styled-components';
import {ExamplesPropsType} from './types';
import {World} from '../world';

const ExamplesComponent = ({config, examples, className}: ExamplesPropsType) => (
    <div className={className}>
        {examples.map(col => (
            <div key={col.title}>
                <h2>{col.title}</h2>
                {col.patterns.map(pattern => {
                    const worldScale = pattern.world.length;
                    return <div className="example-pattern" key={pattern.title}>
                        <World config={{...config, worldScale}} defaultWorld={pattern.world}/>
                        {pattern.title}
                    </div>
                })}
            </div>
        ))}
    </div>
);

export const Examples = styled(ExamplesComponent)`
  .example-pattern {
    display: inline-block;
    margin: 1rem;
  }
`;
