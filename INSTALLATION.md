# Bot Installation

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
