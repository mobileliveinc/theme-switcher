import * as React from 'react';
import '../styles/ui.scss';
import ThemeSwicther from './themeSwitcher/themeSwitcher';
import OnBoadring from './onBoarding/onBoarding';
import Modal from 'react-modal';

// declare function require(path: string): any;

Modal.setAppElement('#react-page');

const customStyles = {
    content: {
        top: '35%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-40%',
        padding: '10px 15px',
        transform: 'translate(-50%, -50%)',
    },
};

const App = ({}) => {
    var subtitle;
    const [appliedTheme, setAppliedTheme] = React.useState('');
    const [data, setData] = React.useState([]);
    const [isOnboardingDone, setIsOnboardingDone] = React.useState(false);
    const [dataLoaded, setDataLoaded] = React.useState(false);
    const [applyType, setApplyType] = React.useState('selection');
    const [applyThemePopupHidden, setApplyThemePopupHidden] = React.useState(true);
    const [modalIsOpen, setIsOpen] = React.useState(false);

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
                setDataLoaded(true);
                const {collectLocalColors, appliedTheme} = themeData;
                console.log('theme data is ', themeData);
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
        setApplyThemePopupHidden(false);
        setAppliedTheme(value);
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
    // function openModal() {
    //     setIsOpen(true);
    //   }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }
    const toggleModal = () => {
        setIsOpen(!modalIsOpen);
    };
    if (dataLoaded === false) return null;
    if (data.length === 0 && isOnboardingDone) {
        resize(380, 400);
    }
    if (data && isOnboardingDone) {
        resize(380, 450);
    }
    return (
        <React.Fragment>
            {/* <button onClick={openModal}>Open Modal</button> */}
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={_subtitle => (subtitle = _subtitle)} hidden></h2>
                <button
                    style={{
                        border: 'none',
                        color: '#fff',
                        cursor: 'pointer',
                        fontSize: '22px',
                        float: 'right',
                        padding: '0',
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        lineHeight: '0.8',
                        background: '#F48245',
                        position: 'relative',
                        right: '-5px',
                    }}
                    onClick={closeModal}
                >
                    &times;
                </button>
                <div className="text-holder" style={{padding: '15px 0px'}}>
                    <h3>Naming Convension Instructions</h3>
                    <p style={{whiteSpace: 'pre-line'}}>
                        Style Naming must use following naming convention brand/use/color
                    </p>
                    <p className="text-light">Example: brand1/primary.orange,</p>
                </div>
            </Modal>
            {isOnboardingDone ? (
                <ThemeSwicther
                    data={data}
                    onCreate={onCreate}
                    appliedTheme={appliedTheme}
                    handleApplyTheme={handleApplyTheme}
                    handleApplyTypeSelect={handleApplyTypeSelect}
                    isPopuphidden={applyThemePopupHidden}
                    getThemeList={getThemeList}
                    toggleModal={toggleModal}
                    currentSelectionType={applyType}
                />
            ) : (
                <OnBoadring handleOnboardingFinish={onBoardingDone} />
            )}
            <div className="footer_themeswitcher">
                <p>Created by mobileLIVE</p>
            </div>
        </React.Fragment>
    );
};

export default App;
