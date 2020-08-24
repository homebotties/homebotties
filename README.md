# ![Logo](https://homebotties.com/logo.svg) My Homebot

To get started, edit app.html and save to reload.

# Installation

For easy development, first fork the `homebotties/homebotties` repo to your own account (eg my own bot, `sco/scobot`).

1. Clone repo and install dependencies

```
    $ git clone git@github.com:[USERNAME]/[BOT_REPO].git homebot
    $ cd homebot
    $ npm install
```
  TODO: 

2. Start your bot server
```
    $ sudo PORT=80 node -r esm ./server.js
    $ npm start 
```

    Run your bot app by opening `https://homebot/` on your phone (when on the same wifi network)

3. Configure the server to start automatically


# Usage

- TODO: Tutorials, Examples, Community, Issues, Documentation, etc


# Hardware

- Any computer (even a chromebook is fine!), a phone (to run your bot app)
- Raspberry Pi 
  - Burn latest Raspian to SD card: https://www.raspberrypi.org/documentation/installation/installing-images/chromeos.md
  - Power on, connect (various phone or keyboard/mouse/screen solutions)
  - Configure wifi, set hostname to bot name (in our examples, we'll name our bot `homebot`, but this can be whatever you want)
  - Enable SSH, create keys, set up your normal terminal
  - Install Node (10?), make an LED blink...


# Get Involved
- TODO: Issue Tracker
- TODO: Roadmap
- TODO: Contributing.md
- TODO: Credits.md
