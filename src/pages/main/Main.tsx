import { styled } from 'styled-components';

import MainBackgroundLight from '../../commons/assets/img/main_background_light.png';
import CardListContainerView from './views/CardListContainerView';
import { useEffect, useRef } from 'react';
import { useCardList } from '../../hooks/card_list_provider';

const StyledBackground = styled.div`
    width: 100%;
    height: 100vh;

    background-image: url(${MainBackgroundLight});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: relative;
    overflow: hidden;
`;

function useScrollCardList() {
    const cardList = useCardList();

    const scrollEventAvailable = useRef(true);

    useEffect(() => {
        function handleScroll(event: WheelEvent) {
            if (!scrollEventAvailable.current) {
                return;
            }

            if (event.deltaY < -2) {
                cardList.scrollUp();
            } else if (event.deltaY > 2) {
                cardList.scrollDown();
            } else {
                return;
            }

            scrollEventAvailable.current = false;
            setTimeout(() => {
                scrollEventAvailable.current = true;
            }, 100);
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'ArrowUp') {
                cardList.scrollUp();
            } else if (event.key === 'ArrowDown') {
                cardList.scrollDown();
            }
        }

        window.addEventListener('wheel', handleScroll);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('wheel', handleScroll);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [cardList]);
}

function useEnterNewCard() {
    const cardList = useCardList();

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            // CMD + Enter or CTRL + Enter
            if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
                cardList.newCard();
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [cardList]);
}

function Main() {
    useScrollCardList();
    useEnterNewCard();

    return (
        <StyledBackground>
            <CardListContainerView />
        </StyledBackground>
    );
}

export default Main;
