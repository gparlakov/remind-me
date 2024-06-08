import notifier from 'node-notifier';
import sherlock from 'sherlockjs';
import open from 'open';

export function parse(text: string): {
  message: string;
  startTime: Date;
  ticks: number;
  link?: string;
} {
  const link = /\[.*\]/.exec(text)?.[0];
  const rest = text.replace(/\[.*\]/, '');

  const { eventTitle, startDate } = sherlock.parse(rest) as {
    eventTitle: string;
    startDate: string;
  };

  const start = new Date(startDate);
  const ticks = start.valueOf() - new Date().valueOf();

  return {
    message: eventTitle,
    ticks: ticks,
    startTime: start,
    link:
      typeof link === 'string'
        ? link.replace('[', '').replace(']', '')
        : undefined,
  };
}

export function notify(x: { title: string; message: string; link?: string }) {
  notifier.notify(
    {
      ...x,
      wait: true,
      ...(x.link != null
        ? { actions: ['ok', 'cancel'], reply: true }
        : {}),
    },
    (err, response, meta) => {
      console.log('---- response', response, meta);
      //   if (err == null && x.link != null) {
      //     open(x.link);
      //   }
    }
  );

  notifier.on('ok', () => {
    x.link && open(x.link);
  });
}
