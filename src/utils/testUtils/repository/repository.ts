export class Repository<TEntity extends Partial<{ id: number }>> {

    constructor(private readonly data: TEntity[]) {

    }

    async insert(item: TEntity): Promise<TEntity> {
        const newObj: TEntity = {
            ...item,
            id: this.getNewId()
        };
        this.data.push(newObj);
        return newObj;
    }

    async update(entity: TEntity): Promise<TEntity> {
        if (!entity.id) {
            throw new Error('REPO [UPDATE]: for updating entity id is required');
        }

        const dbEntity = this.data.find(x => x.id === entity.id);
        if (!dbEntity) {
            throw new Error("REPO [UPDATE]: item with this id not found");
        }

        // replace db values with new item values
        let newObject = { ...dbEntity, ...entity };

        let dbItemIndex = this.data.indexOf(dbEntity);
        this.data[dbItemIndex] = newObject;

        return newObject;
    }

    async delete(id: number): Promise<TEntity> {
        // find item
        let entity = this.data.find(x => x.id == id);
        if (!entity) throw new Error("REPO [DELETE]: item not found");

        const index = this.data.indexOf(entity);
        this.data.splice(index, 1);

        return entity;
    }

    async getById(id: number): Promise<TEntity | null> {
        let entity = this.data.find(item => item.id == id);
        if (!entity) return null;
        return entity;
    }

    async where(predicate: (entity: TEntity) => boolean): Promise<TEntity[]> {
        return this.data.filter(predicate).map(x => {
            return { ...x };
        });
    }

    private getNewId() {
        if (this.data.length == 0) return 1;
        return Math.max(...this.data.map(x => x.id!)) + 1;
    }
}