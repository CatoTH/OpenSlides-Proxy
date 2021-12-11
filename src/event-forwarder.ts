import axios, { AxiosInstance } from 'axios';
import { Configuration } from './config';
import { EventListener } from './event-listener';

export class EventForwarder
{
  private instance: AxiosInstance;

  constructor(private config: Configuration) {
    this.config = config;
    this.instance = axios.create({
      baseURL: this.config.forwardUri,
      timeout: 15000,
      headers: {
        "X-API-Key": this.config.forwardApiKey
      }
    });
  }

  private sendObject(obj: object): void
  {
    console.log("Received and forward event of " + JSON.stringify(obj).length + " bytes");
    console.log(JSON.stringify(obj));

    this.instance.post('/openslides/autoupdate', obj).catch(err => {
      console.warn('Could not send event', err.toString());
    });
  }

  public getEventListener(): EventListener
  {
    return (obj: object) => {
      this.sendObject(obj);
    }
  }
}
