import React, { useState, useEffect } from 'react';
import {
    Modal,
    View as ForgeContainer,
    Text as ForgeText,
    TextInput as ForgeInput,
    TouchableOpacity,
    Dimensions as ForgeScreen,
    ImageBackground as ForgeBg,
    ScrollView as ForgeScroll,
    Image as ForgeImg,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fonts as patchworkFonts } from '../fonts';
import PatchworkStoryFrankenForgeButton from '../PatchworkStoryFrankenForgeComponents/PatchworkStoryFrankenButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const PatchworkStoryFrankenForgeStoryModal = ({ visible, onClose, onSave }) => {
    const { width: winW, height: winH } = ForgeScreen.get('window');
    const [title, setTitle] = useState('');
    const [monsterList, setMonsterList] = useState([]);
    const [selectedMonster, setSelectedMonster] = useState(null);
    const [chapters, setChapters] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchMonsters = async () => {
            const stored = await AsyncStorage.getItem('patchworkStoryMonsters');
            if (stored) {
                const monsters = JSON.parse(stored);
                setMonsterList(monsters);
                if (monsters.length > 0) setSelectedMonster(monsters[0]);
            } else {
                setMonsterList([]);
            }
        };
        if (visible) {
            setTitle('');
            setChapters('');
            setDropdownOpen(false);
            fetchMonsters();
        }
    }, [visible]);

    const handleSave = async () => {
        if (!title.trim() || (monsterList.length > 0 && !selectedMonster) || !chapters.trim()) return;
        const newStory = {
            id: Date.now().toString(),
            title,
            monster: selectedMonster,
            chapters,
        };
        const stored = await AsyncStorage.getItem('patchworkStoryStories');
        let stories = stored ? JSON.parse(stored) : [];
        stories.unshift(newStory);
        await AsyncStorage.setItem('patchworkStoryStories', JSON.stringify(stories));
        if (onSave) onSave(newStory);
        onClose();
    };

    return (
        <Modal visible={visible} animationType="fade" transparent>
            <SafeAreaView style={{ flex: 1, paddingHorizontal: winW * 0.035, }}>
                <ForgeImg
                    source={require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/patchWorkBackMonster.png')}
                    style={{ width: winW, height: winH * 1.1, position: 'absolute', top: 0 }}
                    resizeMode="stretch"
                />
                <ForgeContainer style={{
                    width: '91%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignSelf: 'center',
                    marginTop: winH * 0.07,
                }}>
                    <ForgeContainer style={{ width: winW * 0.14, height: winW * 0.14 }} />
                    <ForgeText
                        style={{
                            fontSize: winW * 0.071,
                            color: '#fff',
                            textAlign: 'center',
                            fontFamily: patchworkFonts.patchworkMochiyPopOne,
                            marginBottom: winH * 0.01,
                        }}
                    >
                        New Story
                    </ForgeText>
                    <TouchableOpacity
                        style={{}}
                        onPress={onClose}
                    >
                        <ForgeBg
                            source={require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/closeIcon.png')}
                            style={{ width: winW * 0.14, height: winW * 0.14 }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </ForgeContainer>
                <ForgeScroll style={{ width: '100%' }}>
                    <ForgeText style={{ fontSize: winW * 0.045, color: '#fff', fontFamily: patchworkFonts.patchworkPoppinsBold, marginBottom: winH * 0.01 }}>
                        Title
                    </ForgeText>
                    <ForgeBg
                        source={require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/stoneInputBg.png')}
                        style={{ width: '100%', height: winH * 0.07, justifyContent: 'center', marginBottom: winH * 0.018 }}
                        resizeMode="stretch"
                    >
                        <ForgeInput
                            value={title}
                            onChangeText={setTitle}
                            maxLength={40}
                            placeholder="Title"
                            placeholderTextColor="#ccc"
                            style={{  color: '#fff', fontSize: winW * 0.045, paddingHorizontal: winW * 0.048, fontFamily: patchworkFonts.patchworkPoppinsMedium }}
                        />
                    </ForgeBg>
                    {monsterList.length > 0 && (
                        <>
                            <ForgeText style={{ fontSize: winW * 0.045, color: '#fff', fontFamily: patchworkFonts.patchworkPoppinsBold, marginBottom: winH * 0.01 }}>
                                Select Monster
                            </ForgeText>
                            <ForgeBg
                                source={require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/stoneInputBg.png')}
                                style={{ width: '100%', height: winH * 0.07, justifyContent: 'center', marginBottom: winH * 0.018, paddingHorizontal: winW * 0.01 }}
                                resizeMode="stretch"
                            >
                                <TouchableOpacity onPress={() => setDropdownOpen(!dropdownOpen)} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: winW * 0.04 }}>
                                    <ForgeText style={{ color: '#fff', fontSize: winW * 0.045, flex: 1, fontFamily: patchworkFonts.patchworkPoppinsMedium }}>
                                        {selectedMonster ? selectedMonster.monsterName : 'Select'}
                                    </ForgeText>
                                    <ForgeBg
                                        source={require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/dropdownArrow.png')}
                                        style={{ width: winW * 0.06, height: winW * 0.06, marginRight: winW * 0.04 }}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </ForgeBg>
                            {dropdownOpen && (
                                <ForgeContainer
                                    style={{
                                        position: 'absolute',
                                        left: 0,
                                        right: 0,
                                        top: winH * 0.25, // приблизно під селектором монстра
                                        backgroundColor: '#222',
                                        borderRadius: winW * 0.03,
                                        marginBottom: winH * 0.018,
                                        maxHeight: winH * 0.18,
                                        zIndex: 100,
                                    }}
                                >
                                    <ForgeScroll>
                                        {monsterList.map((monster, idx) => (
                                            <TouchableOpacity key={monster.id || idx} onPress={() => { setSelectedMonster(monster); setDropdownOpen(false); }} style={{ padding: winH * 0.012 }}>
                                                <ForgeText style={{ color: '#fff', fontSize: winW * 0.043, fontFamily: patchworkFonts.patchworkPoppinsMedium }}>
                                                    {monster.monsterName}
                                                </ForgeText>
                                            </TouchableOpacity>
                                        ))}
                                    </ForgeScroll>
                                </ForgeContainer>
                            )}
                        </>
                    )}
                    <ForgeText style={{ fontSize: winW * 0.045, color: '#fff', fontFamily: patchworkFonts.patchworkPoppinsBold, marginBottom: winH * 0.01 }}>
                        Write your chapters
                    </ForgeText>
                    <ForgeBg
                        source={require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/stoneInputBg.png')}
                        style={{ width: '100%', height: winH * 0.19, justifyContent: 'center', marginBottom: winH * 0.018, paddingVertical: winH * 0.01 }}
                        resizeMode="stretch"
                    >
                        <ForgeInput
                            value={chapters}
                            onChangeText={setChapters}
                            placeholder="Type your story..."
                            placeholderTextColor="#ccc"
                            style={{ color: '#fff', fontSize: winW * 0.045, paddingHorizontal: winW * 0.04, fontFamily: patchworkFonts.patchworkPoppinsMedium, minHeight: winH * 0.13, marginTop: winH * 0.014, marginLeft: winW * 0.03 }}
                            multiline
                        />
                    </ForgeBg>
                    <PatchworkStoryFrankenForgeButton
                        patchwoekStoryTextProp="Save"
                        patchwoekStoryFrankenW={winW * 0.74}
                        patchwoekStoryFrankenH={winH * 0.09}
                        fontSize={winW * 0.045}
                        onPress={handleSave}
                        style={{ alignSelf: 'center', marginTop: winH * 0.01 }}
                    />
                </ForgeScroll>
            </SafeAreaView>

        </Modal>
    );
};

export default PatchworkStoryFrankenForgeStoryModal;
