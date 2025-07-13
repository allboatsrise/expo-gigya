import fs from "fs";
import path from "path";
import { ConfigPlugin, withDangerousMod } from '@expo/config-plugins';

const PROGUARD_RULES = `
# Gigya SDK rules
-keep class com.gigya.android.sdk.** { *; }
`;

// Gigya SDK does not support minification
// @see https://github.com/SAP/gigya-android-sdk/issues/32#issuecomment-987708292
export const withProguardRules: ConfigPlugin = (
  config
) => {
  return withDangerousMod(config, [
    "android",
    async (config) => {
      const projectRoot = config.modRequest.projectRoot;
      const proguardPath = path.join(
        projectRoot,
        "android",
        "app",
        "proguard-rules.pro"
      );

      // Append custom rules if not already present
      let contents = "";
      if (fs.existsSync(proguardPath)) {
        contents = fs.readFileSync(proguardPath, "utf8");
        if (!contents.includes(PROGUARD_RULES.trim())) {
          contents += `\n${PROGUARD_RULES}`;
          fs.writeFileSync(proguardPath, contents);
        }
      }
      return config;
    },
  ]);
};
