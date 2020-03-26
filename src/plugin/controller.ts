figma.showUI(__html__);
let collectLocalColors = []
let currenThemeList = []
let getSelectedTheme = ""

figma.ui.onmessage = (msg: { type: string; themeData: any; count: any; themeName: string; data: any; }) => {
    if (msg.type === 'create-rectangles') {
        getLocalPaintsArray('color', msg.themeData)
        figma.ui.postMessage({
            type: 'create-rectangles',
            message: `Created ${msg.count} Rectangles`,
        });
    }
    if (msg.type === 'apply-theme') {
        getSelectedTheme = msg.themeName
        applyTheme('selection', msg.data, msg.themeName)
        figma.ui.postMessage({
            type: 'apply-theme',
            message: `apply-theme Theme`,
        });
    }
};

function findMatchInSelectedTheme(styleKey, data) {
    // this gets item in the array which matches the current style applied
    const currentStyle = data.find((style: { key: any; }) => style.key === styleKey);
    
    // if we find a matching style execute this
    if (currentStyle) {

        // this gets the name of the current style
        // we need the name of the current style so we can search the jsonbin array
        // for matches with the selected theme
        const name = currentStyle.name;
        const matchedStyle = data.find((style: { name: any; theme: string; }) => style.name === name && style.theme === getSelectedTheme);
        if (matchedStyle) {
            // if we find a match in the selected theme, we will return the style key
            // so that we can import the style into the doc
            return matchedStyle;
        }
    }
}

function getLocalPaintsArray(types: string, themeName: any) {
    const localStyles = figma.getLocalPaintStyles()
    console.log('locallll')
    if (types === 'color') {
        if (localStyles) {
            localStyles.forEach(({key, id, type, name}) => {
                const style = {
                    key,
                    theme: 'default',
                    id,
                    type,
                    name,
                }
                if (name.includes('/')) {
                const [ themes , colorName ] = name.split('/')
                style.theme = themes
                style.name = colorName
                }
        
                if (style.name && style.key && style.theme && style.type) {
                    collectLocalColors.push(style);
                } else {
                    figma.notify('Error adding theme');
                    throw new Error("Error adding theme");
                }
            });
        } else {
            figma.notify('There are no color styles in the document');
        }
    }
    figma.ui.postMessage({
        type: 'addNewTheme',
        themeData: collectLocalColors,
    });
    console.log('getttttttttttt', collectLocalColors)
  }

function applyColor(node: { children: any[]; type: string; backgroundStyleId: string; fillStyleId: string; strokeStyleId: string; }, data: any) {
    console.log('nodeeee type', node.type)

    // iterate through children if the node has them
    if (node.children) {
        node.children.forEach((child: any) => {
            applyColor(child, data);
        })
    }

    // tree of node 

    // handle background fills
    if (node.type === 'COMPONENT' || 'INSTANCE' || 'FRAME' || 'GROUP') {
 
        if (node.backgroundStyleId) {
            // tslint:disable-next-line:only-arrow-functions
            (function() {
                const style = figma.getStyleById(node.backgroundStyleId) as PaintStyle;
                if (style.key) {
                    const newStyleKey = findMatchInSelectedTheme(style.key, data);
                    if (newStyleKey) {
                        node.backgroundStyleId = newStyleKey.id;
                    }
                }
            })()
        }
    }

    // handle fills + strokes
    // tslint:disable-next-line:max-line-length
    if (node.type === 'RECTANGLE' || 'POLYGON' || 'ELLIPSE' || 'STAR' || 'TEXT' || 'VECTOR' || 'BOOLEAN_OPERATION' || 'LINE') {

        // fills
        if (node.fillStyleId && typeof node.fillStyleId === 'string') {
            // tslint:disable-next-line:only-arrow-functions
            (function() {

                const style = figma.getStyleById(node.fillStyleId) as PaintStyle;
                if (style.key) {
                    const newStyleKey = findMatchInSelectedTheme(style.key, data);
                    if (newStyleKey) {
                            if (newStyleKey) {
                                node.fillStyleId = newStyleKey.id;
                            }
                    }
                }
            })()
        }
        // strokes
        if (node.strokeStyleId) {

            (function() {

                const style = figma.getStyleById(node.strokeStyleId) as PaintStyle;
                if (style.key) {
                    const newStyleKey = findMatchInSelectedTheme(style.key, data);
                    if (newStyleKey) {
                        node.strokeStyleId = newStyleKey.id;
                    }
                }
            })()
        }
    }
}

function applyTheme(applyTo: string, data: any[], themeName: any) {
    let nodes: any[] | readonly SceneNode[];
    if (applyTo === 'selection') {
        if (figma.currentPage.selection) {
            nodes = figma.currentPage.selection;
        } else {
            console.log('Please make a selection')
            figma.notify('Please make a selection');
        }
    } else {
        if (figma.currentPage.children) {
            nodes = figma.currentPage.children;
        } else {
            figma.notify('Please make a selection');
        }
    }
    if (nodes) {
        figma.notify('Applying theme...', {timeout: 1000 });
        const colorStyles = [...new Set(data.map((style) => style.theme === themeName && style.type === 'PAINT'))];
        if (colorStyles) {
            nodes.forEach((node: any) => {
                applyColor(node, data);
            });
        }
    }}
