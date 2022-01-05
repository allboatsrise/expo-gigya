import {
  ConfigPlugin,
  withAppDelegate,
} from "@expo/config-plugins";
import { mergeContents } from "@expo/config-plugins/build/utils/generateCode";
import { GigyaPluginProps } from '../types';

export const withAppDelegateSetup: ConfigPlugin<GigyaPluginProps | undefined> = (config) => {
  return withAppDelegate(config, async config => {
    config.modResults.contents = mergeContents({
      src: config.modResults.contents,
      newSrc: `#import "${config.slug}-Swift.h"`,
      anchor: /#import "AppDelegate\.h"/,
      offset: 1,
      tag: '@allboatsrise/expo-gigya(header)',
      comment: '//'
    }).contents

    config.modResults.contents = mergeContents({
      src: config.modResults.contents,
      newSrc: [
        'GigyaExtension * gigya = [[GigyaExtension alloc] init];',
        '[gigya setMySchema];',
      ].join('\n'),
      anchor: /\[super application:application didFinishLaunchingWithOptions:launchOptions\];/,
      offset: 1,
      tag: '@allboatsrise/expo-gigya(didFinishLaunchingWithOptions)',
      comment: '//'
    }).contents

    return config;
  })
}
  