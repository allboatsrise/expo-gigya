import {
  withMainApplication,
  ConfigPlugin,
} from "@expo/config-plugins";
import { mergeContents } from "@expo/config-plugins/build/utils/generateCode";
import { GigyaPluginProps } from '../types';

export const withMainApplicationSetup: ConfigPlugin<GigyaPluginProps | undefined> = (config) => {
  return withMainApplication(config, async config => {

    config.modResults.contents = mergeContents({
      src: config.modResults.contents,
      newSrc: [
        'import com.gigya.android.sdk.account.models.GigyaAccount;',
        'import com.sap.gigya_rn_plugin.GigyaSdkModule;'
      ].join('\n'),
      anchor: /public class MainApplication/,
      offset: 0,
      tag: '@allboatsrise/expo-gigya(header)',
      comment: '//'
    }).contents

    config.modResults.contents = mergeContents({
      src: config.modResults.contents,
      newSrc: [
        'GigyaSdkModule.setSchema(this, GigyaAccount.class);',
      ].join('\n'),
      anchor: /super\.onCreate\(\);/,
      offset: 1,
      tag: '@allboatsrise/expo-gigya(onCreate)',
      comment: '//'
    }).contents

    return config;
  })
}
