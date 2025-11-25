import closeIcon from '../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/closeIcon.png';
import {
    SafeAreaView as ForgeSafe,
    Dimensions as ForgeDims,
    View as ForgeBox,
    Modal as ForgeModal,
    Share as PatchShare,
    Text as ForgeText,
    Image as ForgeImg,
    TouchableOpacity as ForgePress,
    ScrollView as ForgeScroll,
} from 'react-native';


import patchworkLibrary from '../PatchworkStoryFrankenForgeData/patchworkLibrary';
import { fonts as forgeFonts } from '../fonts';
import React, { useState as usePatchState} from 'react';

const PatchworkStoryFrankenForgeLibrary: React.FC = () => {
    const { width: vw, height: vh } = ForgeDims.get('window');

    const [isOpen, setIsOpen] = usePatchState(false);
    const [activeStory, setActiveStory] = usePatchState<any>(null);

    const shareCurrent = () => {
        if (!activeStory) return;
        const splitSentences = activeStory.patchLibraryText.split('.');
        const sample = splitSentences.slice(0, 2).join('.') + (splitSentences.length > 2 ? '.' : '');
        PatchShare.share({
            message: `${activeStory.patchLibraryT}\n\n${sample}`,
            title: activeStory.patchLibraryT,
        });
    };

    return (
        <ForgeSafe style={{ flex: 1 }}>
            <ForgeBox style={{ flex: 1, alignItems: 'center' }}>
                <ForgeText
                    style={{
                        textAlign: 'center',
                        fontSize: vw * 0.072,
                        color: '#fff',
                        fontFamily: forgeFonts.patchworkMochiyPopOne,
                        marginTop: vh * 0.02,
                    }}
                >
                    Story Studio
                </ForgeText>

                <ForgeScroll
                    style={{ width: '100%' }}
                    contentContainerStyle={{ alignItems: 'center', paddingTop: vh * 0.02, paddingBottom: vh * 0.19054345 }}
                >
                    <ForgeBox style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {patchworkLibrary.map((entry, index) => (
                            <ForgePress
                                key={entry.id}
                                onPress={() => {
                                    setActiveStory(entry);
                                    setIsOpen(true);
                                }}
                                style={{
                                    alignItems: 'center',
                                    margin: vw * 0.02,
                                    paddingBottom: vw * 0.03,
                                    backgroundColor: '#02004E',
                                    borderRadius: 24,
                                    width: vw * 0.44,
                                }}
                            >
                                <ForgeImg
                                    source={entry.patchLibraryImage}
                                    style={{
                                        borderRadius: 18,
                                        marginTop: vw * 0.03,
                                        height: vw * 0.38,
                                        width: vw * 0.38,
                                    }}
                                    resizeMode="cover"
                                />
                                <ForgeText
                                    style={{
                                        fontSize: vw * 0.04,
                                        color: '#fff',
                                        textAlign: 'center',
                                        fontFamily: forgeFonts.patchworkMochiyPopOne,
                                        marginTop: vw * 0.02,
                                    }}
                                >
                                    {entry.patchLibraryT}
                                </ForgeText>
                            </ForgePress>
                        ))}
                    </ForgeBox>
                </ForgeScroll>
            </ForgeBox>

            <ForgeModal
                transparent={false}
                onRequestClose={() => setIsOpen(false)}
                animationType="fade"
                visible={isOpen}
            >
                <ForgeBox
                    style={{ flex: 1, backgroundColor: '#181c4b', justifyContent: 'flex-start', alignItems: 'center' }}
                >
                    <ForgeImg
                        source={require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/patchWorkBackMonster.png')}
                        style={{
                            position: 'absolute',
                            zIndex: 0,
                            alignSelf: 'center',
                            width: vw * 1.1,
                            height: vh,
                        }}
                    />
                    {activeStory && (
                        <ForgeBox style={{ width: vw, height: vh, alignItems: 'center' }}>
                            <ForgeBox
                                style={{
                                    marginTop: vh * 0.06,
                                    width: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                }}
                            >
                                <ForgeText
                                    style={{
                                        maxWidth: vw * 0.7,
                                        fontFamily: forgeFonts.patchworkMochiyPopOne,
                                        flex: 1,
                                        textAlign: 'left',
                                        fontSize: vw * 0.064,
                                        marginHorizontal: vw * 0.04,
                                        color: '#fff',
                                    }}
                                    numberOfLines={2}
                                    adjustsFontSizeToFit
                                >
                                    {activeStory.patchLibraryT}
                                </ForgeText>
                                <ForgePress onPress={() => setIsOpen(false)} style={{ marginRight: vw * 0.04 }}>
                                    <ForgeImg source={closeIcon} style={{ width: vw * 0.12, height: vw * 0.12 }} />
                                </ForgePress>
                            </ForgeBox>

                            <ForgeScroll
                                style={{ width: '100%' }}
                                contentContainerStyle={{ paddingHorizontal: vw * 0.06, paddingBottom: vh * 0.17 }}
                            >
                                <ForgeImg
                                    source={activeStory.patchLibraryImage}
                                    style={{
                                        alignSelf: 'center',
                                        marginTop: vh * 0.02,
                                        height: vh * 0.32,
                                        borderRadius: 18,
                                        width: vw * 0.92,
                                    }}
                                    resizeMode="cover"
                                />
                                <ForgeText
                                    style={{
                                        textAlign: 'left',
                                        fontSize: vw * 0.042,
                                        color: '#fff',
                                        fontFamily: forgeFonts.patchworkPoppinsMedium,
                                        marginTop: vh * 0.02,
                                    }}
                                >
                                    {activeStory.patchLibraryText}
                                </ForgeText>
                            </ForgeScroll>
                        </ForgeBox>
                    )}

                    <ForgePress style={{ position: 'absolute', bottom: vh * 0.04, right: vw * 0.08 }} onPress={shareCurrent}>
                        <ForgeImg
                            style={{ width: vw * 0.16, height: vw * 0.16 }}
                            resizeMode="contain"
                            source={require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/shareStoneBtn.png')}
                        />
                    </ForgePress>
                </ForgeBox>
            </ForgeModal>
        </ForgeSafe>
    );
};

export default PatchworkStoryFrankenForgeLibrary;