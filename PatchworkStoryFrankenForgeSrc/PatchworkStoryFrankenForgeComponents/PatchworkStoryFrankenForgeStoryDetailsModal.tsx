import React from 'react';
import { Modal, View, Text, TouchableOpacity, Dimensions, ImageBackground, Image, SafeAreaView } from 'react-native';
import { fonts as patchworkFonts } from '../fonts';

const { width: winW, height: winH } = Dimensions.get('window');

const PatchworkStoryFrankenForgeStoryDetailsModal = ({ visible, story, onClose }: any) => {
    if (!story) return null;
    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={false}
            onRequestClose={onClose}
        >
            <ImageBackground
                source={require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/patchWorkBackMonster.png')}
                style={{
                    width: winW * 1.1,
                    height: winH, alignSelf: 'center', alignItems: 'center',
                    paddingHorizontal: winW * 0.08,
                }}
                resizeMode="cover"
            >
                <SafeAreaView style={{
                    flexDirection: 'row', alignItems: 'center', padding: winW * 0.05, paddingBottom: 0,
                    justifyContent: 'space-between', width: '91%', alignSelf: 'center',
                }}>
                    <Text numberOfLines={2} adjustsFontSizeToFit style={{ fontSize: winW * 0.07, maxWidth: winW * 0.7, color: '#fff', fontFamily: patchworkFonts.patchworkMochiyPopOne, marginBottom: winH * 0.03, textAlign: 'left' }}>
                        {story.title}
                    </Text>
                    <TouchableOpacity
                        onPress={onClose}
                        style={{ zIndex: 10 }}
                    >
                        <Image
                            source={require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/closeIcon.png')}
                            style={{ width: winW * 0.13, height: winW * 0.13 }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </SafeAreaView>
                <View style={{ width: winW * 0.85, alignSelf: 'center', marginBottom: winH * 0.03 }}>
                    <ImageBackground
                        source={require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/monstersStone.png')}
                        style={{ width: '104%', alignSelf: 'center', height: winH * 0.11, flexDirection: 'row', alignItems: 'center', paddingHorizontal: winW * 0.04 }}
                        resizeMode="stretch"
                    >
                        <Image
                            source={require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/storyIcon.png')}
                            style={{ width: winW * 0.13, height: winW * 0.13, marginRight: winW * 0.04 }}
                            resizeMode="contain"
                        />
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: winW * 0.045, color: '#fff', fontFamily: patchworkFonts.patchworkPoppinsBold }}>
                                {story.monster.monsterName || 'No monster selected'}
                            </Text>
                            {story.monster && (
                                <Text style={{ fontSize: winW * 0.038, color: '#fff', fontFamily: patchworkFonts.patchworkPoppinsMedium }}>
                                    {story.monster.archetype || 'Stitched Giant'}
                                </Text>
                            )}
                        </View>
                    </ImageBackground>
                </View>
                <View style={{ width: winW * 0.85, alignSelf: 'center' }}>
                    <Text style={{ fontSize: winW * 0.042, color: '#fff', fontFamily: patchworkFonts.patchworkPoppinsMedium, textAlign: 'left' }}>
                        {story.chapters || 'No chapters'}
                    </Text>
                </View>
            </ImageBackground>
        </Modal>
    );
};

export default PatchworkStoryFrankenForgeStoryDetailsModal;
