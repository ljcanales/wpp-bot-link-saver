# wpp-bot-link-saver

This project is divided into two package:
- [whatsapp-bot](https://github.com/ljcanales/wpp-bot-link-saver/tree/main/packages/whatsapp-bot): Handles the interaction by messages. Updates data base.
- [link-redirector](https://github.com/ljcanales/wpp-bot-link-saver/tree/main/packages/link-redirector): Handle redirects. Reads from data base.

It is planned to be the same database for both packages.

## Installation
> Install and start both packages locally

Clone repository.
```
git clone https://github.com/ljcanales/wpp-bot-link-saver && cd wpp-bot-link-saver
```

Install dependencies.
```
npm install
```
Install packages dependencies.
```
npm run bootstrap
```

Edit `config.js` in both packages.

Start
```
npm run start.
```

[link-redirector] By default on port 3000

