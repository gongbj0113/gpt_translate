import { styled } from 'styled-components';

import IntroBackgroundLight from '../../commons/assets/img/intro_background_light.png';
import { useEffect } from 'react';
import { useApp } from '../../hooks/app_provider';

const StyledBackground = styled.div`
    width: 100%;
    height: 100vh;

    background-image: url(${IntroBackgroundLight});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    color: #fff;
    font-family: Lexend;
    font-size: 100px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

function Loading() {
    const app = useApp();

    useEffect(() => {
        app.initialize();
    }, [app]);

    useEffect(() => {
        const timer = setTimeout(() => {
            app.finishLoading();
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [app]);

    return <StyledBackground>GPT Translate</StyledBackground>;
}

export default Loading;
