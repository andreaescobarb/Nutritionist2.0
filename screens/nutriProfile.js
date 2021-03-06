import React from 'react';
import { Image, StyleSheet, StatusBar, Dimensions, Platform, TextInput } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const { height, width } = Dimensions.get('screen');

export default class nutriProfile extends React.Component {
    render() {
        const { navigation } = this.props;

        return (
            <Block flex style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Block flex center>
                    <Image
                        source={require('../assets/images/perfil.jpeg')}
                        style={{ width: 350, height: 350 }}
                    />
                </Block>
                <Block flex space="between" style={styles.padded}>
                    <Block flex space="around" style={{ zIndex: 2 }}>
                        <Block>
                            <Block>
                                <Text h5 color="white">About</Text>
                            </Block>
                            <Block row>
                                <Text h5 color="white">Lucia Escobar</Text>
                            </Block>
                            <Text size={16} color='rgba(255,255,255,0.6)'>
                                Cambia tu estilo de vida
              </Text>
                        </Block>
                    </Block>
                </Block>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.COLORS.TWITTER,
        height: responsiveHeight(60),
    },
    padded: {
        paddingHorizontal: theme.SIZES.BASE * 2,
        position: 'relative',
        bottom: theme.SIZES.BASE,
    },
    button: {
        width: width - theme.SIZES.BASE * 4,
        height: theme.SIZES.BASE * 3,
        shadowRadius: 0,
        shadowOpacity: 0,
    },
    Text: {
        fontSize: responsiveFontSize(2)
    },
});
