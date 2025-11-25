import { BlurView } from '@react-native-community/blur';
import React, { useCallback as useForgeCallback, useState as useForgeState, useEffect as useForgeEffect, } from 'react';
import {
    Dimensions as ForgeScreen,
    SafeAreaView as ForgeSafe,
    Pressable as ForgePress,
    Text as ForgeText,
    Image as ForgeImg,
    View as ForgeBox,
} from 'react-native';
import PatchworkStoryFrankenForgeButton from '../PatchworkStoryFrankenForgeComponents/PatchworkStoryFrankenButton';
import { fonts as forgeFonts } from '../fonts';

type GameProps = {
    forgePageOpened: string;
    setForgePageOpened: (next: string) => void;
};

// === CONSTS ===
const ITEM_SIZE = 60;
const FALL_SPEED = 4;
const SPAWN_INTERVAL = 1200;

const ITEM_TYPES = [
    { name: 'nose', img: require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/gameElementsPatchwork/nose.png'), positive: true },
    { name: 'eye', img: require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/gameElementsPatchwork/eye.png'), positive: true },
    { name: 'hand', img: require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/gameElementsPatchwork/hand.png'), positive: true },
    { name: 'foot', img: require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/gameElementsPatchwork/foot.png'), positive: true },
    { name: 'ear', img: require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/gameElementsPatchwork/ear.png'), positive: true },
    { name: 'brain', img: require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/gameElementsPatchwork/brain.png'), positive: true },
    { name: "Pig's nose", img: require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/gameElementsPatchwork/pigNose.png'), positive: false },
    { name: "Cat's paw", img: require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/gameElementsPatchwork/catPaw.png'), positive: false },
    { name: "Dog's ear", img: require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/gameElementsPatchwork/dogEar.png'), positive: false },
    { name: 'Tail', img: require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/gameElementsPatchwork/tail.png'), positive: false },
];

function pickRandomPart() {
    const idx = Math.floor(Math.random() * ITEM_TYPES.length);
    return { ...ITEM_TYPES[idx] };
}

const PatchworkStoryFrankenForgeGame: React.FC<GameProps> = ({ setForgePageOpened }) => {
    const { width: sw, height: sh } = ForgeScreen.get('window');

    // === STATES ===
    const [sessionActive, setSessionActive] = useForgeState(false);
    const [recentCatch, setRecentCatch] = useForgeState<string | null>(null);
    const [fallingParts, setFallingParts] = useForgeState<any[]>([]);
    const [roundEnded, setRoundEnded] = useForgeState(false);
    const [playerScore, setPlayerScore] = useForgeState(0);
    const [missedItem, setMissedItem] = useForgeState<{name: string, img: any} | null>(null);

    // === SPAWN LOOP ===
    useForgeEffect(() => {
        if (!sessionActive || roundEnded) return;
        const timer = setInterval(() => {
            setFallingParts(prev => [
                ...prev,
                { ...pickRandomPart(), x: Math.random() * (sw - ITEM_SIZE), y: 0, id: Math.random().toString(36) },
            ]);
        }, SPAWN_INTERVAL);
        return () => clearInterval(timer);
    }, [sessionActive, roundEnded]);

    // === COLLISIONS ===
    const detectHits = useForgeCallback(() => {
        setFallingParts(prev =>
            prev.filter(part => {
                if (part.positive && part.y > sh - 10) {
                    console.log('Game Over: missed positive item', part.name);
                    setMissedItem({ name: part.name, img: part.img });
                    setRoundEnded(true); // Game Over: missed positive item
                    return false;
                }
                if (!part.positive && part.y > sh) {
                    console.log('Missed negative item (just removed):', part.name);
                    return false;
                }
                return true;
            })
        );
    }, [sh]);

    // === FALL LOOP ===
    useForgeEffect(() => {
        if (!sessionActive || roundEnded) return;
        const anim = setInterval(() => {
            setFallingParts(prev => prev.map(p => ({ ...p, y: p.y + FALL_SPEED })));
            detectHits();
        }, 16);
        return () => clearInterval(anim);
    }, [sessionActive, roundEnded, detectHits]);

    return (
        <ForgeSafe style={{ flex: 1 }}>
            <ForgeBox style={{ flex: 1, alignItems: 'center' }}>
                {!sessionActive ? (
                    <>
                        <ForgeText
                            style={{
                                marginTop: sh * 0.02,
                                color: '#fff',
                                fontFamily: forgeFonts.patchworkMochiyPopOne,
                                textAlign: 'center',
                                fontSize: sw * 0.071,
                            }}
                        >
                            Laboratory
                        </ForgeText>

                        <ForgeImg
                            source={require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/scientist.png')}
                            style={{ width: sw * 0.9, height: sh * 0.4, marginTop: sh * 0.03 }}
                            resizeMode="contain"
                        />
                        <ForgeText
                            style={{
                                color: '#ffffff',
                                fontSize: sw * 0.043,
                                textAlign: 'center',
                                marginTop: sh * 0.024,
                                fontFamily: forgeFonts.patchworkPoppinsBold,
                                paddingHorizontal: sw * 0.06,
                            }}
                        >
                            The room smells like ink and rain
                        </ForgeText>
                        <ForgeText
                            style={{
                                color: '#ffffff',
                                fontSize: sw * 0.041,
                                marginTop: sh * 0.012,
                                fontFamily: forgeFonts.patchworkPoppinsMedium,
                                textAlign: 'center',
                                paddingHorizontal: sw * 0.06,
                            }}
                        >
                            A story wants in. Let chance open the door or write the lockpick yourself
                        </ForgeText>
                        <PatchworkStoryFrankenForgeButton
                            style={{ marginTop: sh * 0.034 }}
                            patchwoekStoryFrankenW={sw * 0.74}
                            onPress={() => setSessionActive(true)}
                            patchwoekStoryFrankenH={sh * 0.09}
                            fontSize={sw * 0.036}
                            patchwoekStoryTextProp="Begin a New Story"
                        />
                    </>
                ) : (
                    <ForgeBox style={{ flex: 1, width: sw, height: sh }}>
                        {/* HUD */}
                        <ForgeSafe
                            style={{
                                justifyContent: 'space-between',
                                width: sw * 0.88,
                                alignItems: 'center',
                                flexDirection: 'row',
                                alignSelf: 'center',
                            }}
                        >
                            <ForgeText
                                style={{
                                    color: '#fff',
                                    fontSize: sw * 0.07,
                                    fontFamily: forgeFonts.patchworkMochiyPopOne,
                                }}
                            >
                                Score: {playerScore}
                            </ForgeText>
                            <ForgePress onPress={() => {
                                setPlayerScore(0);
                                setFallingParts([]);
                                setRoundEnded(false);
                                setRecentCatch(null);
                                setSessionActive(false);
                                setRoundEnded(false);
                            }} style={{ zIndex: 10 }}>
                                <ForgeImg
                                    source={require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/closeIcon.png')}
                                    style={{ width: sw * 0.14, height: sw * 0.14 }}
                                />
                            </ForgePress>
                        </ForgeSafe>

                        {/* ITEMS */}
                        {fallingParts.map(part => (
                            <ForgePress
                                key={part.id}
                                style={{ position: 'absolute', left: part.x, top: part.y, width: ITEM_SIZE, height: ITEM_SIZE }}
                                onPress={() => {
                                    setFallingParts(prev => prev.filter(p => p.id !== part.id));
                                    setRecentCatch(part.name);
                                    if (part.positive) {
                                        setPlayerScore(s => s + 1);
                                        console.log('Tapped positive item:', part.name);
                                    } else {
                                        console.log('Game Over: tapped negative item (press)', part.name);
                                        setRoundEnded(true);
                                    }
                                }}
                            >
                                <ForgeImg source={part.img} style={{ width: ITEM_SIZE, height: ITEM_SIZE, resizeMode: 'contain' }} />
                            </ForgePress>
                        ))}
                    </ForgeBox>
                )}
            </ForgeBox>

            {/* CATCH INFO */}
            {recentCatch && (
                <ForgeBox style={{ position: 'absolute', bottom: sh * 0.08, width: sw, alignItems: 'center' }}>
                    <ForgeText
                        style={{ color: '#fff', fontSize: sw * 0.045, fontFamily: forgeFonts.patchworkPoppinsMedium }}
                    >
                        You caught: {recentCatch}
                    </ForgeText>
                </ForgeBox>
            )}

            {/* GAME OVER */}
            {roundEnded && (
                <ForgeBox
                    style={{
                        zIndex: 100,
                        alignItems: 'center',
                        left: 0,
                        width: sw,
                        height: sh,
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        top: 0,
                        justifyContent: 'center',
                        position: 'absolute',
                    }}
                >
                    <BlurView
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
                        blurType="dark"
                        blurAmount={1}
                        reducedTransparencyFallbackColor="#0e86ffff"
                    />
                    <ForgeBox
                        style={{
                            alignItems: 'center',
                            top: 0,
                            backgroundColor: 'rgba(51, 48, 235, 0.17)',
                            left: 0,
                            width: sw,
                            height: sh,
                            position: 'absolute',
                            justifyContent: 'center',
                        }}
                    />
                    <ForgeBox style={{ alignItems: 'center' }}>
                        <ForgeText
                            style={{
                                color: '#fff',
                                fontSize: sw * 0.08,
                                fontFamily: forgeFonts.patchworkMochiyPopOne,
                                marginBottom: 20,
                            }}
                        >
                            Game Over
                        </ForgeText>
                        {missedItem ? (
                            <>
                                <ForgeText
                                    style={{ color: '#fff', fontSize: sw * 0.045, fontFamily: forgeFonts.patchworkPoppinsMedium, marginBottom: 10 }}
                                >
                                    You missed {missedItem.name}
                                </ForgeText>
                                <ForgeImg source={missedItem.img} style={{ width: 60, height: 60, resizeMode: 'contain', marginBottom: 20 }} />
                            </>
                        ) : null}
                        <PatchworkStoryFrankenForgeButton
                            patchwoekStoryFrankenH={sh * 0.07}
                            patchwoekStoryFrankenW={sw * 0.5}
                            patchwoekStoryTextProp="Restart"
                            fontSize={sw * 0.04}
                            onPress={() => {
                                setPlayerScore(0);
                                setFallingParts([]);
                                setRoundEnded(false);
                                setRecentCatch(null);
                                setMissedItem(null);
                            }}
                        />
                        <ForgeText
                            style={{
                                color: '#fff',
                                fontSize: sw * 0.045,
                                fontFamily: forgeFonts.patchworkPoppinsMedium,
                                marginTop: 30,
                            }}
                        >
                            Forbidden items:
                        </ForgeText>
                        <ForgeBox style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                            {ITEM_TYPES.filter(i => !i.positive).map(i => (
                                <ForgeBox key={i.name} style={{ alignItems: 'center', marginHorizontal: 8 }}>
                                    <ForgeImg source={i.img} style={{ width: 40, height: 40, resizeMode: 'contain' }} />
                                    <ForgeText style={{ color: '#fff', fontSize: sw * 0.03, marginTop: sh * 0.01 }}>{i.name}</ForgeText>
                                </ForgeBox>
                            ))}
                        </ForgeBox>
                    </ForgeBox>
                </ForgeBox>
            )}
        </ForgeSafe>
    );
};

export default PatchworkStoryFrankenForgeGame;
