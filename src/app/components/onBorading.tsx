import * as React from 'react';
import OnBoadringSlide from './onBoardingSlide';
import '../styles/ui.css';

// declare function require(path: string): any;

const OnBoadring = ({handleOnboardingFinish}) => {
    const slides = [
        {
            image: 'arrows.png',
            title: 'Welcome To Theme Creator',
            description:
                'Theme creator let’s you quickly create color themes from your published Figma styles. Theme creator does this by matching styles with the same names across themes.',
        },
        {
            image: 'photoPreview.png',
            title: 'Start Creating Themes',
            description: 'Create Local Styles, styles must use name/ in in order for themes to work',
        },
    ];
    const sliderButtonStyles = {
        active: {
            backgroundColor: '#18A0FB',
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
            <OnBoadringSlide slide={slides[index]} revealFrom={revealFrom} />
            <button
                style={{marginTop: '10%'}}
                onClick={() => handleOnboardingFinish()}
                hidden={index !== slides.length - 1}
            >
                Create Theme
            </button>
            <br />
            {getButton(slides)}
            <br />
        </div>
    );
};

export default OnBoadring;
