# @allboatsrise/expo-gigya

Expo module for SAP Customer Data Cloud (Gigya)

Plugin based on integration instructions for [sap_oss/gigya-react-native-plugin-for-sap-customer-data-cloud](https://github.com/SAP/gigya-react-native-plugin-for-sap-customer-data-cloud) package.

## Installation

Install npm package:
```bash
yarn add @allboatsrise/expo-gigya @sap_oss/gigya-react-native-plugin-for-sap-customer-data-cloud
```

Add plugin to `app.json`/`app.plugin.js`:

```json
{
  "expo": {
    "plugins": [
      [
        "@allboatsrise/expo-gigya",
        {
          "gigyaAndroidSdkVersion": "7.0.8",
          "gigyaSwiftSdkVersion": "1.5.9"
        }
      ]
    ],
  }
}
```
