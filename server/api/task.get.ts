import { db } from './../tasks';

export default defineEventHandler(event => {
    const { id, done } = getQuery(event);

    const arr = [];

    if (id) arr.push(...getTasksById(id));

    if (done) arr.push(...getTasksByDone(done));

    return arr.filter(v => v !== null);
});

function getTasksById(id: ReturnType<typeof getQuery>['id']) {
    if (!id) return [];

    if (!Array.isArray(id)) return [db.selectByPrimaryKey(id)];

    return id.map(v => db.selectByPrimaryKey(v?.toString() || ''));
}

function getTasksByDone(done: ReturnType<typeof getQuery>['done']) {
    if (!done) return [];

    if (!Array.isArray(done))
        return db.select(v => (v.done && done === 'true') || (!v.done && done === 'false'));

    return db.select(v => (v.done && done[0] === 'true') || (!v.done && done[0] === 'false'));
}
