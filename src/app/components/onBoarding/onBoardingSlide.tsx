import * as React from 'react';
import Fade from 'react-reveal/Fade';
import '../../styles/ui.scss';

// declare function require(path: string): any;

const getSplitDescription = (description: string) => {
    let tokens = description.split(':');
    return (
        <React.Fragment>
            <p style={{display: 'inline'}}>{`${tokens[0]}: `}</p>
            <b>{tokens[1]}</b>
        </React.Fragment>
    );
};

const OnBoadringSlide = ({slide, revealFrom, skipIntro}) => {
    const {image, title, description, note, splitDescription} = slide && slide;
    return (
        <Fade left={revealFrom === 'left'} right={revealFrom === 'right'} spy={slide}>
            <div style={{backgroundColor: '#F1F1F1', height: '221px', textAlign: 'center'}}>
                <img src={require(`../../assets/${image}`)} max-width="50%" max-height="50%" />
                <a className="skip-inro-link" onClick={() => skipIntro()}>
                    Skip Instructions
                </a>
            </div>
            <div className="text-holder" style={{padding: '32px'}}>
                <h3>{title}</h3>
                {splitDescription ? (
                    getSplitDescription(description)
                ) : (
                    <p style={{whiteSpace: 'pre-line'}}>{description}</p>
                )}
                {note && <p className="text-light">{note}</p>}
            </div>
        </Fade>
    );
};

export default OnBoadringSlide;
