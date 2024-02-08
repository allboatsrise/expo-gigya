import { z } from 'zod';

export type GigyaPluginProps = z.infer<typeof GigyaPluginPropsSchema>

export const GigyaPluginPropsSchema = z.object({
  gigyaAndroidSdkVersion: z.string({required_error: 'Must provide SAP CDC (Gigya) Android Core SDK version. (e.g. "7.0.8")'}),
  gigyaSwiftSdkVersion: z.string({required_error: 'Must provide SAP CDC (Gigya) Swift Core Library version. (e.g. "1.5.9")'}),
})
