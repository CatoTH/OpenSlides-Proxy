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

## Available environment variables

The tool is currently only configured using environment variables.

| Variable               | Description                                                  |
| ---------------------- | ------------------------------------------------------------ |
| `FORWARD_URI`          | The base URI or the Antragsgrün installation, including subdomain (if applicable), but without the consultation path |
| `FORWARD_API_KEY`      | The API Key entered on Antragsgrün in Settings -> This consultation -> Openslides Integration |
| `OS_USERNAME`          | User account to log in, receiving the updates                |
| `OS_PASSWORD`          | Password of the user                                         |
| `OS_HOSTNAME`          | Hostname of Openslides. e.g. demo.openslides.com             |
| `OS_PORT`              | Port of Openslides. e.g. 443                                 |
| `OS_ALLOW_SELF_SIGNED` | Optional. If set to `1`, then self-signed certificates will be accepted for OpenSlides domains. Used when connecting to a local development instance. |
| `OS_IP_FAMILY`         | Optional. If set to either `4` or `6`, then only IPv4 / IPv6 will be used to connect to OpenSlides. Used when being connected from an incorrectly configured network. |

