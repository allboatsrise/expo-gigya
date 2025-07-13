import {
  ConfigPlugin,
  withAppDelegate,
} from "@expo/config-plugins";
import { mergeContents } from "@expo/config-plugins/build/utils/generateCode";

export const withAppDelegateSetup: ConfigPlugin = (config) => {
  return withAppDelegate(config, async config => {
    config.modResults.contents = mergeContents({
      src: config.modResults.contents,
      newSrc: [
        'let gigya = GigyaExtension()',
        'gigya.setMySchema()',
      ].join('\n'),
      anchor: /return super.application\(application, didFinishLaunchingWithOptions: launchOptions\)/,
      offset: 0,
      tag: '@allboatsrise/expo-gigya(didFinishLaunchingWithOptions)',
      comment: '//'
    }).contents

    return config;
  })
}
  