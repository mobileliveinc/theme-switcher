import * as React from 'react';
import Apply from '../Applytheme/ApplyWithButtons';
import './themeSwitcher.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRedo, faBell, faChevronDown, faSearch} from '@fortawesome/free-solid-svg-icons';

const ThemeSwicther = ({data, onCreate, appliedTheme, handleApplyTheme, getThemeList}) => {
    const [filteredThemeList, setFilteredThemeList] = React.useState([]);
    const [selectedTheme, setSelectedTheme] = React.useState('');
    const [filterInputClassName, setFilterInputClassName] = React.useState('');
    const show = 'SHOW';
    const hide = 'hide';

    React.useEffect(() => {
        setFilteredThemeList([]);
    }, []);

    const handleFilterChange = async event => {
        let value = event.target.value;
        let results = [];
        const themes = await getThemeList();
        if (value) {
            results = themes.filter(theme => theme.toUpperCase().indexOf(value.toUpperCase()) >= 0);
            setFilteredThemeList(results);
        } else {
            setFilteredThemeList(getThemeList());
        }
    };
    const handleThemeSelect = event => {
        setSelectedTheme(event.target.value);
    };
    const handleFilterToggle = (event, action) => {
        console.log('Action is ', action);
        if (action === show) {
            setFilterInputClassName('className');
        } else if (action === hide && event.target.value === '') {
            setFilterInputClassName('');
        }
    };
    if (data && data.length === 0) {
        return (
            <div style={{display: 'flex'}} className="noThemesAvaile">
                <div style={{textAlign: 'left', paddingTop: '60px', paddingLeft: '46px', paddingRight: '10px'}}>
                    <FontAwesomeIcon icon={faBell} size="lg" />
                </div>
                <div
                    className="themeSwitcherContent"
                    style={{textAlign: 'left', paddingTop: '58px', paddingRight: '54px'}}
                >
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
                <div style={{padding: '20px'}}>
                    <div className="filter_holder">
                        <a className="resync-link" onClick={onCreate}>
                            <FontAwesomeIcon icon={faRedo} size="1x" />
                            <span style={{marginLeft: '3px'}}>Resync Local Styles</span>
                        </a>
                        <div className="searchField">
                            <label htmlFor="searchme"></label>
                            <input
                                id="searchme"
                                placeholder="filter"
                                onChange={handleFilterChange}
                                onBlur={event => {
                                    handleFilterToggle(event, hide);
                                }}
                            ></input>
                            <a href="" className={filterInputClassName}>
                                <FontAwesomeIcon
                                    className="chevronSearch"
                                    icon={faSearch}
                                    size="1x"
                                    onClick={event => {
                                        handleFilterToggle(event, show);
                                    }}
                                />
                            </a>
                        </div>
                    </div>

                    <h3 style={{marginTop: '34px'}}>Found these themes</h3>
                    <Apply
                        appliedTheme={selectedTheme ? selectedTheme : appliedTheme}
                        handleSelect={handleThemeSelect}
                        themeList={filteredThemeList.length === 0 ? getThemeList() : filteredThemeList}
                    />
                </div>
                <div className="themeApplySelect">
                    <div className="selectHolder">
                        <FontAwesomeIcon className="chevron" icon={faChevronDown} size="1x" />
                        <select>
                            <option value="applyToSelection">Apply to selection</option>
                            <option value="applyToPage">Apply To Page</option>
                        </select>
                    </div>
                    <div>
                        <button onClick={() => handleApplyTheme(selectedTheme)} className="apply-btn">
                            Apply
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
};

export default ThemeSwicther;
