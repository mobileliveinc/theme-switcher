import * as React from 'react';
import OnBoadringSlide from './onBoardingSlide';
import {slides} from './slideData';
import './onBoarding.scss';

// declare function require(path: string): any;

const OnBoadring = ({handleOnboardingFinish}) => {
    const sliderButtonStyles = {
        active: {
            backgroundColor: '#F48245',
        },
        inActive: {
            backgroundColor: 'rgba(244, 130, 69, 20%)',
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
            <div className="btn_slides" style={{textAlign: 'center'}}>
                <button
                    className="primary-button"
                    onClick={index === slides.length - 1 ? () => handleOnboardingFinish() : () => setIndex(index + 1)}
                >
                    {index === slides.length - 1 ? 'Create Theme' : 'Next'}
                </button>
                <div className="slideDots" style={{textAlign: 'center'}}>
                    {getButton(slides)}
                </div>
            </div>
        </div>
    );
};

export default OnBoadring;
