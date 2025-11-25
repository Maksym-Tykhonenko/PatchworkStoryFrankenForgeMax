import React, { useState } from 'react';
import {
    Modal,
    View as ForgeContainer,
    Text as ForgeText,
    Image as ForgeImg,
    TouchableOpacity,
    Dimensions as ForgeScreen,
    Keyboard,
    SafeAreaView as PatchworkSafeArea
} from 'react-native';
import { ScrollView as ForgeScroll, ImageBackground as ForgeBg } from 'react-native';
import { fonts as patchworkFonts } from '../fonts';
import { StyleSheet } from 'react-native';
import { TextInput, TouchableWithoutFeedback } from 'react-native';

const { width: winW, height: winH } = ForgeScreen.get('window');

type Monster = {
    monsterName: string;
    archetype: string;
    concept: string;
    temperament: string;
    formFactor: string;
    material: string;
    features: string;
    scaleBuild: string;
    senses: string;
    quirks: string;
    birthplace: string;
    creator: string;
    catalyst: string;
    taboos: string;
    token: string;
    rumors: string;
    primaryAbility: string;
    secondaryAbility: string;
    passiveTraits: string;
    weakness: string;
    voice: string;
    coreDrives: string;
    alliesBonds: string;
    conflicts: string;
    storyHooks: string;
};

type PatchworkStoryFrankenForgeMonsterDetailsModalProps = {
    visible: boolean;
    onClose: () => void;
    monster: Monster | null;
    onEdit: (monster: Monster) => void;
    onShare: (monster: Monster) => void;
};

const styles = StyleSheet.create({
    modalBg: { flex: 1, width: '100%', height: '100%' },
    safeArea: {},
    mainContainer: { flex: 1 },
    headerRow: { flexDirection: 'row', alignItems: 'center', padding: winW * 0.05, paddingBottom: 0 },
    monsterIcon: { width: winW * 0.14, height: winW * 0.14, marginRight: winW * 0.03 },
    monsterName: { fontSize: winW * 0.06, color: '#fff', fontFamily: patchworkFonts.patchworkMochiyPopOne, maxWidth: winW * 0.5 },
    closeBtn: { width: winW * 0.14, height: winW * 0.14 },
    scroll: { flex: 1, paddingHorizontal: winW * 0.05 },
    label: { fontSize: winW * 0.045, color: '#fff', fontFamily: patchworkFonts.patchworkMochiyPopOne, marginTop: winH * 0.02 },
    value: { fontSize: winW * 0.038, color: '#fff', fontFamily: patchworkFonts.patchworkPoppinsMedium },
    btnRow: {
        justifyContent: 'center', alignItems: 'center', marginBottom: winH * 0.03,
        position: 'absolute', bottom: winH * 0.03, right: 0,
        gap: winW * 0.04,
    },
    actionBtn: { marginHorizontal: winW * 0.04 },
    actionImg: { width: winH * 0.08, height: winH * 0.08 },
});

const PatchworkStoryFrankenForgeMonsterDetailsModal = ({
    visible,
    onClose,
    monster,
    onEdit,
    onShare,
}: PatchworkStoryFrankenForgeMonsterDetailsModalProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState<Monster | null>(monster);

    React.useEffect(() => {
        setEditData(monster);
        setIsEditing(false);
    }, [monster, visible]);

    const handleEditPress = () => {
        setIsEditing(true);
    };

    const handleFieldChange = (field: keyof Monster, value: string) => {
        if (!editData) return;
        setEditData({ ...editData, [field]: value });
    };

    const handleSave = () => {
        if (isEditing && editData) {
            onEdit(editData);
        }
        setIsEditing(false);
    };

    if (!editData) return null;
    return (
        <Modal visible={visible} animationType="slide" transparent>
            <TouchableWithoutFeedback onPress={() => {
                handleSave();
                Keyboard.dismiss();
            }}>
                <ForgeBg
                    source={require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/patchWorkBackMonster.png')}
                    style={styles.modalBg}
                    resizeMode="cover"
                >
                    <PatchworkSafeArea />
                    <ForgeContainer style={styles.mainContainer}>
                        <ForgeContainer style={styles.headerRow}>
                            <ForgeImg source={require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/monsterIcon.png')} style={styles.monsterIcon} resizeMode="contain" />
                            {isEditing ? (
                                <TextInput
                                    value={`${editData.monsterName ?? ''}`}
                                    onChangeText={v => handleFieldChange('monsterName', v)}
                                    style={styles.monsterName}
                                />
                            ) : (
                                <ForgeText style={styles.monsterName} numberOfLines={2} adjustsFontSizeToFit>{editData.monsterName}</ForgeText>
                            )}
                            <TouchableOpacity onPress={() => {
                                handleSave();
                                onClose();
                            }} style={{ marginLeft: 'auto' }}>
                                <ForgeImg source={require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/closeIcon.png')} style={styles.closeBtn} resizeMode="contain" />
                            </TouchableOpacity>
                        </ForgeContainer>
                        <ForgeScroll style={styles.scroll} contentContainerStyle={{ paddingBottom: winH * 0.04 }}>
                            {[
                                ['Archetype', 'archetype'],
                                ['Concept', 'concept'],
                                ['Temperament', 'temperament'],
                                ['Form Factor', 'formFactor'],
                                ['Material', 'material'],
                                ['Features', 'features'],
                                ['Scale & Build', 'scaleBuild'],
                                ['Senses', 'senses'],
                                ['Quirks', 'quirks'],
                                ['Birthplace', 'birthplace'],
                                ['Creator', 'creator'],
                                ['Catalyst', 'catalyst'],
                                ['Taboos', 'taboos'],
                                ['Token', 'token'],
                                ['Rumors', 'rumors'],
                                ['Primary Ability', 'primaryAbility'],
                                ['Secondary Ability', 'secondaryAbility'],
                                ['Passive Traits', 'passiveTraits'],
                                ['Weakness', 'weakness'],
                                ['Voice', 'voice'],
                                ['Core Drives', 'coreDrives'],
                                ['Allies & Bonds', 'alliesBonds'],
                                ['Conflicts', 'conflicts'],
                                ['Story Hooks', 'storyHooks'],
                            ].map(([label, key]) => (
                                <React.Fragment key={key}>
                                    <ForgeText style={[styles.label, key === 'archetype' ? { marginTop: winH * 0.01 } : {}]}>{label}</ForgeText>
                                    {isEditing ? (
                                        <TextInput
                                            value={`${editData[key as keyof Monster] ?? ''}`}
                                            onChangeText={v => handleFieldChange(key as keyof Monster, v)}
                                            style={styles.value}
                                        />
                                    ) : (
                                        <ForgeText style={styles.value}>
                                            {Array.isArray(editData[key as keyof Monster])
                                                ? (editData[key as keyof Monster] as any[]).join(', ')
                                                : editData[key as keyof Monster]}
                                        </ForgeText>
                                    )}
                                </React.Fragment>
                            ))}
                        </ForgeScroll>
                    </ForgeContainer>
                    <ForgeContainer style={styles.btnRow} pointerEvents={isEditing ? 'none' : 'auto'}>
                        <TouchableOpacity style={styles.actionBtn} onPress={handleEditPress}>
                            <ForgeImg source={require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/editStoneBtn.png')} style={styles.actionImg} resizeMode="contain" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionBtn} onPress={() => onShare(editData)}>
                            <ForgeImg source={require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/shareStoneBtn.png')} style={styles.actionImg} resizeMode="contain" />
                        </TouchableOpacity>
                    </ForgeContainer>
                </ForgeBg>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default PatchworkStoryFrankenForgeMonsterDetailsModal;
