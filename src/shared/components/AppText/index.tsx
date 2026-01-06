import React, { ReactNode } from 'react';
import { Text as RNText, TextProps, TextStyle } from 'react-native';
import { fontFamily, fontSize } from '@theme/fonts';
import { useTheme } from '@providers/ThemeProvider';

interface AppTextProps extends TextProps {
    children: ReactNode;
    color?: string;
    regular?: boolean;
    medium?: boolean;
    semiBold?: boolean;
    bold?: boolean;
    size?: keyof typeof fontSize;
}

const AppText: React.FC<AppTextProps> = ({
    children,
    color,
    regular,
    medium,
    semiBold,
    bold,
    size = 'FONT_14',
    style,
    ...props
}) => {
    const theme = useTheme();

    let font = fontFamily.REGULAR;
    if (bold) font = fontFamily.BOLD;
    else if (semiBold) font = fontFamily.SEMIBOLD;
    else if (medium) font = fontFamily.MEDIUM;

    const textStyle: TextStyle = {
        fontFamily: font,
        fontSize: fontSize[size],
        color: color || theme.text,
    };

    return (
        <RNText {...props} style={[textStyle, style]}>
            {children}
        </RNText>
    );
};

export default AppText;
