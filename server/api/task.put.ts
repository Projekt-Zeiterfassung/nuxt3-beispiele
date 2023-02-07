import { db } from './../tasks';
export default defineEventHandler(async event => {
    const body = await readBody<{ text: string }>(event);

    db.insert({ text: body.text, done: false });

    return 'ok';
});
