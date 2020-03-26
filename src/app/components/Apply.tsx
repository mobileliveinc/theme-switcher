import * as React from 'react';
import '../styles/ui.css';

declare function require(path: string): any;

const Apply = ({themeList, handleApply}) => {
  const [value, setValue] = React.useState('default')

    const handleSelect = (e) => {
      setValue(e.target.value)
    }

    return (
        <div>
          <label >Choose a Theme:</label>
          <select onChange={handleSelect} onBlur={handleSelect}>
            {
              themeList.map((th: string) => 
              <option key={th} value={th}>{th}</option>)
            }
          </select>
          <button onClick={() => handleApply(value)}>Apply</button>
        </div>
    );
};

export default Apply;
