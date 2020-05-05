import * as React from 'react';
import Apply from './ApplyWithButtons';
import '../styles/ui.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRedo, faBell} from '@fortawesome/free-solid-svg-icons';

const ThemeSwicther = ({data, onCreate, appliedTheme, handleApplyTheme, getThemeList}) => {
    const [filteredThemeList, setFilteredThemeList] = React.useState([]);
    const [selectedTheme, setSelectedTheme] = React.useState('');

    React.useEffect(() => {
        setFilteredThemeList([]);
    }, []);

    // const handleFilterChange = event => {
    //     let value = event.target.value;
    //     let results = [];
    //     if (value) {
    //         getThemeList().forEach(element => {
    //             if (element.includes(value)) {
    //                 results.push(element);
    //             }
    //         });
    //         setFilteredThemeList(results);
    //     } else {
    //         setFilteredThemeList(getThemeList());
    //     }
    // };
    const handleThemeSelect = event => {
        setSelectedTheme(event.target.value);
    };
    if (data && data.length === 0) {
        return (
            <div style={{display: 'flex'}}>
                <div style={{textAlign: 'left', paddingTop: '60px', paddingLeft: '46px', paddingRight: '10px'}}>
                    <FontAwesomeIcon icon={faBell} size="lg" />
                </div>
                <div style={{textAlign: 'left', paddingTop: '54px', paddingRight: '54px'}}>
                    <h3 style={{display: 'inline', marginLeft: '3px'}}>No themes available</h3>
                    <p>You dont have any themes create. Sync local styles to get started</p>
                    <div style={{textAlign: 'center'}}>
                        <button className="primary-button" style={{marginTop: '100px'}} onClick={onCreate}>
                            Sync local styles
                        </button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <React.Fragment>
                <div style={{padding: '15px', position: 'absolute'}}>
                    <a className="resync-link" onClick={onCreate}>
                        <FontAwesomeIcon icon={faRedo} size="1x" />
                        <span style={{marginLeft: '3px'}}>Resync Local Styles</span>
                    </a>
                    <h3 style={{marginTop: '34px'}}>Found these themes</h3>
                    {/* <input type="text" onChange={handleFilterChange}></input> */}
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
                </div>
                <div style={{borderTop: '1px solid #F0F0F0', position: 'fixed', bottom: 0, width: '100%'}}>
                    <button onClick={() => handleApplyTheme(selectedTheme)} className="apply-btn">
                        Apply
                    </button>
                </div>
            </React.Fragment>
        );
    }
};

export default ThemeSwicther;
