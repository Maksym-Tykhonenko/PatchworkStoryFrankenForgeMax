const { width: forgeWidth } = ForgeDims.get('window');
import React from 'react';
import {
  TouchableOpacity as ForgePress,
  Text as ForgeTxt,
  ImageBackground as ForgeBg,
  Dimensions as ForgeDims,
  GestureResponderEvent,
} from 'react-native';
import { fonts as forgeFonts } from '../fonts';


interface EnigmaButtonWithBorderProps {
  onPress: (event: GestureResponderEvent) => void;
  fontSize?: number;
  patchwoekStoryTextProp: string;
  patchwoekStoryFrankenH?: number;
  patchwoekStoryFrankenW?: number;
  style?: object;
}

const PatchworkStoryFrankenForgeButton: React.FC<EnigmaButtonWithBorderProps> = ({
  onPress,
  patchwoekStoryFrankenH,
  patchwoekStoryFrankenW,
  fontSize,
  patchwoekStoryTextProp,
  style,
}) => {
  return (
    <ForgePress onPress={onPress} activeOpacity={0.8} style={[{ margin: patchwoekStoryFrankenH * 0.016 }, style]}>
      <ForgeBg
        source={require('../PatchworkStoryFrankenForgeAssets/PatchworkStoryFrankenForgeImages/patchworkButton.png')}
        style={{
          width: patchwoekStoryFrankenW,
          height: patchwoekStoryFrankenH,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        resizeMode="stretch"
      >
        <ForgeTxt
          style={[
            {
              fontSize: fontSize * 1.4,
              color: 'white',
              textAlign: 'center',
              fontFamily: forgeFonts.patchworkMochiyPopOne,
              top: -forgeWidth * 0.01,
            },
          ]}
        >
          {patchwoekStoryTextProp}
        </ForgeTxt>
      </ForgeBg>
    </ForgePress>
  );
};

export default PatchworkStoryFrankenForgeButton;
