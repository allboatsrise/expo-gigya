import {
  withMainApplication,
  ConfigPlugin,
} from "@expo/config-plugins";
import { GigyaPluginProps } from '../types';

export const withMainApplicationSetup: ConfigPlugin<GigyaPluginProps> = (config, props) => {
  return withMainApplication(config, async config => {

    console.log(config.modResults.contents);

    return config;
  })
}
