import * as React from 'react';
import './Applytheme.scss';

// declare function require(path: string): any;

const inactiveStyles = {color: 'black', display: 'block'};
const activeStyles = {color: 'white', backgroundColor: '#4F4F4F', display: 'block'};

const Apply = ({themeList, handleSelect, appliedTheme, currentTheme}) => {
    console.log('applied theme is ', appliedTheme);
    return (
        <div className="themeApplyBtns">
            {themeList.map((th: string) => (
                <button
                    className="theme-selection-buttons"
                    key={th}
                    value={th}
                    onClick={handleSelect}
                    style={th === currentTheme ? activeStyles : inactiveStyles}
                >
                    {/* <span className="ColorCode">#A10B0B</span> */}
                    {/* <span className="btnType">{th}</span> */}
                    {th}
                </button>
            ))}
            {/*<br />*/}
            {/*<button id="button-apply" onClick={() => handleApply(value)} style={{marginTop: '10px'}}>*/}
            {/*Apply*/}
            {/*</button>*/}
        </div>
    );
};

export default Apply;
// #4F4F4F
