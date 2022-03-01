import * as https from "https";
import { Configuration } from './config';
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import { EventListener } from './event-listener';
import {RequestOptions} from "https";

export class OpenslidesClient {
  private instance: AxiosInstance;
  private sessionId: string;

  private listeners: EventListener[] = [];

  constructor(private config: Configuration) {
    if (this.config.openSlidesAllowSelfSignedCerts) {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    }

    this.config = config;

    const instanceConfig: AxiosRequestConfig = {
      baseURL: 'https://' + this.config.openSlidesHostname + ':' + this.config.openSlidesPort + '/',
      timeout: 15000,
    };

    if (config.openSlidesIpFamily === 4) {
      console.log("Using IPv4 only");
      instanceConfig.httpsAgent = new https.Agent({ family: 4 });
    } else if (config.openSlidesIpFamily === 6) {
      console.log("Using IPv6 only");
      instanceConfig.httpsAgent = new https.Agent({ family: 4 });
    }
    this.instance = axios.create(instanceConfig);

    this.init();
  }

  private async init() {
    try {
      const response: AxiosResponse = await this.instance.post('/apps/users/login/', {
        username: this.config.openSlidesUsername,
        password: this.config.openSlidesPassword,
      });
      response.headers['set-cookie'].forEach((cookieStr: string) => {
        const cookieStrPart = cookieStr.split(';')[0].split('=');
        if (cookieStrPart[0] === 'OpenSlidesSessionID') {
          this.sessionId = cookieStrPart[1];
        }
      });

      console.log("Authenticated as " + this.config.openSlidesUsername + ". Start listening...");

      this.startListening();
    } catch (e) {
      console.log(e);
    }
  }

  private startListening() {
    const requestOptions: RequestOptions = {
      hostname: this.config.openSlidesHostname,
      port: this.config.openSlidesPort,
      path: '/system/autoupdate?change_id=0',
      method: 'GET',
      headers: {
        "Cookie": "OpenSlidesSessionID=" + this.sessionId
      }
    };
    if (this.config.openSlidesIpFamily === 4) {
      requestOptions.family = 4;
    } else if (this.config.openSlidesIpFamily === 6) {
      requestOptions.family = 6;
    }

    const req = https.request(requestOptions, (res) => {
      let buffer = '';
      res.on('data', (chunk) => {
        buffer += chunk;
        if (buffer.indexOf("\n") >= 0) {
          this.onOsEvent(JSON.parse(buffer));
          buffer = '';
        }
      });
      res.on('end', () => {
        console.log("Connection ended");
        this.reconnect();
      });
    });

    req.on('error', (e) => {
      console.error(e);
    });
    req.end();
  }

  private reconnect()
  {
    console.warn("Reconnecting in 1 second");
    setTimeout(() => {
      this.startListening();
    }, 1000);
  }

  public addListener(listener: EventListener)
  {
    this.listeners.push(listener);
  }

  private onOsEvent(obj: object) {
    this.listeners.forEach(listener => {
      listener(obj);
    });
  }
}
