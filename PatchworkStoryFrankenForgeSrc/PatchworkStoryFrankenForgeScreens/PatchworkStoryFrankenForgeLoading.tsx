import React, {
    useRef as usePatchRef,
    useLayoutEffect as usePatchLayoutEff,
} from 'react';
import {
    Animated as PatchAnim,
    ImageBackground as PatchBg,
    Image as PatchImg,
    View as PatchBox,
    Dimensions as PatchDims,
    Platform,
} from 'react-native';
const ONBOARD_KEY_PATCHWORK = 'patchwork_onboard';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation as usePatchNav } from '@react-navigation/native';

const PatchworkStoryFrankenForgeLoading: React.FC = () => {
    const navigation = usePatchNav();
    const patchDims = PatchDims.get('window');

    const animScale = usePatchRef(new PatchAnim.Value(0.3)).current;

    // Анімації для старту
    const animTranslateY = usePatchRef(new PatchAnim.Value(0)).current;
    const animOpacity = usePatchRef(new PatchAnim.Value(1)).current;

    usePatchLayoutEff(() => {
        let shouldShowOnboarding = false;
        let shouldShowReg = false;

        const bootstrap = async () => {
            try {
                const [onboardFlag, storedUser] = await Promise.all([
                    AsyncStorage.getItem(ONBOARD_KEY_PATCHWORK),
                    AsyncStorage.getItem('patchworkUser'),
                ]);

                if (!onboardFlag && !storedUser) {
                    shouldShowOnboarding = true;
                    await AsyncStorage.setItem(ONBOARD_KEY_PATCHWORK, 'true');
                } else if (onboardFlag && !storedUser) {
                    shouldShowReg = true;
                }
            } catch (err) {
                if (__DEV__) console.warn('PatchworkStoryFrankenForgeLoading init error:', err);
            }

            setTimeout(() => {
                navigation.replace(
                    shouldShowOnboarding
                        ? 'PatchworkStoryFrankenForgeOnboarding'
                        : 'PatchworkStoryFrankenForgeReplPgs'
                );
            }, 3018);
        };

        bootstrap();

        // Анімація руху
        PatchAnim.loop(
            PatchAnim.sequence([
                PatchAnim.timing(animTranslateY, {
                    toValue: -20,
                    duration: 1200,
                    useNativeDriver: true,
                }),
                PatchAnim.timing(animTranslateY, {
                    toValue: 20,
                    duration: 1200,
                    useNativeDriver: true,
                }),
                PatchAnim.timing(animTranslateY, {
                    toValue: 0,
                    duration: 1200,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Анімація блимання
        PatchAnim.loop(
            PatchAnim.sequence([
                PatchAnim.timing(animOpacity, {
                    toValue: 0.5,
                    duration: 400,
                    useNativeDriver: true,
                }),
                PatchAnim.timing(animOpacity, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [navigation, animScale, animTranslateY, animOpacity]);

    return (
        <PatchBox style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
        }}
        >
            <PatchBg
                source={require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/patchworkLoadApp.png')}
                style={{
                    alignSelf: 'center',
                    zIndex: -1,
                    width: patchDims.width,
                    height: patchDims.height,
                    position: 'absolute',
                }}
                resizeMode="cover"
            />
            <PatchAnim.View
                style={{
                    opacity: animOpacity,
                    transform: [{ translateY: animTranslateY }],
                }}
            >
                <PatchImg
                    source={Platform.OS === 'android' 
                        ? require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/patchworkCrownText.png')
                        : require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/patchworkLoadText.png')}
                    style={{
                        width: patchDims.width * 0.8,
                        height: patchDims.width * 0.8,
                    }}
                    resizeMode="contain"
                />
            </PatchAnim.View>
        </PatchBox>
    );
};

export default PatchworkStoryFrankenForgeLoading;