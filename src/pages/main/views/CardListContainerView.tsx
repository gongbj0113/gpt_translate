import { animated, useSpring } from '@react-spring/web';
import { useCardList } from '../../../hooks/card_list_provider';
import { observer } from 'mobx-react-lite';
import TranslationCardView from './TranslationCardView';
import useMeasure from 'react-use-measure';

import { styled } from 'styled-components';
import { TranslationCardState } from '../../../stores/translation_card/translation_card_store';

const CardHeight = 508;
const CardGap = 48;
const AddButtonSize = 68;

const StyledAddButton = styled.div`
    width: ${AddButtonSize}px;
    height: ${AddButtonSize}px;
    border-radius: 50%;
    flex-shrink: 0;

    border: 2px solid #ffffff80;
    background: #ffffff1a;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    svg {
        width: 32px;
        height: 32px;
    }

    transition:
        border 0.2s ease-in-out,
        background 0.2s ease-in-out,
        scale 0.2s ease-in-out;

    &:hover {
        border: 2px solid #ffffff;
        background: #ffffff2a;
    }

    &:active {
        border: 2px solid #ffffff;
        background: #ffffff3a;
        scale: 0.9;
    }
`;

function CardListContainerView() {
    const cardList = useCardList();
    const [ref, { height }] = useMeasure();

    const indexAnimation = useSpring({
        x: cardList.currentIndex,
        config: {
            tension: 200,
            friction: 20,
        },
    });

    let cardViewList: React.ReactNode[] = [];
    let indicatorViewList: React.ReactNode[] = [];

    for (let i = 0; i < cardList.translationCardStoreList.length; i++) {
        const card = cardList.translationCardStoreList[i];

        const posY = (i - cardList.currentIndex) * -(CardGap + CardHeight);
        const isVisible = posY >= -height && posY <= height;

        if (!isVisible) {
            continue;
        }

        cardViewList.push(
            <animated.div
                key={card.id}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: indexAnimation.x.to(
                        (x) =>
                            `translate(-50%, -50%) translateY(${
                                (i - x) * -(CardGap + CardHeight)
                            }px)`,
                    ),
                    opacity: indexAnimation.x.to(
                        (x) =>
                            0.2 +
                            0.8 * Math.min(1, Math.max(0, 1 - Math.abs(i - x))),
                    ),
                    scale: indexAnimation.x.to(
                        (x) =>
                            1 -
                            0.1 * Math.min(1, Math.max(0, 1 - Math.abs(i - x))),
                    ),
                }}
            >
                <TranslationCardView
                    translationCard={card}
                    width={1100}
                    height={508}
                />
            </animated.div>,
        );
    }

    for (let i = 0; i < cardList.translationCardStoreList.length; i++) {
        const card = cardList.translationCardStoreList[i];

        const posY = (i - cardList.currentIndex) * -(CardGap + CardHeight);
        const isVisible = posY >= -height * 3 && posY <= height * 3;

        if (!isVisible) {
            continue;
        }

        indicatorViewList.push(
            <animated.div
                key={card.id}
                style={{
                    position: 'absolute',
                    top: '50%',
                    right: 32,
                    width: 8,
                    height: indexAnimation.x.to((x) =>
                        Math.abs(i - x) <= 1
                            ? 8 +
                              24 * Math.min(1, Math.max(0, 1 - Math.abs(i - x)))
                            : 8,
                    ),
                    borderRadius: 4,
                    backgroundColor: '#fff',
                    transform: indexAnimation.x.to(
                        (x) =>
                            `translate(-50%, -50%) translateY(${
                                (i - x) * -(44 + 8)
                            }px)`,
                    ),
                    opacity: indexAnimation.x.to(
                        (x) =>
                            1 - Math.min(1, Math.max(0, Math.abs(i - x) / 5)),
                    ),
                }}
            />,
        );
    }

    const isAddButtonVisible =
        cardList.currentIndex ===
            cardList.translationCardStoreList.length - 1 &&
        cardList.translationCardStoreList[cardList.currentIndex].state !==
            TranslationCardState.Input;

    const addButtonAnimation = useSpring({
        opacity: isAddButtonVisible ? 1 : 0,
        transform: isAddButtonVisible
            ? 'translate(-50%, -50%) translateY(0px)'
            : `translate(-50%, -50%) translateY(-${CardHeight}px)`,

        scale: isAddButtonVisible ? 1 : -1,
        delay: isAddButtonVisible ? 100 : 0,
        config: {
            tension: 200,
            friction: 20,
        },
    });

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                flexShrink: 0,
            }}
            ref={ref}
        >
            {cardViewList}
            {indicatorViewList}
            <animated.div
                style={{
                    ...addButtonAnimation,
                    position: 'absolute',
                    left: '50%',
                    top:
                        height / 2 -
                        CardHeight / 2 -
                        CardGap -
                        AddButtonSize / 2,
                }}
            >
                <StyledAddButton
                    onClick={() => {
                        cardList.newCard();
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                    >
                        <path
                            d="M14.6665 17.3333H6.6665V14.6667H14.6665V6.66666H17.3332V14.6667H25.3332V17.3333H17.3332V25.3333H14.6665V17.3333Z"
                            fill="white"
                        />
                    </svg>
                </StyledAddButton>
            </animated.div>
        </div>
    );
}

export default observer(CardListContainerView);
