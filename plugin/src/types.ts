import { z } from 'zod';

export type GigyaPluginProps = z.infer<typeof GigyaPluginPropsSchema>

export const GigyaPluginPropsSchema = z.object({
  gigyaAndroidSdkVersion: z.string({required_error: 'Must provide SAP CDC (Gigya) Android Core SDK version.'}).default('7.1.7'),
  gigyaSwiftSdkVersion: z.string({required_error: 'Must provide SAP CDC (Gigya) Swift Core Library version.'}).default('1.7.5'),
})
