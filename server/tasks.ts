import { DataBaseWithPrimaryKey } from './db';

export const db = new DataBaseWithPrimaryKey<{ text: string; done: boolean }>();

db.insert({ text: 'Milch kaufen', done: false });
db.insert({ text: 'Typescript lernen', done: false });
db.insert({ text: 'Java lernen', done: false });
db.insert({ text: 'Auto putzen', done: true });

