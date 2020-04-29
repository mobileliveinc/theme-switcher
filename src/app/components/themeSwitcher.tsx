import * as React from 'react';
import Apply from './ApplyWithButtons';
import '../styles/ui.css';

const ThemeSwicther = ({data, onCreate, appliedTheme, handleApplyTheme, getThemeList}) => {
    const [filteredThemeList, setFilteredThemeList] = React.useState([]);
    const [selectedTheme, setSelectedTheme] = React.useState('');

    React.useEffect(() => {
        setFilteredThemeList([]);
    }, []);

    const handleFilterChange = event => {
        let value = event.target.value;
        let results = [];
        if (value) {
            getThemeList().forEach(element => {
                if (element.includes(value)) {
                    results.push(element);
                }
            });
            setFilteredThemeList(results);
        } else {
            setFilteredThemeList(getThemeList());
        }
    };
    const handleThemeSelect = event => {
        setSelectedTheme(event.target.value);
    };
    if (data && data.length === 0) {
        return (
            <div>
                <h3>No themes available</h3>
                <p>You dont have any themes create. Sync local styles to get started</p>
                <button onClick={onCreate}>Sync local styles</button>
            </div>
        );
    } else {
        return (
            <div>
                <img src={require('../assets/logo.svg')} />
                <h2>Theme Creator</h2>
                <input type="text" onChange={handleFilterChange}></input>
                {/* <div className="wrapper">
        {data && data.length > 0 && (
            <button id="create" onClick={onDelete}>
                Delete Current Themes
            </button>
        )}
        <button id="create" onClick={onCreate}>
            Create Theme with Local Colors
        </button>
    </div> */}
                <Apply
                    appliedTheme={selectedTheme ? selectedTheme : appliedTheme}
                    handleSelect={handleThemeSelect}
                    themeList={filteredThemeList.length === 0 ? getThemeList() : filteredThemeList}
                />
                <button onClick={onCreate}>Resync</button>

                <button onClick={() => handleApplyTheme(selectedTheme)} style={{marginTop: '50px'}}>
                    Apply
                </button>
            </div>
        );
    }
};

export default ThemeSwicther;
