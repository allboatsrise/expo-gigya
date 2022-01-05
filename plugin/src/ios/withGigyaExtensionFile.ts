import fs from 'fs'
import {
  ConfigPlugin
} from "@expo/config-plugins";
import { withBuildSourceFile } from '@expo/config-plugins/build/ios/XcodeProjectFile';

interface Props {
  file: string
}

export const withGigyaExtensionFile: ConfigPlugin<Props> = (config, {file}) => {
  return withBuildSourceFile(config, {
    filePath: 'GigyaExtension.swift',
    contents: fs.readFileSync(file, 'utf8'),
  });
}
