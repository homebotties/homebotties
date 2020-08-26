# ![Logo](https://homebotties.com/logo.svg) My Homebot


# Installation

For easy development, first fork the `homebotties/homebotties` repo to your own account (eg my own bot, `sco/scobot`).

1. Clone repo and install dependencies

    $ git clone git@github.com:[USERNAME]/[BOT_REPO].git homebot
    $ cd homebot
    $ npm install

2. Start bot

Options:

    $ npm start 

    $ sudo PORT=80 node ./server.js

    $ docker build -t <your username>/homebot .
    $ docker run -p 80:3000 -d --restart unless-stopped <your username>/homebot

Run your bot app by opening `https://homebot/` on your phone (when on the same wifi network)


# Start building

- Edit app.html and save to reload to update your bot's app
- Check out the Examples/ directory
- Join the community on Github, Twitter, SO, etc


# Hardware

- You'll need any computer with an SD card reader stick, and a phone (to run your bot app)
- Bare Raspberry Pi setup
  - Use Raspberry Pi Imager app to burn latest RPiOS lite (32) image
  - On boot drive, `touch ssh` and create wpa_supplicant.conf to set up wifi
    - TODO: set up ssh ids here
  - Power on. Get IP with Fing app.
  - Set hostname to your bot name with `raspi-config` (in our examples, we'll name our bot `homebot`, but this can be whatever you want)


# Get Involved
- [Issue Tracker](https://github.com/homebotties/homebotties/issues)
