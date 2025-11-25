import React, {
    useState as usePatchState,
    useEffect as usePatchEffect
} from 'react';
import {
    Dimensions as ForgeDims,
    View as ForgeBox,
    Text as ForgeTxt,
    Image as ForgeImage,
    Alert,
    ImageBackground as ForgeBg,
    Share,
    ScrollView as ForgeScroll,
    TouchableOpacity,
    SafeAreaView as ForgeSafe,
    Platform,
} from 'react-native';
import PatchworkStoryFrankenForgeMonsterDetailsModal from '../PatchworkStoryFrankenForgeComponents/PatchworkStoryFrankenForgeMonsterDetailsModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fonts as patchworkFonts } from '../fonts';
import PatchworkStoryFrankenForgeMonsterModal from '../PatchworkStoryFrankenForgeComponents/PatchworkStoryFrankenForgeMonsterModal';
import PatchworkStoryFrankenForgeButton from '../PatchworkStoryFrankenForgeComponents/PatchworkStoryFrankenButton';

type BuilderProps = {
    forgePageOpened: string;
    setForgePageOpened: (next: string) => void;
};

const PatchworkStoryFrankenForgeMonsterBuilder: React.FC<BuilderProps> = ({ setForgePageOpened }) => {
    const { width: scrW, height: scrH } = ForgeDims.get('window');

    // --- СТАН ---
    const [showCreateModal, setShowCreateModal] = usePatchState(false);
    const [monsterList, setMonsterList] = usePatchState<any[]>([]);
    const [openDetails, setOpenDetails] = usePatchState(false);
    const [focusedMonster, setFocusedMonster] = usePatchState<any>(null);

    // --- LOAD ---
    const loadMonsters = async () => {
        try {
            const stored = await AsyncStorage.getItem('patchworkStoryMonsters');
            if (stored) {
                setMonsterList(JSON.parse(stored));
            }
        } catch {
            setMonsterList([]);
        }
    };

    usePatchEffect(() => {
        loadMonsters();
    }, [showCreateModal]);

    // --- ACTIONS ---
    const onSelectMonster = (monster: any) => {
        setFocusedMonster(monster);
        setOpenDetails(true);
    };

    const onDeleteMonster = (idx: number) => {
        Alert.alert('Delete Monster', 'Are you sure you want to delete this monster?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    const updated = monsterList.filter((_, i) => i !== idx);
                    setMonsterList(updated);
                    await AsyncStorage.setItem('patchworkStoryMonsters', JSON.stringify(updated));
                },
            },
        ]);
    };

    const onEditMonster = async (edited: any) => {
        const newArr = monsterList.map((m) => (m.id === edited.id ? edited : m));
        setMonsterList(newArr);
        await AsyncStorage.setItem('patchworkStoryMonsters', JSON.stringify(newArr));
        setOpenDetails(false);
    };

    const onShareMonster = async (monster: any) => {
        await Share.share({
            title: monster.monsterName,
            message: `${monster.monsterName}\n${monster.archetype}\n${monster.concept}`,
        });
    };

    // --- UI ---
    const renderEmptyState = () => (
        <>
            <ForgeImage
                source={Platform.OS === 'android' 
                    ? require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/crownedMonsterWithBook.png')
                    : require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/monsterWithBook.png')}
                style={{
                    marginTop: scrH * 0.03,
                    height: scrH * 0.4,
                    width: scrW * 0.9,
                }}
                resizeMode="contain"
            />
            <ForgeTxt
                style={{
                    marginTop: scrH * 0.025,
                    color: '#ffffff',
                    paddingHorizontal: scrW * 0.06,
                    fontFamily: patchworkFonts.patchworkPoppinsMedium,
                    textAlign: 'center',
                    fontSize: scrW * 0.042,
                }}
            >
                Create a unique creature and send it directly into Story Studio for seeds and prompts.{"\n\n"}
                Shall we start?
            </ForgeTxt>
            <PatchworkStoryFrankenForgeButton
                fontSize={scrW * 0.036}
                style={{ marginTop: scrH * 0.034 }}
                patchwoekStoryFrankenW={scrW * 0.74}
                patchwoekStoryFrankenH={scrH * 0.09}
                patchwoekStoryTextProp="Forge a Monster"
                onPress={() => setShowCreateModal(true)}
            />
        </>
    );

    const renderMonsterList = () => (
        <ForgeBox style={{ width: '100%', alignItems: 'center', marginTop: scrH * 0.03 }}>
            <PatchworkStoryFrankenForgeButton
                style={{ marginBottom: scrH * 0.02 }}
                patchwoekStoryFrankenW={scrW * 0.74}
                onPress={() => setShowCreateModal(true)}
                patchwoekStoryFrankenH={scrH * 0.09}
                fontSize={scrW * 0.036}
                patchwoekStoryTextProp="Forge a Monster"
            />
            <ForgeScroll
                style={{ width: '100%', height: '100%' }}
                contentContainerStyle={{ alignItems: 'center', paddingBottom: scrH * 0.04 }}
            >
                {monsterList.map((monster, idx) => (
                    <TouchableOpacity
                        key={idx}
                        activeOpacity={0.8}
                        onPress={() => onSelectMonster(monster)}
                        onLongPress={() => onDeleteMonster(idx)}
                    >
                        <ForgeBg
                            source={require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/monstersStone.png')}
                            style={{
                                alignItems: 'center',
                                overflow: 'hidden',
                                paddingHorizontal: scrW * 0.04,
                                borderRadius: scrW * 0.04,
                                marginBottom: scrH * 0.025,
                                width: scrW * 0.93,
                                paddingVertical: scrH * 0.025,
                                flexDirection: 'row',
                            }}
                            resizeMode="stretch"
                        >
                            <ForgeImage
                                source={require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/monsterIcon.png')}
                                style={{ width: scrW * 0.14, height: scrW * 0.14, marginRight: scrW * 0.03 }}
                                resizeMode="contain"
                            />
                            <ForgeBox style={{ flex: 1 }}>
                                <ForgeTxt
                                    style={{
                                        fontSize: scrW * 0.045,
                                        color: '#fff',
                                        fontFamily: patchworkFonts.patchworkMochiyPopOne,
                                    }}
                                >
                                    {monster.monsterName}
                                </ForgeTxt>
                                <ForgeTxt
                                    style={{
                                        fontSize: scrW * 0.038,
                                        color: '#fff',
                                        fontFamily: patchworkFonts.patchworkPoppinsMedium,
                                        marginTop: scrH * 0.005,
                                    }}
                                >
                                    {monster.archetype}
                                </ForgeTxt>
                            </ForgeBox>
                        </ForgeBg>
                    </TouchableOpacity>
                ))}
            </ForgeScroll>
        </ForgeBox>
    );

    return (
        <ForgeSafe style={{ flex: 1 }}>
            <ForgeBox style={{ flex: 1, alignItems: 'center' }}>
                <ForgeTxt
                    style={{
                        marginTop: scrH * 0.02,
                        fontFamily: patchworkFonts.patchworkMochiyPopOne,
                        color: '#fff',
                        textAlign: 'center',
                        fontSize: scrW * 0.071,
                    }}
                >
                    Monster Builder
                </ForgeTxt>

                {monsterList.length === 0 ? renderEmptyState() : renderMonsterList()}

                {/* Модалки */}
                <PatchworkStoryFrankenForgeMonsterModal visible={showCreateModal} onClose={() => setShowCreateModal(false)} />
                <PatchworkStoryFrankenForgeMonsterDetailsModal
                    onEdit={onEditMonster}
                    onClose={() => setOpenDetails(false)}
                    monster={focusedMonster}
                    visible={openDetails}
                    onShare={onShareMonster}
                />
            </ForgeBox>
        </ForgeSafe>
    );
};

export default PatchworkStoryFrankenForgeMonsterBuilder;