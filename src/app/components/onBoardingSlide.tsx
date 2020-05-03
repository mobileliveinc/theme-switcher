import * as React from 'react';
import Fade from 'react-reveal/Fade';
import '../styles/ui.css';

// declare function require(path: string): any;

const OnBoadringSlide = ({slide, revealFrom}) => {
    const {image, title, description} = slide && slide;
    return (
        <Fade left={revealFrom === 'left'} right={revealFrom === 'right'} spy={slide}>
            <div style={{backgroundColor: '#F1F1F1'}}>
                <img src={require(`../assets/${image}`)} width="50%" height="50%" />
            </div>
            <h1>{title}</h1>
            <p>{description}</p>
        </Fade>
    );
};

export default OnBoadringSlide;
