import { v4 as uuid } from 'uuid';

export class DataBaseWithPrimaryKey<T = any> {
    private data: Record<string, T> = {};

    public insert(data: T) {
        this.data[uuid()] = data;
    }

    public selectAll() {
        const values: Array<{ id: string; data: T }> = [];

        for (const key in this.data) {
            values.push({ id: key, data: this.data[key] });
        }

        return values;
    }

    public selectByPrimaryKey(id: string) {
        for (const key in this.data) if (key === id) return { id: key, data: this.data[key] };
        return null;
    }

    public select(where: (value: T) => boolean) {
        const values: Array<{ id: string; data: T }> = [];

        for (const key in this.data)
            if (where(this.data[key])) values.push({ id: key, data: this.data[key] });

        return values;
    }

    public delete(where: (value: T) => boolean) {
        const values: Array<{ id: string; data: T }> = [];

        for (const key in this.data)
            if (where(this.data[key])) {
                values.push({ id: key, data: this.data[key] });
                delete this.data[key];
            }

        return values;
    }
}
