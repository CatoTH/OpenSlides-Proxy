import * as dotenv from 'dotenv';

dotenv.config();

export interface Configuration {
  openSlidesHostname: string;
  openSlidesPort: number;
  openSlidesUsername: string;
  openSlidesPassword: string;
  openSlidesAllowSelfSignedCerts: boolean;
  forwardUri: string;
  forwardApiKey: string;
}

export default {
  openSlidesHostname: process.env.OS_HOSTNAME ?? '',
  openSlidesPort: process.env.OS_PORT ?? -1,
  openSlidesUsername: process.env.OS_USERNAME ?? '',
  openSlidesPassword: process.env.OS_PASSWORD ?? '',
  openSlidesAllowSelfSignedCerts: (process.env.OS_ALLOW_SELF_SIGNED === '1'),
  forwardUri: process.env.FORWARD_URI ?? '',
  forwardApiKey: process.env.FORWARD_API_KEY ?? '',
} as Configuration;
