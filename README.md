### API

    $ npm install
    $ npm run dev
    $ npm start

    $ npm link
    $ lights alert Tripod

### TODO (System)

- Review past commits for errors
- PDI deno
- by default, expose merest endpoint (graphql service, exposing raw 'bot state' read/write capability)
- allow defining additional 'routes' (after the default '/graphql' POST handler), such as a homepage
  - defined as a TS function, set via graphql, as the 'state' of the 'bot'.
- Mobile UI (tailwind ui?)
- lock down security better (no camera ui)
- Document configuring lights, camera, motors, lights, mic, rf
- start service in bg 
- Communicate w/ arduinos etc
- Version control system dependencies (rasbpian version, system packages, settings)

## LifeLog app todo
- record state
- access recordings
- flicker like a candle when on
- transmit ultrasonic FYIs
- not be sold in 2-party states (!). But you can print your own if you want. If it conforms to the spec, you can even label it Homebotty and sell it at the farmer's market

## Car app
- Drive states
- joystick-style drive


### HOWTO

- Install on stock hardware (bare pi zero with no monitor), configure network, create accounts, run service
- Change hostname:
  - Change /etc/hostname
  - Change /etc/hosts

