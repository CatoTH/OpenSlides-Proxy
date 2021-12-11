import { OpenslidesClient } from './openslides-client';

import config from './config';
import { EventForwarder } from './event-forwarder';

console.log("Starting OpenSlides proxy...");


const forwarder = new EventForwarder(config);
const client = new OpenslidesClient(config);
client.addListener(forwarder.getEventListener());
