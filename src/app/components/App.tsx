import * as React from 'react';
import '../styles/ui.scss';
import ThemeSwicther from './themeSwitcher/themeSwitcher';
// import Apply from './ApplyWithButtons';
import OnBoadring from './onBoarding/onBoarding';

// declare function require(path: string): any;

const App = ({}) => {
    const [appliedTheme, setAppliedTheme] = React.useState('');
    const [data, setData] = React.useState([]);
    const [isOnboardingDone, setIsOnboardingDone] = React.useState(false);
    const [dataLoaded, setDataLoaded] = React.useState(false);

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

    // const onDelete = React.useCallback(() => {
    //     parent.postMessage({pluginMessage: {type: 'remove-theme'}}, '*');
    // }, []);

    // const onClose = React.useCallback(() => {
    //     parent.postMessage({pluginMessage: {type: 'close-plugin'}}, '*');
    // }, []);

    const handleApplyTheme = value => {
        parent.postMessage({pluginMessage: {type: 'apply-theme', themeName: value}}, '*');
    };

    const onBoardingDone = () => {
        setIsOnboardingDone(true);
        parent.postMessage({pluginMessage: {type: 'on-boarding-done'}}, '*');
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
    console.log('isOnboardingDone state is ', isOnboardingDone);
    if (dataLoaded === false) return null;
    return (
        <React.Fragment>
            {isOnboardingDone ? (
                <ThemeSwicther
                    data={[]}
                    // onDelete={onDelete}
                    onCreate={onCreate}
                    appliedTheme={appliedTheme}
                    handleApplyTheme={handleApplyTheme}
                    getThemeList={getThemeList}
                    // onClose={onClose}
                />
            ) : (
                <OnBoadring handleOnboardingFinish={onBoardingDone} />
            )}
            <div className="footer_themeswitcher">
                <p>Created by MobileLIVE</p>
            </div>
        </React.Fragment>
    );
};

export default App;
