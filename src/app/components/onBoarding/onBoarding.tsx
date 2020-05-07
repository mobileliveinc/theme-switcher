import * as React from 'react';
import OnBoadringSlide from './onBoardingSlide';
import './onBoarding.scss';

// declare function require(path: string): any;

const OnBoadring = ({handleOnboardingFinish}) => {
    const slides = [
        {
            image: 'themeSwitcherScreen1.png',
            title: 'Welcome To Theme Switcher',
            description: `Quickly create and switch themes from multi-brand stylesheets and make your workflow is easy 

            Theme Switcher allows you to :
            
             🔁Switch Multibrand Stylesheets
             🔄Sync from Local Style
             ✅ Apply Color Themes
            `,
        },
        {
            image: 'themeSwitcherScreen2.png',
            title: 'Start Creating Themes',
            description: `How does it work? 🤔

            1. Create new Figma file and then create local styles in the file using + to add new colour style
            
            2. Name your style using theme/use/variation naming convention
            
            3. Select Page or Frame to apply theme.
            `,
        },
    ];
    const sliderButtonStyles = {
        active: {
            backgroundColor: '#F48245',
        },
        inActive: {
            backgroundColor: '#fff',
        },
    };
    const [index, setIndex] = React.useState(0);
    const [revealFrom, setRevealFrom] = React.useState('left');

    const getNextIndex = newIndex => {
        if (newIndex > index) {
            setIndex(newIndex);
            setRevealFrom('left');
        } else {
            setIndex(newIndex);
            setRevealFrom('right');
        }
    };

    const getButton = slides => {
        return slides.map((slide, slideIndex) => (
            <button
                className="slider-button"
                style={slideIndex === index ? sliderButtonStyles.active : sliderButtonStyles.inActive}
                key={slide.title}
                onClick={() => getNextIndex(slideIndex)}
            ></button>
        ));
    };

    return (
        <div>
            <OnBoadringSlide slide={slides[index]} revealFrom={revealFrom} skipIntro={handleOnboardingFinish} />
            <div style={{textAlign: 'center'}}>
                <button
                    style={{marginTop: '50px'}}
                    className="primary-button"
                    onClick={index === slides.length - 1 ? () => handleOnboardingFinish() : () => setIndex(index + 1)}
                    // hidden={index !== slides.length - 1}
                >
                    {index === slides.length - 1 ? 'Create Theme' : 'Next'}
                </button>
            </div>
            {/* <br /> */}
            <div style={{textAlign: 'center'}}>{getButton(slides)}</div>
            {/* <br /> */}
        </div>
    );
};

export default OnBoadring;
