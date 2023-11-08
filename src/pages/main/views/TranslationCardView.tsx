import { styled } from 'styled-components';

import TranslationCardStore, {
    TranslationCardState,
} from '../../../stores/translation_card/translation_card_store';
import { animated, useSpring } from '@react-spring/web';
import { observer } from 'mobx-react-lite';
import { useCardList } from '../../../hooks/card_list_provider';
import { useRef } from 'react';

interface TranslationCardViewProps {
    translationCard: TranslationCardStore;
    width: number;
    height: number;
    onRemove?: () => void;
}

const StyledCard = styled.div<{
    width: number;
    height: number;
}>`
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    flex-shrink: 0;

    position: relative;
`;

const StyledBackgroundLayer = styled.div`
    border-radius: 36px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(9px);
    -webkit-backdrop-filter: blur(9px);
    box-shadow: 0px 4px 48px rgba(0, 0, 0, 0.18);

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
`;

const StyledTranslateButton = styled(animated.div)`
    background: linear-gradient(180deg, #4394f4 0%, #436af4 100%);
    box-shadow: 0px 4px 14px rgba(18, 46, 130, 0.25);

    color: #fff;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    border-radius: 50%;

    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    justify-content: center;
    align-items: center;

    box-sizing: border-box;
`;

const StyledWhiteBackgroundLayer = styled(animated.div)`
    border-radius: 36px;
    background: #fff;

    height: 100%;

    position: absolute;
    top: 0;
    height: 100%;
`;

const StyledLeftContentPannel = styled(animated.div)`
    position: absolute;
    top: 0;
    left: 0;

    height: 100%;
    box-sizing: border-box;

    padding: 48px;

    border-radius: 36px;

    textarea {
        width: 100%;
        height: 100%;

        border: none;
        outline: none;

        font-family: Pretendard;
        font-size: 36px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;

        background: transparent;
        resize: none;

        scrollbar-width: none;
        -ms-overflow-style: none;
        &::-webkit-scrollbar {
            width: 0px;
            background: transparent; /* make scrollbar invisible */
        }

        &::placeholder {
            color: #d9d9d9;
        }
    }
`;

const StyledRightContentPannel = styled(animated.div)`
    position: absolute;
    top: 0;
    right: 0;

    height: 100%;
    box-sizing: border-box;

    padding: 48px;

    border-radius: 36px;

    color: #000;
    font-family: Pretendard;
    font-size: 36px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    div {
        width: 100%;
        height: 100%;

        overflow-y: auto;
        overflow-x: hidden;

        scrollbar-width: none;
        -ms-overflow-style: none;
        &::-webkit-scrollbar {
            width: 0px;
            background: transparent; /* make scrollbar invisible */
        }
    }
`;

const LargePannelRatio = 0.7;
const LoadingPannelRatio = 0.3;
const SmallTranslateButtonSize = 92;
const LargeTranslateButtonSize = 146;

function TranslationCardView({
    translationCard,
    width,
    height,
}: TranslationCardViewProps) {
    const isFirst = useRef(true);

    const LeftContentPannel = useSpring({
        width: `${(() => {
            switch (translationCard.state) {
                case TranslationCardState.Input:
                    return width * LargePannelRatio;
                case TranslationCardState.Loading:
                    return (width * (1 - LoadingPannelRatio)) / 2;
                default:
                    return width * (1 - LargePannelRatio);
            }
        })()}px`,
    });

    const RightContentPannel = useSpring({
        width: `${(() => {
            switch (translationCard.state) {
                case TranslationCardState.Input:
                    return width * (1 - LargePannelRatio);
                case TranslationCardState.Loading:
                    return (width * (1 - LoadingPannelRatio)) / 2;
                default:
                    return width * LargePannelRatio;
            }
        })()}px`,
    });

    const TranslateButton = useSpring({
        left: `${(() => {
            switch (translationCard.state) {
                case TranslationCardState.Loading:
                    return width / 2;
                case TranslationCardState.Success:
                    return width * (1 - LargePannelRatio);
                default:
                    return width * LargePannelRatio;
            }
        })()}px`,
        opacity: `${(() => {
            switch (translationCard.state) {
                case TranslationCardState.Loading:
                case TranslationCardState.Input:
                    return 1;
                default:
                    return 0;
            }
        })()}`,

        width: `${(() => {
            switch (translationCard.state) {
                case TranslationCardState.Loading:
                    return LargeTranslateButtonSize;
                default:
                    return SmallTranslateButtonSize;
            }
        })()}px`,
        height: `${(() => {
            switch (translationCard.state) {
                case TranslationCardState.Loading:
                    return LargeTranslateButtonSize;
                default:
                    return SmallTranslateButtonSize;
            }
        })()}px`,
    });

    const WhiteBackground = useSpring({
        left: `${(() => {
            switch (translationCard.state) {
                case TranslationCardState.Loading:
                    return width / 2 - (width * LoadingPannelRatio) / 2;
                case TranslationCardState.Input:
                    return 0;
                case TranslationCardState.Success:
                case TranslationCardState.Error:
                    return width * (1 - LargePannelRatio);
                default:
                    return 0;
            }
        })()}px`,

        width: `${(() => {
            switch (translationCard.state) {
                case TranslationCardState.Loading:
                    return width * LoadingPannelRatio;
                default:
                    return width * LargePannelRatio;
            }
        })()}px`,
        boxShadow: `${(() => {
            switch (translationCard.state) {
                case TranslationCardState.Success:
                case TranslationCardState.Error:
                    return '-4px 0px 14px 0px rgba(0, 0, 0, 0.04)';
                case TranslationCardState.Input:
                    return '4px 0px 14px 0px rgba(0, 0, 0, 0.04)';
                default:
                    return '0px 0px 14px 0px rgba(0, 0, 0, 0.04)';
            }
        })()}`,
    });

    const RightPannelContent = useSpring({
        opacity: `${(() => {
            switch (translationCard.state) {
                case TranslationCardState.Success:
                case TranslationCardState.Error:
                    return 1;
                default:
                    return 0;
            }
        })()}`,
        delay: 400,
    });

    return (
        <StyledCard width={width} height={height}>
            <StyledBackgroundLayer />
            <StyledWhiteBackgroundLayer style={{ ...WhiteBackground }} />
            <StyledLeftContentPannel style={LeftContentPannel}>
                <textarea
                    ref={(ref) => {
                        if (
                            translationCard.state ===
                                TranslationCardState.Input &&
                            isFirst.current &&
                            ref
                        ) {
                            ref?.focus();
                        }
                        isFirst.current = false;
                    }}
                    onChange={(e) =>
                        translationCard.setInputText(e.target.value)
                    }
                    onKeyDown={(e) => {
                        // meta + enter, ctrl + enter
                        if (
                            (e.metaKey || e.ctrlKey) &&
                            e.keyCode === 13 &&
                            translationCard.state === TranslationCardState.Input
                        ) {
                            translationCard.translate();
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }}
                    placeholder="ENTER SOMETHING..."
                    value={translationCard.inputText}
                    readOnly={
                        translationCard.state !== TranslationCardState.Input
                    }
                />
            </StyledLeftContentPannel>
            <StyledRightContentPannel style={RightContentPannel}>
                <animated.div style={RightPannelContent}>
                    {translationCard.outputText}
                </animated.div>
            </StyledRightContentPannel>
            <StyledTranslateButton
                style={TranslateButton}
                onClick={() => {
                    if (
                        translationCard.state === TranslationCardState.Input &&
                        translationCard.inputText.trim().length > 0
                    ) {
                        translationCard.translate();
                    }
                }}
            >
                {translationCard.targetLanguage}
            </StyledTranslateButton>
        </StyledCard>
    );
}

export default observer(TranslationCardView);
