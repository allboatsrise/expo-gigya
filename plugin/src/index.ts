import fs from 'fs';
import path from 'path';
import { ConfigPlugin, createRunOncePlugin } from '@expo/config-plugins';
import { GigyaPluginProps } from './types';

import { withMainApplicationSetup } from './android/withMainApplicationSetup';
import { withAppDelegateSetup } from './ios/withAppDelegateSetup';
import { withGigyaExtensionFile } from './ios/withGigyaExtensionFile';

/**
 * Plugin based on integration instructions for @sap_oss/gigya-react-native-plugin-for-sap-customer-data-cloud package
 * @see https://github.com/SAP/gigya-react-native-plugin-for-sap-customer-data-cloud/blob/329c26c063b4c69342e522904e8326b814a9d7cd/README.md#setup--gigya-core-integration
 * @param config 
 * @param props 
 * @returns 
 */
const withGigya: ConfigPlugin<Partial<GigyaPluginProps> | undefined> = (config, props) => {
  // android
  config = withMainApplicationSetup(config, props);

  // ios
  config = withAppDelegateSetup(config, props);
  config = withGigyaExtensionFile(config, {file: path.join(path.dirname(__dirname), 'assets', 'GigyaExtension.swift')});
  
  return config;
};

const pkg = JSON.parse(fs.readFileSync(path.join(path.dirname(path.dirname(__dirname)), 'package.json'), 'utf8'));
export default createRunOncePlugin(withGigya, pkg.name, pkg.version);
