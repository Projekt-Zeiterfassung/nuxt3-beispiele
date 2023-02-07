import { db } from './../tasks';
export default defineEventHandler(event => {
    return db.selectAll();
});
