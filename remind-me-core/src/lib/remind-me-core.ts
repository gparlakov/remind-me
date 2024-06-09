import notifier, { WindowsBalloon } from 'node-notifier';
import WindowsToaster from 'node-notifier/notifiers/toaster';
import open from 'open';
import sherlock from 'sherlockjs';

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

export function notify(n: { title: string; message: string; link?: string }) {
  const isWinOrWSL = notifier instanceof WindowsToaster;
  const message = `${n.message} ${n.link ? `go to ${n.link}` : ''}`;
  if (isWinOrWSL) {
    new WindowsBalloon().notify(
      { ...n, message, wait: true, time: Number.MAX_SAFE_INTEGER },
      (_, res) => {
        if (
          res != null &&
          typeof res === 'string' &&
          res.includes('activate') &&
          typeof n.link === 'string'
        ) {
          open(n.link);
        }
      }
    );
  } else {
    // mac and linux
    notifier.notify({
      ...n,
      message,
      wait: true,
      actions: ['open'],
      open: n.link,
    });
  }
}
