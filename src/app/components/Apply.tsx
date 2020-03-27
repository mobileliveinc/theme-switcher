import * as React from 'react';
import '../styles/ui.css';

// declare function require(path: string): any;

const Apply = ({themeList, handleApply, appliedTheme}) => {
  const [value, setValue] = React.useState('default')

    const handleSelect = (e) => {
      setValue(e.target.value)
    }

    return (
        <div>
          <label >Choose a Theme:</label>
          <select className="selec-theme" onChange={handleSelect} onBlur={handleSelect}>
            {
              themeList.map((th: string) => 
              <option key={th} value={th} selected={appliedTheme === th ? true : false}>{th}</option>)
            }
          </select>
          <button id="button-apply" onClick={() => handleApply(value)}>Apply</button>
        </div>
    );
};

export default Apply;
