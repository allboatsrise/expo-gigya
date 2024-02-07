import fs from 'fs'
import path from 'path'
import {
  ConfigPlugin,
  withDangerousMod,
} from "@expo/config-plugins";
import { mergeContents, removeContents } from "@expo/config-plugins/build/utils/generateCode";

interface Props {
  version: string
}

const CONTENTS_TAG = '@allboatsrise/expo-gigya(gigya-swift-sdk-version)'

export const withGigyaSwiftSdkVersion: ConfigPlugin<Props> = (config, props) => {
  return withDangerousMod(config, ['ios', async (config) => {
    const filePath = path.join(config.modRequest.platformProjectRoot, 'Podfile')
    const contents = fs.readFileSync(filePath, 'utf-8')

    const newContents = mergeContents({
      src: contents,
      newSrc: `  pod 'Gigya', '${props.version}'`,
      anchor: /use_react_native/,
      offset: 0,
      tag: CONTENTS_TAG,
      comment: '#'
    }).contents

    fs.writeFileSync(filePath, newContents)
    return config
  }])
}
  