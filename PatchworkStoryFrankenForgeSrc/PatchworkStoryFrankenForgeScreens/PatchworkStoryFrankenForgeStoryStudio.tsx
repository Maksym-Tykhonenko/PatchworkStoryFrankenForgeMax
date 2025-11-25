import React, { useState as useForgeState, useEffect as useForgeEffect } from 'react';
import {
    TouchableOpacity as StudioPress,
    SafeAreaView as StudioSafe,
    Alert,
    Text as StudioText,
    Image as StudioImg,
    Dimensions as StudioDims,
    ImageBackground as StudioBg,
    ScrollView as StudioScroll,
    View as StudioBox,
    Platform,
} from 'react-native';
import PatchworkStoryFrankenForgeStoryDetailsModal from '../PatchworkStoryFrankenForgeComponents/PatchworkStoryFrankenForgeStoryDetailsModal';
import { fonts as studioFonts } from '../fonts';
import PatchworkStoryFrankenForgeStoryModal from '../PatchworkStoryFrankenForgeComponents/PatchworkStoryFrankenForgeStoryModal';
import PatchworkStoryFrankenForgeButton from '../PatchworkStoryFrankenForgeComponents/PatchworkStoryFrankenButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

type PatchworkStoryFrankenForgeStoryStudioProps = {
    forgePageOpened: string;
    setForgePageOpened: (scr: string) => void;
};

const PatchworkStoryFrankenForgeStoryStudio: React.FC<PatchworkStoryFrankenForgeStoryStudioProps> = ({ setForgePageOpened }) => {
    const { width: sw, height: sh } = StudioDims.get('window');

    const [isModalOpen, setIsModalOpen] = useForgeState(false);
    const [storyList, setStoryList] = useForgeState<any[]>([]);
    const [detailOpen, setDetailOpen] = useForgeState(false);
    const [currentStory, setCurrentStory] = useForgeState<any>(null);

    // завантаження збережених історій
    useForgeEffect(() => {
        const loadStories = async () => {
            try {
                const raw = await AsyncStorage.getItem('patchworkStoryStories');
                if (raw) {
                    setStoryList(JSON.parse(raw));
                }
            } catch {
                setStoryList([]);
            }
        };
        loadStories();
    }, [isModalOpen]);

    const openDetails = (story: any) => {
        setCurrentStory(story);
        setDetailOpen(true);
    };

    const removeStory = (index: number) => {
        Alert.alert(
            'Remove Story',
            'Do you really want to erase this entry?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        const updated = storyList.filter((_, i) => i !== index);
                        setStoryList(updated);
                        await AsyncStorage.setItem('patchworkStoryStories', JSON.stringify(updated));
                    },
                },
            ]
        );
    };

    return (
        <StudioSafe style={{ flex: 1 }}>
            <StudioBox style={{ flex: 1, alignItems: 'center' }}>
                <StudioText
                    style={{
                        marginTop: sh * 0.02,
                        color: '#fff',
                        fontFamily: studioFonts.patchworkMochiyPopOne,
                        textAlign: 'center',
                        fontSize: sw * 0.072,
                    }}
                >
                    Story Studio
                </StudioText>

                {storyList.length === 0 ? (
                    <>
                        <StudioImg
                            source={Platform.OS === 'android'
                                ? require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/crownedMonsterWithBook.png')
                                : require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/monsterWithBook.png')}
                            style={{ width: sw * 0.9, height: sh * 0.4, marginTop: sh * 0.03 }}
                            resizeMode="contain"
                        />
                        <StudioText
                            style={{
                                paddingHorizontal: sw * 0.06,
                                fontSize: sw * 0.043,
                                marginTop: sh * 0.024,
                                fontFamily: studioFonts.patchworkPoppinsBold,
                                textAlign: 'center',
                                color: '#ffffff',
                            }}
                        >
                            The chamber echoes with ink and thunder
                        </StudioText>
                        <StudioText
                            style={{
                                paddingHorizontal: sw * 0.06,
                                marginTop: sh * 0.012,
                                fontFamily: studioFonts.patchworkPoppinsMedium,
                                textAlign: 'center',
                                fontSize: sw * 0.041,
                                color: '#ffffff',
                            }}
                        >
                            A tale knocks. Let the dice open the gate — or carve your own key.
                        </StudioText>
                        <PatchworkStoryFrankenForgeButton
                            patchwoekStoryFrankenW={sw * 0.75}
                            patchwoekStoryFrankenH={sh * 0.088}
                            onPress={() => setIsModalOpen(true)}
                            patchwoekStoryTextProp="Start Writing"
                            style={{ marginTop: sh * 0.032 }}
                            fontSize={sw * 0.036}
                        />
                    </>
                ) : (
                    <StudioBox style={{ width: '100%', alignItems: 'center', marginTop: sh * 0.03 }}>
                        <PatchworkStoryFrankenForgeButton
                            fontSize={sw * 0.036}
                            patchwoekStoryFrankenW={sw * 0.74}
                            style={{ marginBottom: sh * 0.02 }}
                            patchwoekStoryFrankenH={sh * 0.09}
                            onPress={() => setIsModalOpen(true)}
                            patchwoekStoryTextProp="New Story"
                        />
                        <StudioScroll
                            style={{ width: '100%', height: '100%' }}
                            contentContainerStyle={{ alignItems: 'center', paddingBottom: sh * 0.04 }}
                        >
                            {storyList.map((st, idx) => (
                                <StudioPress
                                    key={idx}
                                    activeOpacity={0.85}
                                    onPress={() => openDetails(st)}
                                    onLongPress={() => removeStory(idx)}
                                >
                                    <StudioBg
                                        source={require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/monstersStone.png')}
                                        style={{
                                            overflow: 'hidden',
                                            alignItems: 'center',
                                            borderRadius: sw * 0.04,
                                            paddingHorizontal: sw * 0.04,
                                            marginBottom: sh * 0.025,
                                            width: sw * 0.93,
                                            paddingVertical: sh * 0.024,
                                            flexDirection: 'row',
                                        }}
                                        resizeMode="stretch"
                                    >
                                        <StudioImg
                                            source={require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/storyIcon.png')}
                                            style={{ width: sw * 0.14, height: sw * 0.14, marginRight: sw * 0.03 }}
                                            resizeMode="contain"
                                        />
                                        <StudioBox style={{ flex: 1 }}>
                                            <StudioText
                                                style={{
                                                    fontFamily: studioFonts.patchworkMochiyPopOne,
                                                    fontSize: sw * 0.046,
                                                    color: '#fff',
                                                }}
                                            >
                                                {st.title}
                                            </StudioText>
                                        </StudioBox>
                                    </StudioBg>
                                </StudioPress>
                            ))}
                        </StudioScroll>
                    </StudioBox>
                )}

                <PatchworkStoryFrankenForgeStoryModal
                    visible={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
                <PatchworkStoryFrankenForgeStoryDetailsModal
                    visible={detailOpen}
                    story={currentStory}
                    onClose={() => setDetailOpen(false)}
                />
            </StudioBox>
        </StudioSafe>
    );
};

export default PatchworkStoryFrankenForgeStoryStudio;