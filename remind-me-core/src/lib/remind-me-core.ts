import * as notifier from 'node-notifier'

export function remindMeCore() {
  notifier.notify({message: 'test', closeLabel: 'close', icon: ''})
}
