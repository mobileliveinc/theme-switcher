import * as React from 'react';
import '../styles/ui.css';

// declare function require(path: string): any;

const Apply = ({themeList, handleSelect, appliedTheme}) => {
    console.log(appliedTheme);
    return (
        <div>
            {themeList.map((th: string) => (
                <button className="theme-selection-button" key={th} value={th} onClick={handleSelect}>
                    {th}
                </button>
            ))}
            <br />
            {/* <button id="button-apply" onClick={() => handleApply(value)} style={{marginTop: '10px'}}>
                Apply
            </button> */}
        </div>
    );
};

export default Apply;
