import React, { useState, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, Image, Dimensions, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { fonts as patchworkFonts } from '../fonts';
import PatchworkStoryFrankenButton from '../PatchworkStoryFrankenForgeComponents/PatchworkStoryFrankenButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PatchworkStoryFrankenForgeMonsterOptions } from './PatchworkStoryFrankenForgeMonsterOptions';

const stoneImg = require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/stoneInputBg.png');
const diceImg = require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/diceIcon.png');
const closeImg = require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/closeIcon.png');
const modalBgImg = require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/patchWorkBackMonster.png'); // Add your modal background image here

const steps = [
    'Core Identity',
    'Body & Traits',
    'Origin & Lore',
    'Powers & Limitations',
    'Voice, Drives & Hooks',
];

const PatchworkStoryFrankenForgeMonsterModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
    const { width: winW, height: winH } = Dimensions.get('window');
    const [step, setStep] = useState(0);

    // Example state for step 1
    const [monsterName, setMonsterName] = useState('');
    const [archetype, setArchetype] = useState('');
    const [concept, setConcept] = useState('');
    const [temperament, setTemperament] = useState('');

    // State for step 2
    const tagOptions = [
        'Humanoid', 'Quadruped', 'Serpentine', 'Amorphous', 'Guide', 'Healer', 'Trickster', 'Sentinel', 'Diplomat', 'Hermit'
    ];
    const [formFactor, setFormFactor] = useState<string[]>([]);
    const [material, setMaterial] = useState<string[]>([]);
    const [features, setFeatures] = useState<string[]>([]);
    const [scaleBuild, setScaleBuild] = useState('');
    const [scaleBuild2, setScaleBuild2] = useState('');
    const [senses, setSenses] = useState('');
    const [quirks, setQuirks] = useState('');

    // State for step 3
    const [birthplace, setBirthplace] = useState('');
    const [creator, setCreator] = useState('');
    const [catalyst, setCatalyst] = useState('');
    const [taboos, setTaboos] = useState('');
    const [token, setToken] = useState('');
    const [rumors, setRumors] = useState('');

    // State for step 4
    const [primaryAbility, setPrimaryAbility] = useState('');
    const [secondaryAbility, setSecondaryAbility] = useState('');
    const [passiveTraits, setPassiveTraits] = useState<string[]>([]);
    const [weakness, setWeakness] = useState('');

    // State for step 5
    const [voice, setVoice] = useState('');
    const [conflicts, setConflicts] = useState('');
    const [storyHooks, setStoryHooks] = useState('');
    const coreDrivesOptions = [
        'Protect the drowned archive', 'Find the thirteenth page', 'Learn to sleep', 'Repay a storm-debt', 'Guard a vanished lighthouse', 'Catalog every final song'
    ];
    const [coreDrives, setCoreDrives] = useState<string[]>([]);
    const [alliesBonds, setAlliesBonds] = useState<string[]>([]);

    const scrollRef = useRef<ScrollView>(null);

    const renderPaginator = () => (
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 12 }}>
            {steps.map((_, idx) => (
                <View
                    key={idx}
                    style={{
                        width: winW * 0.09,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: idx === step ? '#fff' : '#555',
                        marginHorizontal: 4,
                    }}
                />
            ))}
        </View>
    );

    const renderHeader = () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: winW, paddingHorizontal: winW * 0.04, paddingTop: winH * 0.04, paddingBottom: winH * 0.023, backgroundColor: 'transparent', zIndex: 10 }}>
            <TouchableOpacity onPress={() => setStep(step - 1)} style={{ opacity: step === 0 ? 0 : 1 }} disabled={step === 0}>
                <Image source={require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/backArrow.png')} style={{ width: winW * 0.12, height: winW * 0.12 }} />
            </TouchableOpacity>
            <Text style={{ flex: 1, fontFamily: patchworkFonts.patchworkMochiyPopOne, fontSize: winW * 0.06, color: '#fff', textAlign: 'center', alignSelf: 'center' }} numberOfLines={2} adjustsFontSizeToFit>
                {steps[step]}
            </Text>
            <TouchableOpacity onPress={handleClose}>
                <Image source={closeImg} style={{ width: winW * 0.12, height: winW * 0.12 }} />
            </TouchableOpacity>
        </View>
    );

    const renderTagRow = (selected: string[], setSelected: (tags: string[]) => void) => (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginVertical: winH * 0.008 }}>
            {tagOptions.map(tag => {
                const isActive = selected.includes(tag);
                return (
                    <TouchableOpacity
                        key={tag}
                        onPress={() => {
                            if (isActive) setSelected(selected.filter(t => t !== tag));
                            else setSelected([...selected, tag]);
                        }}
                        style={{
                            backgroundColor: isActive ? '#FF6B2D' : '#2B258C',
                            borderRadius: 18,
                            paddingHorizontal: winW * 0.03,
                            paddingVertical: winH * 0.008,
                            margin: 4,
                            minWidth: winW * 0.18,
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ color: '#fff', fontFamily: patchworkFonts.patchworkPoppinsMedium, fontSize: winW * 0.035 }}>{tag}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );

    const renderSelectableTagRow = (options: string[], selected: string[], setSelected: (tags: string[]) => void) => (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginVertical: winH * 0.008 }}>
            {options.map((tag) => {
                const isActive = selected.includes(tag);
                return (
                    <TouchableOpacity
                        key={tag}
                        onPress={() => {
                            if (isActive) setSelected(selected.filter(t => t !== tag));
                            else setSelected([...selected, tag]);
                        }}
                        style={{
                            backgroundColor: isActive ? '#FF6B2D' : '#2B258C',
                            borderRadius: 18,
                            paddingHorizontal: winW * 0.03,
                            paddingVertical: winH * 0.008,
                            margin: 4,
                            minWidth: winW * 0.32,
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ color: '#fff', fontFamily: patchworkFonts.patchworkPoppinsMedium, fontSize: winW * 0.035 }}>{tag}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );

    const renderDropdownInput = (value: string, setValue: (v: string) => void, placeholder: string, diceOptions?: string[]) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: winH * 0.012 }}>
            <Image source={stoneImg} style={{ width: winW * 0.74, height: winH * 0.06, position: 'absolute' }} resizeMode="stretch" />
            <TextInput
                value={value}
                onChangeText={setValue}
                style={{ width: winW * 0.74, height: winH * 0.06, color: '#fff', fontFamily: patchworkFonts.patchworkPoppinsMedium, paddingHorizontal: 18 }}
                placeholder={placeholder}
                placeholderTextColor="#ccc"
            />
            <TouchableOpacity style={{ marginLeft: 8 }} onPress={diceOptions ? () => setValue(getRandomFromArray(diceOptions)) : undefined}>
                <Image source={diceImg} style={{ width: winW * 0.12, height: winW * 0.12 }} />
            </TouchableOpacity>
        </View>
    );
    const renderStoneInput = (value: string, setValue: (v: string) => void, placeholder: string, multiline = false, diceOptions?: string[]) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <View style={{ position: 'relative' }}>
                <Image source={stoneImg} style={{ width: winW * 0.74, height: multiline ? winH * 0.09 : winH * 0.06, position: 'absolute' }} resizeMode="stretch" />
                <TextInput
                    value={value}
                    onChangeText={setValue}
                    style={{ width: winW * 0.74, height: multiline ? winH * 0.09 : winH * 0.06, color: '#fff', fontFamily: patchworkFonts.patchworkPoppinsMedium, paddingHorizontal: 18, paddingTop: multiline ? 12 : 0 }}
                    placeholder={placeholder}
                    placeholderTextColor="#ccc"
                    multiline={multiline}
                />
            </View>
            <TouchableOpacity style={{ marginLeft: 8 }} onPress={diceOptions ? () => setValue(getRandomFromArray(diceOptions)) : undefined}>
                <Image source={diceImg} style={{ width: winW * 0.12, height: winW * 0.12 }} />
            </TouchableOpacity>
        </View>
    );

    // Генератор унікального id
    const generateUniqueId = () => {
        return (
            Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
        );
    };

    const forgeDims = { width: winW, height: winH };
    const handleNextSlide = () => {
        if (step === 0 && !(monsterName && archetype && concept && temperament)) return;
        if (step === 1 && (!formFactor.length || !material.length || !features.length || !scaleBuild || !senses || !quirks)) return;
        if (step === 2 && (!birthplace || !creator || !catalyst || !taboos || !token || !rumors)) return;
        if (step === 3 && (!primaryAbility || !secondaryAbility || !passiveTraits.length || !weakness)) return;
        setStep(step + 1);
        if (scrollRef.current) scrollRef.current.scrollTo({ y: 0, animated: false });
    };

    const handleForgeMonster = async () => {
        if (!(voice && coreDrives.length && alliesBonds.length && conflicts && storyHooks)) return;
        const monsterObj = {
            id: generateUniqueId(),
            monsterName,
            archetype,
            concept,
            temperament,
            formFactor,
            material,
            features,
            scaleBuild,
            senses,
            quirks,
            birthplace,
            creator,
            catalyst,
            taboos,
            token,
            rumors,
            primaryAbility,
            secondaryAbility,
            passiveTraits,
            weakness,
            voice,
            coreDrives,
            alliesBonds,
            conflicts,
            storyHooks,
        };
        try {
            const monstersRaw = await AsyncStorage.getItem('patchworkStoryMonsters');
            const monsters = monstersRaw ? JSON.parse(monstersRaw) : [];
            monsters.unshift(monsterObj);
            await AsyncStorage.setItem('patchworkStoryMonsters', JSON.stringify(monsters));
        } catch (e) {
            // handle error
        }
        onClose();
        resetFields();
    };

    const handleClose = () => {
        onClose();
        resetFields();
    };

    const resetFields = () => {
        setMonsterName('');
        setArchetype('');
        setConcept('');
        setTemperament('');
        setFormFactor([]);
        setMaterial([]);
        setFeatures([]);
        setScaleBuild('');
        setScaleBuild2('');
        setSenses('');
        setQuirks('');
        setBirthplace('');
        setCreator('');
        setCatalyst('');
        setTaboos('');
        setToken('');
        setRumors('');
        setPrimaryAbility('');
        setSecondaryAbility('');
        setPassiveTraits([]);
        setWeakness('');
        setVoice('');
        setCoreDrives([]);
        setAlliesBonds([]);
        setConflicts('');
        setStoryHooks('');
        setStep(0);
    };

    const getRandomFromArray = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    const renderStep1 = () => (
        <View style={{ width: '100%', alignItems: 'center', marginTop: winH * 0.03, paddingBottom: forgeDims.height * 0.13 }}>
            {/* Monster Name */}
            <Text style={{ fontFamily: patchworkFonts.patchworkPoppinsMedium, color: '#fff', fontSize: winW * 0.04, alignSelf: 'flex-start', marginLeft: winW * 0.08, marginTop: winH * 0.03 }}>Monster Name</Text>
            {renderStoneInput(monsterName, setMonsterName, 'Name', false, PatchworkStoryFrankenForgeMonsterOptions.step1.monsterName)}
            {/* Archetype */}
            <Text style={{ fontFamily: patchworkFonts.patchworkPoppinsMedium, color: '#fff', fontSize: winW * 0.04, alignSelf: 'flex-start', marginLeft: winW * 0.08, marginTop: winH * 0.02 }}>Archetype</Text>
            {renderStoneInput(archetype, setArchetype, 'Archetype', false, PatchworkStoryFrankenForgeMonsterOptions.step1.archetype)}
            {/* One-Line Concept */}
            <Text style={{ fontFamily: patchworkFonts.patchworkPoppinsMedium, color: '#fff', fontSize: winW * 0.04, alignSelf: 'flex-start', marginLeft: winW * 0.08, marginTop: winH * 0.02 }}>One-Line Concept</Text>
            {renderStoneInput(concept, setConcept, 'Concept', true, PatchworkStoryFrankenForgeMonsterOptions.step1.concept)}
            {/* Temperament */}
            <Text style={{ fontFamily: patchworkFonts.patchworkPoppinsMedium, color: '#fff', fontSize: winW * 0.04, alignSelf: 'flex-start', marginLeft: winW * 0.08, marginTop: winH * 0.02 }}>Temperament</Text>
            {renderStoneInput(temperament, setTemperament, 'Temperament', false, PatchworkStoryFrankenForgeMonsterOptions.step1.temperament)}
            {/* Next Step Button */}
            <PatchworkStoryFrankenButton
                patchwoekStoryTextProp={'Next Step'}
                patchwoekStoryFrankenW={forgeDims.width * 0.75}
                patchwoekStoryFrankenH={forgeDims.height * 0.091}
                fontSize={forgeDims.width * 0.04}
                onPress={handleNextSlide}
                style={{ alignSelf: 'center', marginTop: winH * 0.03, opacity: monsterName && archetype && concept && temperament ? 1 : 0.3 }}
            />
        </View>
    );

    const renderStep2 = () => (
        <View style={{ width: '100%', alignItems: 'center', marginTop: winH * 0.03, paddingBottom: forgeDims.height * 0.13 }}>
            {/* Form Factor */}
            <Text style={{ fontFamily: patchworkFonts.patchworkPoppinsMedium, color: '#fff', fontSize: winW * 0.043, alignSelf: 'flex-start', marginLeft: winW * 0.08, marginTop: winH * 0.02 }}>Form Factor</Text>
            {renderTagRow(formFactor, setFormFactor)}
            {/* Material / Texture */}
            <Text style={{ fontFamily: patchworkFonts.patchworkPoppinsMedium, color: '#fff', fontSize: winW * 0.043, alignSelf: 'flex-start', marginLeft: winW * 0.08, marginTop: winH * 0.01 }}>Material / Texture</Text>
            {renderTagRow(material, setMaterial)}
            {/* Signature Features */}
            <Text style={{ fontFamily: patchworkFonts.patchworkPoppinsMedium, color: '#fff', fontSize: winW * 0.043, alignSelf: 'flex-start', marginLeft: winW * 0.08, marginTop: winH * 0.01 }}>Signature Features</Text>
            {renderTagRow(features, setFeatures)}
            {/* Scale & Build */}
            <Text style={{ fontFamily: patchworkFonts.patchworkPoppinsMedium, color: '#fff', fontSize: winW * 0.043, alignSelf: 'flex-start', marginLeft: winW * 0.08, marginTop: winH * 0.01 }}>Scale & Build</Text>
            {renderDropdownInput(scaleBuild, setScaleBuild, 'Scale & Build', PatchworkStoryFrankenForgeMonsterOptions.step2.scaleBuild)}
            {/* Senses */}
            <Text style={{ fontFamily: patchworkFonts.patchworkPoppinsMedium, color: '#fff', fontSize: winW * 0.043, alignSelf: 'flex-start', marginLeft: winW * 0.08, marginTop: winH * 0.01 }}>Senses</Text>
            {renderDropdownInput(senses, setSenses, 'Senses', PatchworkStoryFrankenForgeMonsterOptions.step2.senses)}
            {/* Quirks */}
            <Text style={{ fontFamily: patchworkFonts.patchworkPoppinsMedium, color: '#fff', fontSize: winW * 0.043, alignSelf: 'flex-start', marginLeft: winW * 0.08, marginTop: winH * 0.01 }}>Quirks</Text>
            {renderDropdownInput(quirks, setQuirks, 'Quirks', PatchworkStoryFrankenForgeMonsterOptions.step2.quirks)}
            {/* Next Step Button */}
            <PatchworkStoryFrankenButton
                patchwoekStoryTextProp={'Next'}
                patchwoekStoryFrankenW={forgeDims.width * 0.75}
                patchwoekStoryFrankenH={forgeDims.height * 0.091}
                fontSize={forgeDims.width * 0.04}
                onPress={handleNextSlide}
                style={{ alignSelf: 'center', marginTop: winH * 0.03 }}
            />
        </View>
    );

    const renderStep3 = () => (
        <View style={{ width: '100%', alignItems: 'center', marginTop: winH * 0.03, paddingBottom: forgeDims.height * 0.13 }}>
            {/* Birthplace / Lab */}
            <Text style={{ fontFamily: patchworkFonts.patchworkPoppinsMedium, color: '#fff', fontSize: winW * 0.043, alignSelf: 'flex-start', marginLeft: winW * 0.08, marginTop: winH * 0.03 }}>Birthplace / Lab</Text>
            {renderStoneInput(birthplace, setBirthplace, 'Birthplace / Lab', false, PatchworkStoryFrankenForgeMonsterOptions.step3.birthplace)}
            {/* Creator / Influence */}
            <Text style={{ fontFamily: patchworkFonts.patchworkPoppinsMedium, color: '#fff', fontSize: winW * 0.043, alignSelf: 'flex-start', marginLeft: winW * 0.08, marginTop: winH * 0.02 }}>Creator / Influence</Text>
            {renderStoneInput(creator, setCreator, 'Creator / Influence', false, PatchworkStoryFrankenForgeMonsterOptions.step3.creator)}
            {/* Catalyst Event */}
            <Text style={{ fontFamily: patchworkFonts.patchworkPoppinsMedium, color: '#fff', fontSize: winW * 0.043, alignSelf: 'flex-start', marginLeft: winW * 0.08, marginTop: winH * 0.02 }}>Catalyst Event</Text>
            {renderStoneInput(catalyst, setCatalyst, 'Catalyst Event', true, PatchworkStoryFrankenForgeMonsterOptions.step3.catalyst)}
            {/* Taboos & Wards */}
            <Text style={{ fontFamily: patchworkFonts.patchworkPoppinsMedium, color: '#fff', fontSize: winW * 0.043, alignSelf: 'flex-start', marginLeft: winW * 0.08, marginTop: winH * 0.02 }}>Taboos & Wards</Text>
            {renderStoneInput(taboos, setTaboos, 'Taboos & Wards', false, PatchworkStoryFrankenForgeMonsterOptions.step3.taboos)}
            {/* Token / Relic */}
            <Text style={{ fontFamily: patchworkFonts.patchworkPoppinsMedium, color: '#fff', fontSize: winW * 0.043, alignSelf: 'flex-start', marginLeft: winW * 0.08, marginTop: winH * 0.02 }}>Token / Relic</Text>
            {renderStoneInput(token, setToken, 'Token / Relic', false, PatchworkStoryFrankenForgeMonsterOptions.step3.token)}
            {/* Rumors & Myths */}
            <Text style={{ fontFamily: patchworkFonts.patchworkPoppinsMedium, color: '#fff', fontSize: winW * 0.043, alignSelf: 'flex-start', marginLeft: winW * 0.08, marginTop: winH * 0.02 }}>Rumors & Myths</Text>
            {renderStoneInput(rumors, setRumors, 'Rumors & Myths', true, PatchworkStoryFrankenForgeMonsterOptions.step3.rumors)}
            {/* Next Step Button */}
            <PatchworkStoryFrankenButton
                patchwoekStoryTextProp={'Next'}
                patchwoekStoryFrankenW={forgeDims.width * 0.75}
                patchwoekStoryFrankenH={forgeDims.height * 0.091}
                fontSize={forgeDims.width * 0.04}
                onPress={handleNextSlide}
                style={{ alignSelf: 'center', marginTop: winH * 0.03 }}
            />
        </View>
    );

    const renderStep4 = () => (
        <View style={{ width: '100%', alignItems: 'center', marginTop: winH * 0.03, paddingBottom: forgeDims.height * 0.13 }}>
            {/* Primary Ability */}
            <Text style={{ fontFamily: patchworkFonts.patchworkPoppinsMedium, color: '#fff', fontSize: winW * 0.043, alignSelf: 'flex-start', marginLeft: winW * 0.08, marginTop: winH * 0.03 }}>Primary Ability</Text>
            {renderStoneInput(primaryAbility, setPrimaryAbility, 'Primary Ability', false, PatchworkStoryFrankenForgeMonsterOptions.step4.primaryAbility)}
            {/* Secondary Ability */}
            <Text style={{ fontFamily: patchworkFonts.patchworkPoppinsMedium, color: '#fff', fontSize: winW * 0.043, alignSelf: 'flex-start', marginLeft: winW * 0.08, marginTop: winH * 0.02 }}>Secondary Ability</Text>
            {renderStoneInput(secondaryAbility, setSecondaryAbility, 'Secondary Ability', false, PatchworkStoryFrankenForgeMonsterOptions.step4.secondaryAbility)}
            {/* Passive Traits */}
            <Text style={{ fontFamily: patchworkFonts.patchworkPoppinsMedium, color: '#fff', fontSize: winW * 0.043, alignSelf: 'flex-start', marginLeft: winW * 0.08, marginTop: winH * 0.02 }}>Passive Traits</Text>
            {renderTagRow(passiveTraits, setPassiveTraits)}
            {/* Weakness / Cost */}
            <Text style={{ fontFamily: patchworkFonts.patchworkPoppinsMedium, color: '#fff', fontSize: winW * 0.043, alignSelf: 'flex-start', marginLeft: winW * 0.08, marginTop: winH * 0.02 }}>Weakness / Cost</Text>
            {renderStoneInput(weakness, setWeakness, 'Weakness / Cost', false, PatchworkStoryFrankenForgeMonsterOptions.step4.weakness)}
            {/* Next Step Button */}
            <PatchworkStoryFrankenButton
                patchwoekStoryTextProp={'Next'}
                patchwoekStoryFrankenW={forgeDims.width * 0.75}
                patchwoekStoryFrankenH={forgeDims.height * 0.091}
                fontSize={forgeDims.width * 0.04}
                onPress={handleNextSlide}
                style={{ alignSelf: 'center', marginTop: winH * 0.03 }}
            />
        </View>
    );

    const renderStep5 = () => (
        <View style={{ width: '100%', alignItems: 'center', marginTop: winH * 0.03, paddingBottom: forgeDims.height * 0.13 }}>
            {/* Voice & Demeanor */}
            <Text style={{ fontFamily: patchworkFonts.patchworkPoppinsMedium, color: '#fff', fontSize: winW * 0.043, alignSelf: 'flex-start', marginLeft: winW * 0.08, marginTop: winH * 0.03 }}>Voice & Demeanor</Text>
            {renderStoneInput(voice, setVoice, 'Voice & Demeanor', true, PatchworkStoryFrankenForgeMonsterOptions.step5.voice)}
            {/* Core Drives / Goals */}
            <Text style={{ fontFamily: patchworkFonts.patchworkPoppinsMedium, color: '#fff', fontSize: winW * 0.043, alignSelf: 'flex-start', marginLeft: winW * 0.08, marginTop: winH * 0.02 }}>Core Drives / Goals</Text>
            {renderSelectableTagRow(PatchworkStoryFrankenForgeMonsterOptions.step5.coreDrives, coreDrives, setCoreDrives)}
            {/* Allies & Bonds */}
            <Text style={{ fontFamily: patchworkFonts.patchworkPoppinsMedium, color: '#fff', fontSize: winW * 0.043, alignSelf: 'flex-start', marginLeft: winW * 0.08, marginTop: winH * 0.02 }}>Allies & Bonds</Text>
            {renderSelectableTagRow(PatchworkStoryFrankenForgeMonsterOptions.step5.alliesBonds, alliesBonds, setAlliesBonds)}
            {/* Conflicts & Fears */}
            <Text style={{ fontFamily: patchworkFonts.patchworkPoppinsMedium, color: '#fff', fontSize: winW * 0.043, alignSelf: 'flex-start', marginLeft: winW * 0.08, marginTop: winH * 0.02 }}>Conflicts & Fears</Text>
            {renderStoneInput(conflicts, setConflicts, 'Conflicts & Fears', false, PatchworkStoryFrankenForgeMonsterOptions.step5.conflicts)}
            {/* Story Hooks */}
            <Text style={{ fontFamily: patchworkFonts.patchworkPoppinsMedium, color: '#fff', fontSize: winW * 0.043, alignSelf: 'flex-start', marginLeft: winW * 0.08, marginTop: winH * 0.02 }}>Story Hooks</Text>
            {renderStoneInput(storyHooks, setStoryHooks, 'Story Hooks', true, PatchworkStoryFrankenForgeMonsterOptions.step5.storyHooks)}
            {/* Forge Monster Button */}
            <PatchworkStoryFrankenButton
                patchwoekStoryTextProp={'Forge Monster'}
                patchwoekStoryFrankenW={forgeDims.width * 0.75}
                patchwoekStoryFrankenH={forgeDims.height * 0.091}
                fontSize={forgeDims.width * 0.04}
                onPress={handleForgeMonster}
                style={{ alignSelf: 'center', marginTop: winH * 0.03, opacity: voice && coreDrives.length && alliesBonds.length && conflicts && storyHooks ? 1 : 0.3 }}
            />
        </View>
    );

    return (
        <Modal visible={visible} animationType="fade" transparent>
            <View style={{ flex: 1 }}>
                <Image source={modalBgImg} style={{ position: 'absolute', width: winW, height: winH, top: 0, left: 0 }} resizeMode="cover" />
                <SafeAreaView />
                {renderHeader()}
                {renderPaginator()}
                <View style={{ flex: 1, width: winW, height: winH }}>
                    <ScrollView
                        ref={scrollRef}
                        style={{ width: '100%' }}
                        contentContainerStyle={{ alignItems: 'center', paddingBottom: winH * 0.08, paddingTop: winH * 0.01 }}
                        showsVerticalScrollIndicator={false}
                    >
                        {step === 0 && renderStep1()}
                        {step === 1 && renderStep2()}
                        {step === 2 && renderStep3()}
                        {step === 3 && renderStep4()}
                        {step === 4 && renderStep5()}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default PatchworkStoryFrankenForgeMonsterModal;
