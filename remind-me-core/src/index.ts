#!/usr/bin/env node

import { notify, parse } from './lib/remind-me-core';

const input = [...process.argv].filter((v, i) => i > 1).join(' ');

console.log('parsing input', input)

const { message, ticks } = parse(input);

setTimeout(() => notify({ title: 'Remind-me', message }), ticks);
