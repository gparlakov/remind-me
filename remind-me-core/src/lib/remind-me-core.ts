import notifier from 'node-notifier';
import isWsl from 'is-wsl';
// import sherlock from 'sherlockjs';
// import express from 'express';

// const app = express()

// app.post('/', (req, res) => {
//   if(req.body) {

//     const event = sherlock.parse(req.body);

//     console.log(event)

//     res.json({});
//   }
//   res.status(400)

//   res.json({error: 'please provide event'})
// })

// export function remindMeCore() {
//   notifier.notify({message: 'test', closeLabel: 'close', icon: ''})
// }

function notify(x: {title: string, message: string }) {
  if (isWsl) {
    new notifier.WindowsBalloon({}).notify(x);
  } else {
    notifier.notify(x);
  }
}
setTimeout(() => notify({title: 'test', message: 'message'}), 2000)
console.log('------ ended');

// app.listen(3000)

// start a server
// listen for requests and start timeout and/or interval
