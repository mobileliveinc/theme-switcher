import * as React from 'react';
import Apply from '../Applytheme/ApplyWithButtons';
import './themeSwitcher.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronDown, faCheck} from '@fortawesome/free-solid-svg-icons';
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
                    {/* <img src={require(`../../assets/Alert.png`)} max-width="50%" max-height="50%" /> */}
                    <img src={require(`../../assets/Alert.svg`)} alt="refresh_icon" />
                </div>
                <div
                    className="themeSwitcherContent"
                    style={{textAlign: 'left', paddingTop: '58px', paddingRight: '54px'}}
                >
                    <h3 style={{display: 'inline', marginLeft: '3px'}}>No Themes Found</h3>
                    <p>{`You don’t have any themes created. Sync local styles to get started.`}</p>
                    <div style={{textAlign: 'center', marginLeft: '-28px'}}>
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
                            <img src={require(`../../assets/refresh.svg`)} alt="refresh_icon" />
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
                                <svg
                                    width="13"
                                    height="13"
                                    viewBox="0 0 13 13"
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => {
                                        handleFilterToggle(filterInputClassName === '' ? show : hide);
                                    }}
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M8.54703 8.76739C7.71902 9.43145 6.66778 9.82861 5.52368 9.82861C2.85277 9.82861 0.6875 7.66345 0.6875 4.99243C0.6875 2.32152 2.85277 0.15625 5.52368 0.15625C8.1947 0.15625 10.3599 2.32152 10.3599 4.99243C10.3599 6.13664 9.9626 7.18798 9.29843 8.01609L12.7506 11.4684L11.9993 12.2197L8.54703 8.76739ZM9.29736 4.99243C9.29736 7.07663 7.60788 8.76611 5.52368 8.76611C3.43959 8.76611 1.75 7.07663 1.75 4.99243C1.75 2.90834 3.43959 1.21875 5.52368 1.21875C7.60788 1.21875 9.29736 2.90834 9.29736 4.99243Z"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <h3>Found these themes</h3>
                    <Apply
                        appliedTheme={selectedTheme ? selectedTheme : appliedTheme}
                        currentTheme={appliedTheme}
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
                            {currentSelectionType === 'selection' ? `Apply To Select` : 'Apply to Page'}
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
                                Apply to Selection
                            </li>
                            <li
                                className={currentSelectionType === 'all' ? 'active' : ''}
                                onClick={() => {
                                    handleApplyTypeSelect('all');
                                }}
                            >
                                <FontAwesomeIcon className="check" icon={faCheck} size="1x" />
                                Apply to Page
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
