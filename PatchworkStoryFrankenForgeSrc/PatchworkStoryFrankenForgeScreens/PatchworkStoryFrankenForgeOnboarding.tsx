import React from 'react';
import { useState as useForgePatchState } from 'react';
import { useNavigation as useForgePatchNav } from '@react-navigation/native';
import {
    View as ForgePatchBox,
    Image as ForgePatchImg,
    Dimensions as ForgePatchDims,
} from 'react-native';
import PatchworkStoryFrankenButton from '../PatchworkStoryFrankenForgeComponents/PatchworkStoryFrankenButton';

const forgePatchSlides = [
    require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/patchworkEntryImages/patchworkEntry1.png'),
    require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/patchworkEntryImages/patchworkEntry2.png'),
    require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/patchworkEntryImages/patchworkEntry3.png'),
];

const PatchworkStoryFrankenForgeOnboarding: React.FC = () => {
    const navHandler = useForgePatchNav();
    const [stepIndex, setStepIndex] = useForgePatchState(0);

    const handleNextSlide = () => {
        if (stepIndex < forgePatchSlides.length - 1) {
            setStepIndex(stepIndex + 1);
        } else {
            navHandler.replace?.('PatchworkStoryFrankenForgeReplPgs');
        }
    };

    const forgeDims = ForgePatchDims.get('window');

    const renderCurrentForgePatchSlide = () => {
        const slide = forgePatchSlides[stepIndex];
        return (
            <>
                <ForgePatchImg
                    source={slide}
                    style={{
                        height: forgeDims.height,
                        width: forgeDims.width,
                    }}
                    resizeMode="cover"
                />

                <PatchworkStoryFrankenButton
                    patchwoekStoryTextProp={'Next'}
                    patchwoekStoryFrankenW={forgeDims.width * 0.75}
                    patchwoekStoryFrankenH={forgeDims.height * 0.091}
                    fontSize={forgeDims.width * 0.04}
                    onPress={handleNextSlide}
                    style={{
                        position: 'absolute',
                        bottom: forgeDims.height * 0.03,
                        alignSelf: 'center',
                    }}
                />
            </>
        );
    };

    return (
        <ForgePatchBox style={{ flex: 1, alignItems: 'center' }}>
            {renderCurrentForgePatchSlide()}
        </ForgePatchBox>
    );
};

export default PatchworkStoryFrankenForgeOnboarding;
