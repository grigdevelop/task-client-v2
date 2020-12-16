import 'jest';
import { Repository } from './';

interface TestUser {
    id?: number;
    name: string;
}

describe('[Repository] class test', () => {

    // define common objects
    const data: TestUser[] = [];
    const repo: Repository<TestUser> = new Repository(data);

    beforeEach(() => {
        // clean up data
        data.splice(0);
    });

    it('should insert new entity', async () => {
        let newItem = await repo.insert({ name: 'some_name' })

        expect(newItem.id).toBeGreaterThan(0);
        expect(data).toContainEqual({ id: 1, name: newItem.name });

        newItem = await repo.insert({ name: 'another item' });

        expect(newItem.id).toBeGreaterThan(0);
        expect(data).toContainEqual({ id: 2, name: newItem.name });
    });

    it('should update entity', async () => {
        // mock some data
        data.push({
            id: 1,
            name: "user 1"
        });
        data.push({
            id: 2,
            name: "user 2"
        });

        // update data
        await repo.update({ id: 1, name: 'user 1 changed' });

        // assert
        expect(data[0].name).toEqual('user 1 changed');
        expect(data[0].id).toEqual(1);
    });

    it('should delete entity', async () => {
        // mock some data
        data.push({
            id: 1,
            name: "user 1"
        });
        data.push({
            id: 2,
            name: "user 2"
        });
        data.push({
            id: 3,
            name: "user 3"
        });

        // act
        let deleted = await repo.delete(2);

        // assert
        expect(data).not.toContainEqual(deleted);
    });

    it('should get entity by id', async () => {
        // arrange
        data.push({
            id: 1,
            name: "user 1"
        });
        data.push({
            id: 2,
            name: "user 2"
        });
        data.push({
            id: 3,
            name: "user 3"
        });

        // act
        let founded = await repo.getById(2);

        // assert
        expect(founded).not.toBeNull();

        // act
        founded = await repo.getById(5);

        // assert
        expect(founded).toBeNull();
    });

    it('where should clone result data', async () => {
        // arrange
        data.push({
            id: 1,
            name: "user 1"
        });
        data.push({
            id: 2,
            name: "user 2"
        });
        data.push({
            id: 3,
            name: "user 3"
        });

        // act
        const twoEntities = await repo.where(x => x.id! > 1);
        twoEntities[0].name = 'random user';

        // assert
        expect(data[0].name).toEqual('user 1');
        expect(data[1].name).toEqual('user 2');
        expect(data[2].name).toEqual('user 3');
    });
});
