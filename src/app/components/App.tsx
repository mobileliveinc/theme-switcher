import * as React from 'react';
import '../styles/ui.scss';
import ThemeSwicther from './themeSwitcher/themeSwitcher';
import OnBoadring from './onBoarding/onBoarding';

// declare function require(path: string): any;

const App = ({}) => {
    const [appliedTheme, setAppliedTheme] = React.useState('');
    const [data, setData] = React.useState([]);
    const [isOnboardingDone, setIsOnboardingDone] = React.useState(false);
    const [dataLoaded, setDataLoaded] = React.useState(false);
    const [applyType, setApplyType] = React.useState('selection');
    const [applyThemePopupHidden, setApplyThemePopupHidden] = React.useState(true);

    React.useEffect(() => {
        (async function() {
            await parent.postMessage({pluginMessage: {type: 'getCurrentTheme'}}, '*');
            getCreatedTheme();
        })();
    }, []);

    const getCreatedTheme = () => {
        window.onmessage = event => {
            const {type, themeData, isOnBoardingDone} = event.data.pluginMessage;
            if (type === 'getTheme') {
                setIsOnboardingDone(isOnBoardingDone);
                console.log('invoked setIsOnboardingDone with ', isOnBoardingDone);
                setDataLoaded(true);
                const {collectLocalColors, appliedTheme} = themeData;
                setAppliedTheme(appliedTheme ? appliedTheme : '');
                setData(collectLocalColors && collectLocalColors.length > 0 ? collectLocalColors : []);
            }
            if (type === 'delete-theme') {
                setData([]);
            }
        };
    };
    const onCreate = React.useCallback(() => {
        parent.postMessage({pluginMessage: {type: 'create-theme'}}, '*');
    }, []);

    const handleApplyTheme = value => {
        console.log('here with value');
        setApplyThemePopupHidden(false);
        setTimeout(() => {
            setApplyThemePopupHidden(true);
        }, 2000);
        parent.postMessage({pluginMessage: {type: 'apply-theme', themeName: value, selectType: applyType}}, '*');
    };

    const onBoardingDone = () => {
        setIsOnboardingDone(true);
        parent.postMessage({pluginMessage: {type: 'on-boarding-done'}}, '*');
    };

    const resize = (width, height) => {
        parent.postMessage({pluginMessage: {type: 'resize-plugin-modal', width: width, height: height}}, '*');
    };
    const handleApplyTypeSelect = type => {
        setApplyType(type);
    };

    React.useEffect(() => {
        // This is how we read messages sent from the plugin controller
        window.onmessage = event => {
            const {type} = event.data.pluginMessage;
            if (type === 'theme-created') {
                getCreatedTheme();
            }
        };
    }, []);

    const getThemeList = () => {
        const dataList = data ? [...new Set(data.map(item => item.theme))] : [];
        return dataList;
    };
    // const selectAll = () => {

    //     parent.postMessage({pluginMessage: {type: applyType}}, '*');
    // }
    if (dataLoaded === false) return null;
    if (data.length === 0 && isOnboardingDone) {
        resize(380, 400);
    }
    if (data && isOnboardingDone) {
        resize(380, 450);
    }
    return (
        <React.Fragment>
            {isOnboardingDone ? (
                <ThemeSwicther
                    data={data}
                    onCreate={onCreate}
                    appliedTheme={appliedTheme}
                    handleApplyTheme={handleApplyTheme}
                    handleApplyTypeSelect={handleApplyTypeSelect}
                    isPopuphidden={applyThemePopupHidden}
                    getThemeList={getThemeList}
                    currentSelectionType={applyType}
                />
            ) : (
                <OnBoadring handleOnboardingFinish={onBoardingDone} />
            )}
            {/* <button onClick={() => {handleApplyTypeSelect("all")}}>Test apply all</button> */}
            <div className="footer_themeswitcher">
                <p>Created by mobileLIVE</p>
            </div>
        </React.Fragment>
    );
};

export default App;
