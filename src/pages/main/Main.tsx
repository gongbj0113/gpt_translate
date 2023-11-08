import { styled } from 'styled-components';

import { useApp } from '../../hooks/app_provider';
import TranslationCardView from './views/TranslationCardView';

import MainBackgroundLight from '../../commons/assets/img/main_background_light.png';

const StyledBackground = styled.div`
    width: 100%;
    height: 100vh;

    background-image: url(${MainBackgroundLight});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    overflow-y: scroll;
`;

function Main() {
    const app = useApp();

    return (
        <StyledBackground>
            {app.cardListStore.translationCardStoreList.map(
                (translationCardStore) => (
                    <TranslationCardView
                        translationCard={translationCardStore}
                        width={1100}
                        height={508}
                    />
                ),
            )}
        </StyledBackground>
    );
}

export default Main;
