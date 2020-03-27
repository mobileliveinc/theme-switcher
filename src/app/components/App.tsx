import * as React from 'react';
import '../styles/ui.css';
import Apply from './Apply'


declare function require(path: string): any;

const App = ({}) => {
    const [appliedTheme,setAppliedTheme] = React.useState("")
    const [data, setData] = React.useState([])

    React.useEffect(() => {
        (async function() {
           await parent.postMessage({pluginMessage: {type: 'getCurrentTheme'}}, '*');
           getCreatedTheme()
        })()
    }, [])

    const getCreatedTheme = () => {        
        window.onmessage = (event) => {
            const { type, themeData } = event.data.pluginMessage;
            if (type === 'getTheme') {
                const {collectLocalColors, appliedTheme} = themeData
                setAppliedTheme(appliedTheme ? appliedTheme : "")
                setData(collectLocalColors && collectLocalColors.length > 0 ? collectLocalColors : [] )
            }
            if (type === 'delete-theme') {
                setData([])
           }
        }
    }
    const onCreate = React.useCallback(() => {
        parent.postMessage({pluginMessage: {type: 'create-theme'}},'*');
    }, []);

    const onDelete = React.useCallback(() => {
        parent.postMessage({pluginMessage: {type: 'remove-theme'}}, '*');
    }, []);

    const onClose = React.useCallback(() => {
        parent.postMessage({pluginMessage: {type: 'close-plugin'}}, '*');
    }, []);

    const handleApplyTheme = (value) => {
        parent.postMessage({pluginMessage: {type: 'apply-theme', themeName: value }}, '*');
    }

    React.useEffect(() => {
        // This is how we read messages sent from the plugin controller
        window.onmessage = (event) => {
            const { type } = event.data.pluginMessage;
            if (type === 'theme-created') {
                getCreatedTheme()
            }
        }
    }, []);

    const getThemeList = () => {
        const dataList = data ? [...new Set(data.map(item => item.theme))] : []
        return dataList
    }

    return (
        <div>
            <img src={require('../assets/logo.svg')} />
            <h2>Theme Creator</h2>
            <div className="wrapper">
                {
                    data && data.length > 0 &&  
                <button id="create" onClick={onDelete}>
                    Delete Current Themes
                </button>

                }
                <button id="create" onClick={onCreate}>
                    Create Theme with Local Colors
                </button>
            </div>
            {
                data && data.length > 0 ?  (
                    <Apply appliedTheme={appliedTheme} handleApply={handleApplyTheme} themeList={getThemeList()}/>
                )
                : <h1>First Create your Theme</h1>
            }
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default App;
