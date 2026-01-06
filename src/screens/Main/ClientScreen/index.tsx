import React from 'react';
import { View } from 'react-native';
import { AppText } from '@components/index';
import { useTheme } from '@providers/ThemeProvider';
import { styles } from './ClientScreen.styles';

const ClientScreen = () => {
    const theme = useTheme();

    return (
        <View style={styles.container}>
            <AppText size="FONT_14" color={theme.textSecondary}>
                Client management coming soon...
            </AppText>
        </View>
    );
};

export default ClientScreen;
