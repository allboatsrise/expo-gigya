import fs from 'fs';
import path from 'path';
import { ConfigPlugin, createRunOncePlugin } from '@expo/config-plugins';
import { GigyaPluginProps, GigyaPluginPropsSchema } from './types';

import { withMainApplicationSetup } from './android/withMainApplicationSetup';
import { withAppDelegateSetup } from './ios/withAppDelegateSetup';
import { withGigyaExtensionFile } from './ios/withGigyaExtensionFile';
import { withGigyaSwiftSdkVersion } from './ios/withGigyaSwiftSdkVersion';
import { withGigyaAndroidSdkVersion } from './android/withGigyaAndroidSdkVersion';
import { withProguardRules } from './android/withProguardRules';

const pkg = JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), 'package.json'), 'utf8'));

/**
 * Plugin based on integration instructions for @sap_oss/gigya-react-native-plugin-for-sap-customer-data-cloud package
 * @see https://github.com/SAP/gigya-react-native-plugin-for-sap-customer-data-cloud/blob/329c26c063b4c69342e522904e8326b814a9d7cd/README.md#setup--gigya-core-integration
 * @param config 
 * @param props 
 * @returns 
 */
const withGigya: ConfigPlugin<GigyaPluginProps | unknown> = (config, unsafeProps) => {
  const result = GigyaPluginPropsSchema.safeParse(unsafeProps)

  if (!result.success) {
    throw new Error(`${pkg.name}: ${result.error.toString()}`);
  }

  const props = result.data

  // android
  config = withMainApplicationSetup(config);
  config = withGigyaAndroidSdkVersion(config, {version: props.gigyaAndroidSdkVersion})
  config = withProguardRules(config)

  // ios
  config = withAppDelegateSetup(config);
  config = withGigyaExtensionFile(config, {file: path.join(path.dirname(__dirname), 'assets', 'GigyaExtension.swift')});
  config = withGigyaSwiftSdkVersion(config, {version: props.gigyaSwiftSdkVersion})
  
  return config;
};

export default createRunOncePlugin(withGigya, pkg.name, pkg.version);
