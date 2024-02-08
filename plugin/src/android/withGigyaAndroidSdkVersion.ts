import {
  ConfigPlugin,
  withAppBuildGradle,
} from "@expo/config-plugins";
import { mergeContents, removeContents } from "@expo/config-plugins/build/utils/generateCode";

interface Props {
  version: string
}

const CONTENTS_TAG = '@allboatsrise/expo-gigya(gigya-android-sdk-version)'

export const withGigyaAndroidSdkVersion: ConfigPlugin<Props> = (config, props) => {
  return withAppBuildGradle(config, async config => {
    let newContents
    if (props.version) {
      newContents = mergeContents({
        src: config.modResults.contents,
        newSrc: `    implementation 'com.sap.oss.gigya-android-sdk:sdk-core:${props.version}'`,
        anchor: /dependencies\s?{/,
        offset: 1,
        tag: CONTENTS_TAG,
        comment: '//'
      }).contents
    } else {
      newContents = removeContents({
        src: config.modResults.contents,
        tag: CONTENTS_TAG,
      }).contents
    }
    
    config.modResults.contents = newContents
    return config
  })
}
  