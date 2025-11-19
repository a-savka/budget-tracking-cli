
interface Identifiable {
    id: number;
}

interface Describable {
    describe(): string;
}

class GenericStorage<T extends Identifiable> {

    constructor(
        private items: T[] = []
    ) {}

    public getById(id: number): T | undefined {
        return this.items.find(item => item.id === id);
    }

    public add(item: T): void {
        if (!this.getById(item.id)) {
            this.items.push(item);
        }
    }

    public removeById(id: number): boolean {
        if (this.getById(id)) {
            this.items = this.items.filter(item => item.id !== id);
            return true;
        }
        return false;
    }

    public getAll(): T[] {
        return [ ...this.items ];
    }

    public describeAll(): void {
        this.items.forEach(item => {
            if (typeof (item as any).describe === 'function') {
                console.log((item as any as Describable).describe());
            } else {
                console.log(
                    `Элемент #${item.id} не содержит описания`
                );
            }
        })
    }

}

class Product implements Identifiable, Describable {
    constructor(
        public id: number,
        public name: string,
        public price: number
    ) {}

    public describe(): string {
        return `Product: #${this.id}: ${this.name}, price: ${this.price}`;
    }
}


const storage = new GenericStorage<Product>();
storage.add(new Product(1, 'Тыблоко', 80));
storage.add(new Product(2, 'Яква', 180));
storage.add(new Product(3, 'Тыйцо', 20));
storage.add(new Product(4, 'Тыгоды', 280));

storage.describeAll();
console.log('--------------------------------')

storage.add({
    id: 5,
    name: 'Кто я?',
    price: 1
} as Product);

storage.describeAll();

