import * as React from 'react';
import '../styles/ui.css';

// declare function require(path: string): any;

const Apply = ({themeList, handleApply, appliedTheme}) => {
    const [value, setValue] = React.useState(appliedTheme || 'default');

    const handleSelect = e => {
        setValue(e.target.value);
    };

    return (
        <div>
            <label>Choose a Theme:</label>
            <br />
            {themeList.map((th: string) => (
                <button key={th} value={th} onClick={handleSelect}>
                    {th}
                </button>
            ))}
            <br />
            <button id="button-apply" onClick={() => handleApply(value)} style={{marginTop: '10px'}}>
                Apply
            </button>
        </div>
    );
};

export default Apply;
