import * as React from 'react';
import './Applytheme.scss';

// declare function require(path: string): any;

const Apply = ({themeList, handleSelect, appliedTheme}) => {
    console.log(appliedTheme);
    return (
        <div className="themeApplyBtns">
            {themeList.map((th: string) => (
                <button
                    className="theme-selection-buttons"
                    key={th}
                    value={th}
                    onClick={handleSelect}
                    style={{color: 'black', display: 'block'}}
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
