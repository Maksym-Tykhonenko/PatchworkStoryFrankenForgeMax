import {
    TouchableOpacity as PatchPress,
    Dimensions as PatchDims,
    Linking,
    View as PatchBox,
    Text as PatchText,
    Image as PatchImg,
    Share,
    SafeAreaView as PatchSafe,
    Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const switchOnIcon = require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/switchOn.png');
import React, { useState as useForgeState, useEffect as useForgeEffect } from 'react';
import { fonts as patchFonts } from '../fonts';
const switchOffIcon = require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/switchOff.png');

const ForgeSwitchRow = ({ checked, onToggle, label }: { checked: boolean; onToggle: () => void; label: string }) => {
    const { width: vw, height: vh } = PatchDims.get('window');
    return (
        <PatchBox
            style={{
                alignSelf: 'center',
                alignItems: 'center',
                backgroundColor: '#1E0993',
                borderRadius: vw * 0.1,
                paddingHorizontal: vw * 0.06,
                paddingVertical: vh * 0.018,
                height: vh * 0.08,
                width: vw * 0.85,
                justifyContent: 'space-between',
                marginVertical: vh * 0.008,
                flexDirection: 'row',
            }}
        >
            <PatchText
                style={{
                    color: '#fff',
                    fontSize: vw * 0.052,
                    fontFamily: patchFonts.patchworkPoppinsMedium,
                }}
            >
                {label}
            </PatchText>
            <PatchPress onPress={onToggle}>
                <PatchImg
                    source={checked ? switchOnIcon : switchOffIcon}
                    style={{ width: vw * 0.18, height: vh * 0.055, resizeMode: 'contain' }}
                />
            </PatchPress>
        </PatchBox>
    );
};

const ForgeActionRow = ({ label, icon, onPress }: { label: string; icon?: any; onPress?: () => void }) => {
    const { width: vw, height: vh } = PatchDims.get('window');
    return (
        <PatchPress
            onPress={onPress}
            style={{
                justifyContent: 'space-between',
                backgroundColor: '#1E0993',
                borderRadius: vw * 0.1,
                width: vw * 0.85,
                height: vh * 0.08,
                marginVertical: vh * 0.008,
                paddingHorizontal: vw * 0.06,
                flexDirection: 'row',
                alignSelf: 'center',
                alignItems: 'center',
            }}
        >
            <PatchText
                style={{
                    color: '#fff',
                    fontSize: vw * 0.052,
                    fontFamily: patchFonts.patchworkPoppinsMedium,
                }}
            >
                {label}
            </PatchText>
            {icon && <PatchImg source={icon} style={{ width: vw * 0.07, height: vw * 0.07, resizeMode: 'contain' }} />}
        </PatchPress>
    );
};

interface PatchworkStoryFrankenForgeSettingsProps {
    musicEnabled: boolean;
    setMusicEnabled: (enabled: boolean) => void;
}

const PatchworkStoryFrankenForgeSettings: React.FC<PatchworkStoryFrankenForgeSettingsProps> = ({ musicEnabled, setMusicEnabled }) => {
    const { width: vw, height: vh } = PatchDims.get('window');
    const [alertsEnabled, setAlertsEnabled] = useForgeState(true);

    useForgeEffect(() => {
        (async () => {
            const notif = await AsyncStorage.getItem('notifOn');
            if (notif !== null) setAlertsEnabled(notif === 'true');
        })();
    }, []);

    const toggleMusic = async () => {
        const updated = !musicEnabled;
        setMusicEnabled(updated);
        await AsyncStorage.setItem('musicOn', updated.toString());
    };

    const toggleAlerts = async () => {
        const updated = !alertsEnabled;
        setAlertsEnabled(updated);
        await AsyncStorage.setItem('notifOn', updated.toString());
    };

    const handleShare = () => {
        Share.share({
            message: `Join ${Platform.OS === 'android' ? 'Patchwork Story: Franken\'s Crown' : 'Patchwork Story Franken Forge'} to create and share your own unique stories!`,
        });
    };

    return (
        <PatchSafe style={{ flex: 1 }}>
            <PatchBox style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingTop: vh * 0.04 }}>
                <PatchText
                    style={{
                        marginBottom: vh * 0.03,
                        fontSize: vw * 0.072,
                        fontFamily: patchFonts.patchworkMochiyPopOne,
                        color: '#fff',
                        textAlign: 'center',
                    }}
                >
                    Settings
                </PatchText>

                <ForgeSwitchRow label="Music" checked={musicEnabled} onToggle={toggleMusic} />
                <ForgeSwitchRow label="Notifications" checked={alertsEnabled} onToggle={toggleAlerts} />

                <ForgeActionRow
                    label="Share the app"
                    icon={require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/shareIcon.png')}
                    onPress={handleShare}
                />

                <ForgeActionRow
                    label="Terms of Use"
                    onPress={() =>
                        Linking.openURL(
                            'https://www.freeprivacypolicy.com/live/63372252-97da-47a0-ad24-f8f894d77cb8'
                        )
                    }
                />
            </PatchBox>
        </PatchSafe>
    );
};

export default PatchworkStoryFrankenForgeSettings;
