![Logo](https://homebotties.com/logo.svg)

# Homebotties

[Homebotties](https://homebotties.com) is a simple set of tools patterns for building household robots. Really quite early.

## Getting started 

Prerequisites:
- Node 10

Clone from Github and install dependencies:

    $ git clone git@github.com:homebotties/homebotties.git
    $ cd homebotties
    $ npm install

Start development server:
    
    $ npm run dev

Start production server:

    $ npm start


### TODO (System)

- Migrate to GH issues
- Review past commits for errors
 default to exposing merest endpoint (graphql service for raw 'bot state' read/write capability)
- special state 'routes' maps paths/methods to lambdas
  - such as a homepage
- lock down security better (no camera ui)
- Document configuring lights, camera, motors, lights, mic, rf
- start service in bg (PM2?)
- Communicate w/ arduinos etc
- document/sourcecontrol system dependencies (rasbpian version, system packages, settings)

## Maybe/someday
- PDI deno
- Use xstate or redux for core state manegement model?

## Recorder module
- record state
- access recordings
- flicker like a candle when on
- transmit ultrasonic FYIs
- not be sold in 2-party states (!). But you can print your own if you want. If it conforms to the spec, you can even label it Homebotty and sell it at the farmer's market

## Car module
- Drive states
- joystick-style drive
- Consider how to define 'car' as a module that provides a schema fragment, any resolvers needed, and UI component that uses it. 

## Lights module 
- Fix hue hub integration

### HOWTO

- Install on stock hardware (bare pi zero with no monitor), configure network, create accounts, run service
- Change hostname:
  - Change /etc/hostname
  - Change /etc/hosts

