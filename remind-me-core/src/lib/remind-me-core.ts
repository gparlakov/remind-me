import * as notifier from 'node-notifier'

export function remindMeCore(): string {
  notifier.notify({message: 'test', closeLabel: 'close', icon: ''})
}
