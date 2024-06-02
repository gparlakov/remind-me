import notifier from 'node-notifier';
import isWsl from 'is-wsl';
import sherlock from 'sherlockjs';

export function parse(text: string): {
  message: string;
  startTime: Date;
  ticks: number;
} {
  const { eventTitle, startDate } = sherlock.parse(text) as {eventTitle: string, startDate: string};

  const start = new Date(startDate);
  const ticks = start.valueOf() - new Date().valueOf();

  return { message: eventTitle, ticks: ticks, startTime: start };
}

export function notify(x: { title: string; message: string }) {
  if (isWsl) {
    new notifier.WindowsBalloon({}).notify(x);
  } else {
    notifier.notify(x);
  }
}