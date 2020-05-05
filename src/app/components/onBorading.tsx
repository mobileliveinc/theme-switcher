import * as React from 'react';
import OnBoadringSlide from './onBoardingSlide';
import '../styles/ui.scss';

// declare function require(path: string): any;

const OnBoadring = ({handleOnboardingFinish}) => {
    const slides = [
        {
            image: 'themeSwitcherScreen1.png',
            title: 'Welcome To Theme Creator',
            description:
                'Theme creator let’s you quickly create color themes from your published Figma styles. Theme creator does this by matching styles with the same names across themes.',
        },
        {
            image: 'themeSwitcherScreen2.png',
            title: 'Start Creating Themes',
            description: 'Create Local Styles, styles must use name/ in in order for themes to work',
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
