# OpenSlides Autoupdate forwarder

This script connects to an OpenSlides Autoupdate service and forwards each message to another service via a POST-HTTP-Request. 

Specifically, this is meant as a event forwarder towards [Antragsgrün](https://github.com/CatoTH/antragsgruen) for sites with enabled OpenSlides-plugin.

## Available Scripts

- `clean` - remove coverage dataand transpiled files
- `prebuild` - lint source files and tests before building,
- `build` - transpile TypeScript to ES6,
- `build:watch` - interactive watch mode to automatically transpile source files,
- `lint` - lint source files and tests,

## Demo call

```
FORWARD_URI=http://stdparteitag.antragsgruen.test/ \
FORWARD_API_KEY=123456 \
OS_USERNAME=admin \
OS_PASSWORD=admin \
OS_HOSTNAME=openslides.local \
OS_PORT=8000 \
NODE_TLS_REJECT_UNAUTHORIZED=1 \
npm start
```