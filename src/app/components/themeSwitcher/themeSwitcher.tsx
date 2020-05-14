import * as React from 'react';
import Apply from '../Applytheme/ApplyWithButtons';
import './themeSwitcher.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRedo, faSearch, faChevronDown, faCheck} from '@fortawesome/free-solid-svg-icons';

const ThemeSwicther = ({
    data,
    onCreate,
    appliedTheme,
    handleApplyTheme,
    getThemeList,
    handleApplyTypeSelect,
    isPopuphidden,
    currentSelectionType,
}) => {
    const [filteredThemeList, setFilteredThemeList] = React.useState([]);
    const [selectedTheme, setSelectedTheme] = React.useState('');
    const [filterInputClassName, setFilterInputClassName] = React.useState('');
    const [themeReselected, setThemeReselected] = React.useState(false);
    const [selectionMenuHidden, setSelectionMenuHidden] = React.useState(true);
    const show = 'SHOW';
    const hide = 'hide';

    React.useEffect(() => {
        setFilteredThemeList([]);
    }, []);

    React.useEffect(() => {
        document.getElementById('react-page').addEventListener('click', () => {
            setSelectionMenuHidden(true);
        });
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
        setThemeReselected(true);
        setSelectedTheme(event.target.value);
    };
    const handleFilterToggle = action => {
        if (action === show) {
            setFilterInputClassName('focus');
        } else {
            setFilterInputClassName('');
        }
    };
    const handleResetStyle = () => {
        setSelectedTheme('default');
        handleApplyTheme('default');
    };
    if (data && data.length === 0) {
        return (
            <div style={{display: 'flex'}} className="noThemesAvaile">
                <div style={{textAlign: 'left', paddingTop: '53px', paddingLeft: '46px', paddingRight: '4px'}}>
                    {/* <FontAwesomeIcon icon={faBell} size="lg" /> */}
                    <img src={require(`../../assets/Alert.png`)} max-width="50%" max-height="50%" />
                </div>
                <div
                    className="themeSwitcherContent"
                    style={{textAlign: 'left', paddingTop: '58px', paddingRight: '54px'}}
                >
                    <h3 style={{display: 'inline', marginLeft: '3px'}}>No Themes Found</h3>
                    <p>{`You don’t have any themes created. Sync local styles to get started.`}</p>
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
                <div className="foundThemeContent">
                    <div className="filter_holder">
                        <a className="resync-link" onClick={onCreate}>
                            <FontAwesomeIcon icon={faRedo} size="1x" />
                            <span style={{marginLeft: '6px'}}>Resync Local Styles</span>
                        </a>
                        <div className={`searchField ${filterInputClassName}`}>
                            <label htmlFor="searchme"></label>
                            <input
                                id="searchme"
                                onChange={handleFilterChange}
                                onBlur={() => {
                                    handleFilterToggle(hide);
                                }}
                            ></input>
                            <a className="search-btn">
                                <FontAwesomeIcon
                                    className="chevronSearch"
                                    icon={faSearch}
                                    size="1x"
                                    onClick={() => {
                                        handleFilterToggle(filterInputClassName === '' ? show : hide);
                                    }}
                                />
                            </a>
                        </div>
                    </div>

                    <h3>Found these themes</h3>
                    <Apply
                        appliedTheme={selectedTheme ? selectedTheme : appliedTheme}
                        handleSelect={handleThemeSelect}
                        themeList={filteredThemeList.length === 0 ? getThemeList() : filteredThemeList}
                    />
                </div>
                <div className="themeSelectMessage">
                    {!isPopuphidden && (
                        <div className="msg-wrap">
                            <img src={require(`../../assets/clap.png`)} alt="clap_icon" />
                            <span>{`Successfully apllied ${selectedTheme} theme`}</span>
                        </div>
                    )}
                    <a className="reset-link" onClick={handleResetStyle}>
                        Reset Style
                    </a>
                </div>
                <div className="themeApplySelect">
                    <div className="selectHolder">
                        <button
                            onClick={() => {
                                setSelectionMenuHidden(!selectionMenuHidden);
                            }}
                        >
                            {currentSelectionType === 'selection' ? `Apply To Select` : 'Apply to all'}
                            <FontAwesomeIcon className="chevron" icon={faChevronDown} size="1x" />
                        </button>
                        <ul className="drpdown" hidden={selectionMenuHidden}>
                            <li
                                className={currentSelectionType === 'selection' ? 'active' : ''}
                                onClick={() => {
                                    handleApplyTypeSelect('selection');
                                }}
                            >
                                <FontAwesomeIcon className="check" icon={faCheck} size="1x" />
                                Apply to selection
                            </li>
                            <li
                                className={currentSelectionType === 'all' ? 'active' : ''}
                                onClick={() => {
                                    handleApplyTypeSelect('all');
                                }}
                            >
                                <FontAwesomeIcon className="check" icon={faCheck} size="1x" />
                                Apply to all
                            </li>
                        </ul>
                    </div>
                    <div>
                        <button
                            onClick={() => handleApplyTheme(selectedTheme)}
                            className={`apply-btn ${!themeReselected ? 'disabled' : ''}`}
                            disabled={!themeReselected}
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
};

export default ThemeSwicther;
