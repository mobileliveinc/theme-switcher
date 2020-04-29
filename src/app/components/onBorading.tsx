import * as React from 'react';
import '../styles/ui.css';

// declare function require(path: string): any;

const OnBoadring = ({handleOnboardingFinish}) => {
    return (
        <div>
            <h1>On Boarding</h1>
            <button id="button-apply" onClick={() => handleOnboardingFinish()}>
                Finish
            </button>
        </div>
    );
};

export default OnBoadring;
