import * as dotenv from 'dotenv';

dotenv.config();

export interface Configuration {
  openSlidesHostname: string;
  openSlidesPort: number;
  openSlidesUsername: string;
  openSlidesPassword: string;
  openSlidesAllowSelfSignedCerts: boolean;
  openSlidesIpFamily: number;
  forwardUri: string;
  forwardApiKey: string;
}

let osIpFamily;
if (process.env.OS_IP_FAMILY === '4' || process.env.OS_IP_FAMILY === '6') {
  osIpFamily = parseInt(process.env.OS_IP_FAMILY, 10);
} else {
  osIpFamily = null;
}

export default {
  openSlidesHostname: process.env.OS_HOSTNAME ?? '',
  openSlidesPort: process.env.OS_PORT ?? -1,
  openSlidesUsername: process.env.OS_USERNAME ?? '',
  openSlidesPassword: process.env.OS_PASSWORD ?? '',
  openSlidesAllowSelfSignedCerts: (process.env.OS_ALLOW_SELF_SIGNED === '1'),
  openSlidesIpFamily: osIpFamily,
  forwardUri: process.env.FORWARD_URI ?? '',
  forwardApiKey: process.env.FORWARD_API_KEY ?? '',
} as Configuration;
