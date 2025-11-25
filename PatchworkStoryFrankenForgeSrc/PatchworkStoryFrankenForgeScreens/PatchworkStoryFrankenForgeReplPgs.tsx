import React, {
  useEffect as usePatchworkEffect,
  useState as usePatchworkState
} from 'react';
import {
  Dimensions as PatchNavWindow,
  Image as PatchNavImage,
  View as PatchNavWrap,
  Pressable as PatchNavButton,
} from 'react-native';
import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PatchworkStoryFrankenForgeGame from './PatchworkStoryFrankenForgeGame';
import PatchworkStoryFrankenForgeStoryStudio from './PatchworkStoryFrankenForgeStoryStudio';
import PatchworkStoryFrankenForgeSettings from './PatchworkStoryFrankenForgeSettings';
import PatchworkStoryFrankenForgeLibrary from './PatchworkStoryFrankenForgeLibrary';
import PatchworkStoryFrankenHome from './PatchworkStoryFrankenForgeMonsterBuilder';

// --- Навігаційні іконки ---
const navItems = [
  {
    key: 'Patchwork Story Franken Forge Monster Builder',
    icon: require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/patchworkStoryScreensIms/patchworkMonsterBuilder.png'),
  },
  {
    key: 'Patchwork Story Franken Forge Story Studio',
    icon: require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/patchworkStoryScreensIms/patchworkStoryStudio.png'),
  },
  {
    key: 'Patchwork Story Franken Forge Library',
    icon: require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/patchworkStoryScreensIms/patchworkLibrary.png'),
  },
  {
    key: 'Patchwork Story Franken Forge Game',
    icon: require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/patchworkStoryScreensIms/patchworkGame.png'),
  },
  {
    key: 'Patchwork Story Franken Settings',
    icon: require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/patchworkStoryScreensIms/patchworkSettings.png'),
  },
];

// --- Тип екранів ---
type PatchNavScreenNames =
  | 'Patchwork Story Franken Forge Monster Builder'
  | 'Patchwork Story Franken Forge Story Studio'
  | 'Patchwork Story Franken Forge Library'
  | 'Patchwork Story Franken Forge Game'
  | 'Patchwork Story Franken Settings';

// --- Музика ---
const bgMusicFile = 'bg-frankenforge-music.wav';

// --- Головний компонент ---
const PatchworkStoryFrankenForgeReplPgs: React.FC = () => {
  const [musicOn, setMusicOn] = usePatchworkState(false);
  const [screenDims, setScreenDims] = usePatchworkState(PatchNavWindow.get('window'));
  const [currentScreen, setCurrentScreen] = usePatchworkState<PatchNavScreenNames>('Patchwork Story Franken Forge Monster Builder');

  // ініціалізація AsyncStorage
  usePatchworkEffect(() => {
    const initMusic = async () => {
      let value = await AsyncStorage.getItem('musicOn');
      if (value === null) {
        await AsyncStorage.setItem('musicOn', 'true');
        value = 'true';
      }
      setMusicOn(value === 'true');
    };
    initMusic();
  }, []);

  // керування музикою
  usePatchworkEffect(() => {
    let soundInstance: Sound | null = null;
    let mounted = true;

    const setupSound = () => {
      try {
        soundInstance = new Sound(bgMusicFile, Sound.MAIN_BUNDLE, (err) => {
          if (err) {
            console.log('[MUSIC ERROR]', err);
            return;
          }
          if (!mounted || !soundInstance) return;
          soundInstance.setNumberOfLoops(-1);
          soundInstance.setVolume(musicOn ? 1 : 0);
          if (musicOn) {
            soundInstance.play((ok) => {
              console.log(ok ? '[MUSIC] started' : '[MUSIC] failed');
            });
          }
        });
      } catch (e) {
        console.log('[MUSIC INIT FAIL]', e);
      }
    };

    setupSound();

    return () => {
      mounted = false;
      if (soundInstance) {
        soundInstance.stop(() => soundInstance?.release());
      }
    };
  }, [musicOn]);

  // Вибір екрана
  const renderPatchworkScreen = () => {
    switch (currentScreen) {
      case 'Patchwork Story Franken Forge Monster Builder':
        return <PatchworkStoryFrankenHome forgePageOpened={currentScreen} setForgePageOpened={setCurrentScreen} />;
      case 'Patchwork Story Franken Forge Story Studio':
        return <PatchworkStoryFrankenForgeStoryStudio setUniqStarActiveScreen={setCurrentScreen} />;
      case 'Patchwork Story Franken Forge Library':
        return <PatchworkStoryFrankenForgeLibrary />;
      case 'Patchwork Story Franken Forge Game':
        return <PatchworkStoryFrankenForgeGame />;
      case 'Patchwork Story Franken Settings':
        return <PatchworkStoryFrankenForgeSettings musicEnabled={musicOn} setMusicEnabled={setMusicOn} />;
      default:
        return null;
    }
  };

  return (
    <PatchNavWrap style={{ flex: 1, width: screenDims.width, height: screenDims.height }}>
      {/* Фон */}
      <PatchNavImage source={require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/patchWorkBackMonster.png')}
        style={{
          alignSelf: 'center',
          position: 'absolute',
          top: -screenDims.height * 0.04,
          width: screenDims.width * 1.2,
          height: screenDims.height * 1.2,
        }}
        resizeMode="stretch"
      />

      {renderPatchworkScreen()}

      <PatchNavWrap
        style={{
          alignSelf: 'center',
          flexDirection: 'row',
          backgroundColor: '#02004E',
          width: screenDims.width * 0.8859643,
          zIndex: 100,
          bottom: screenDims.height * 0.04,
          alignItems: 'center',
          justifyContent: 'space-around',
          position: 'absolute',
          height: screenDims.width * 0.16,
          borderRadius: screenDims.width * 0.19,
        }}
      >
        {navItems.map((entry) => (
          <PatchNavButton
            key={entry.key}
            onPress={() => setCurrentScreen(entry.key as PatchNavScreenNames)}
            style={{
              height: screenDims.width * 0.17,
              justifyContent: 'center',
              flex: 1,
              alignItems: 'center',
              borderRadius: screenDims.width * 0.1,
              width: screenDims.width * 0.16,
              backgroundColor: currentScreen === entry.key ? '#E6332A' : 'transparent',
            }}
          >
            <PatchNavImage
              source={entry.icon}
              style={{
                resizeMode: 'contain',
                height: screenDims.width * 0.07,
                width: screenDims.width * 0.07,
              }}
            />
          </PatchNavButton>
        ))}
      </PatchNavWrap>
    </PatchNavWrap>
  );
};

export default PatchworkStoryFrankenForgeReplPgs;