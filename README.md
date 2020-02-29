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


## Recorder module
- record state
- access recordings
- flicker like a candle when on
- transmit ultrasonic FYIs

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

