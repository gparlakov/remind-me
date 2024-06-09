#!/usr/bin/env node

import { notify, parse } from './lib/remind-me-core';
import {CronJob} from 'cron';

const input = [...process.argv].filter((v, i) => i > 1).join(' ');

const { message, startTime, link } = parse(input);

console.log(`will notify "${message}" at ${startTime.toISOString()} and go to link ${link}`);

const job = new CronJob(startTime, function () {
    notify({ title: 'Remind-me', message: `${message} going to ${link}`, link })
    job.stop();
});
job.start();

process.exitCode = 0;

