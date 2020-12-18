/* Data Types */

import { DT_User } from "./repository";

export class TestDatabase {
    users: DT_User[];

    constructor() {
        this.users = [];
    }

    resetDatabase(): void {
        this.users.splice(0);
    }
}

const testDatabase = new TestDatabase();

const resolveTestDatabase = (): TestDatabase => {
    return testDatabase;
};

export { resolveTestDatabase };