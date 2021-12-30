import { ConfigPlugin, createRunOncePlugin } from '@expo/config-plugins';
import { GigyaPluginProps } from './types';

import { withMainApplicationSetup } from './android/withMainApplicationSetup';

const pkg = require('@allboatsrise/expo-gigya/package.json');

const ERROR_PREFIX = 'Gigya Plugin:';

const withGigya: ConfigPlugin<Partial<GigyaPluginProps> | undefined> = (config, props) => {
  if (!props) {
    throw new Error(`${ERROR_PREFIX} Must configure plugin options.`);
  }

  const {apiKey, apiDomain = 'us1.gigya.com'} = props;

  if (!apiKey) {
    throw new Error(`${ERROR_PREFIX} Must specify apiKey property.`);
  }

  config = withMainApplicationSetup(config, {...props, apiKey, apiDomain});
  return config;
};

export default createRunOncePlugin(withGigya, pkg.name, pkg.version);
