# wpp-bot-link-saver

This project is divided into two parts:
- [whatsapp-bot](https://github.com/ljcanales/wpp-bot-link-saver/tree/main/packages/whatsapp-bot): Handles the interaction by messages. Updates data base.
- [link-redirector](https://github.com/ljcanales/wpp-bot-link-saver/tree/main/packages/link-redirector): Handle redirects. Reads from data base.

It is planned to be the same database for both projects.

## Installation
> Install and start both locally

Clone repository.
```
git clone https://github.com/ljcanales/wpp-bot-link-saver && cd wpp-bot-link-saver
```

Install dependencies.
```
npm run bootstrap
```

Edit `config.js` in both projects.

Start
```
npm run start.
```

[link-redirector] By default on port 3000

