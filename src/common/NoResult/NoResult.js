import React from 'react';
import Lottie from 'lottie-react';
import no_result from '../../assets/animations/NoResult.json';
import styles from './NoResult.module.scss';

const NoResult = ({isHide}) => {

    return (
        <div className={`${styles.animation_lotie} ${isHide ? styles.hide : ''}`}>
            <Lottie
                animationData={no_result}
                loop={true}
                autoplay={true}
            />
        </div>
    );
};

export default NoResult;