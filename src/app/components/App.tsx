import * as React from 'react';
import '../styles/ui.css';
import Apply from './Apply'
import {database} from '../../firebase';

const themesRef = database.ref('theming');

declare function require(path: string): any;

const App = ({}) => {
    const [themeObj, setThemeObj] = React.useState({})
    const [themeName, setThemeName] = React.useState("")
    const [isApply, setIsApply] = React.useState(false)
    const [data, setData] = React.useState([])


    const textbox = React.useRef<HTMLInputElement>(undefined);

    const countRef = React.useCallback((element: HTMLInputElement) => {
        if (element) element.value = '5';
        textbox.current = element;
    }, []);

    const onCreate = React.useCallback(() => {
        parent.postMessage({pluginMessage: {type: 'create-rectangles', themeData: themeName}}, '*');
    }, [themeName]);

    const onCancel = React.useCallback(() => {
        parent.postMessage({pluginMessage: {type: 'cancel'}}, '*');
    }, []);

    const handleApply = (val) => {
        parent.postMessage({pluginMessage: {type: 'apply-theme', data, themeName: val }}, '*');
    }

    React.useEffect(() => {
        // This is how we read messages sent from the plugin controller
        window.onmessage = (event) => {
            const { type, message } = event.data.pluginMessage;
            if (type === 'create-rectangles') {

                console.log(`Figma Says: ${message}`);
            };

            if (type === 'addNewTheme') {
                console.log(`get themmeeee ${event.data.pluginMessage.themeData}`)
                setThemeObj({...themeObj, [themeName || 'ahmad']: event.data.pluginMessage.themeData})
                themesRef.once('value').then((snapshot) => {
                    const current = snapshot.val()
                    console.log('current', current)
                    if (current && Object.keys(current).length > 0) {
                        const news = current.theme.concat(event.data.pluginMessage.themeData)
                        console.log('newsssss', news)
                        themesRef.set({theme: news})
                    } else {
                        console.log('me thinkkkkkkkkkkk')
                        themesRef.set({theme: event.data.pluginMessage.themeData})

                    }

                })
                setIsApply(true)
                
            }
        }
    }, [themeName]);

    React.useEffect(() => {
        themesRef.once('value').then(function(snapshot) {
            const get = snapshot.val()
            if (get && Object.keys(get).length > 0){
            setData(get.theme)
            setIsApply(true)
            }
        })
    }, [themeObj])

    const getThemeList = () => {
        const dataList = data ? [...new Set(data.map(item => item.theme))] : []
        return dataList
    }

    return (
        <div>
            <img src={require('../assets/logo.svg')} />
            <h2>Theme Creator</h2>
            <button id="create" onClick={onCreate}>
                Create Theme with Local Colors
            </button>
            <button onClick={onCancel}>Cancel</button>
            {
                isApply ?  
                (
                    <Apply handleApply={handleApply} themeList={getThemeList()}/>
                )
                : <h1>First Create your Theme</h1>
            }
        </div>
    );
};

export default App;
