# Messenger Bot 
#### *Paarth's Bot on FB*

### What is it?
#### Created using Node.js, Paarth's Bot is an interactive messenger bot that completes various tasks from changing the chat colours, to finding the weather given a location! 
### Current Status
- Changes chat colour
- Recognizes keywords such as 'paarth'
- Outputs weather with given location

### How to use
```
git clone https://github.com/paarthmadan/messenger-bot
```
#### Create config.js
```
module.exports.fb{
    email: 'enter email',
    password: 'enter password'
}
```

```
node index.js
```

#### Commands (so far)
##### /paarth - outputs special phrase!
##### /weather **City, State/Province/Country **
##### /colour #FFFFFF