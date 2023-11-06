import { DEFAULT_DESKTOP_PADDING } from '../constants';

interface ContentAreaProps {
    children: React.ReactNode;
    width?: number;
    shrink?: boolean;
    padding?: number;
    style?: React.CSSProperties;
}

function ContentArea({
    children,
    width,
    shrink = false,
    padding = DEFAULT_DESKTOP_PADDING,
    style,
}: ContentAreaProps) {
    return (
        <div
            style={{
                width: '100%',
                minWidth: shrink || !width ? '0px' : `${width + padding * 2}px`,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                paddingLeft: `${padding}px`,
                paddingRight: `${padding}px`,
                boxSizing: 'border-box',
                flexShrink: 0,
            }}
        >
            <div
                style={{
                    ...style,
                    flexBasis: width ? `${width}px` : '100%',
                    flexGrow: width ? 0 : 1,
                    flexShrink: shrink || !width ? 1 : 0,
                    minWidth: '0px',
                    position: 'relative',
                    boxSizing: 'border-box',
                }}
            >
                {children}
            </div>
        </div>
    );
}

export default ContentArea;
