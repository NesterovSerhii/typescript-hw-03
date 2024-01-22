class Key {
    private signature: number;

    constructor() {
        this.signature = Math.random();
    }

    getSignature(): number {
        return this.signature;
    }
}

class Person {
    public name: string;

    constructor(name: string, private key: Key) {
        this.name = name;
        this.key = key;
    }

  getKey(): Key {
    return this.key;
  }
}

abstract class House {
    protected door: boolean = false;
    protected key: Key
    abstract openDoor(key: Key): void;
    protected tenants: Person[] = [];
    
    constructor(key: Key) {
        this.key = key;
      }

    comeIn(person: Person): void {
        if (this.door) {
          this.tenants.push(person);
          console.log(`Welcome home, ${person.name}`)
        } else {
            console.log('The door is locked')
        }
    }

    leave(person: Person): void {
        const index = this.tenants.indexOf(person);
        if (index !== -1) {
            this.tenants.splice(index, 1);
            console.log(`${person.name} has left the house.`);
            console.log(`Remaining tenants: ${this.tenants.length}`);
            if (this.tenants.length === 0) {
                this.door = false;
                console.log('The door is locked. There are no tenants in the house.');
            }
        } else {
            console.log(`${person.name} is not currently in the house.`);
        }
    }
    

}

class MyHouse extends House {
    openDoor(key: Key): void {
        if (key.getSignature() === this.key.getSignature()) {
            this.door = true;
            console.log('The door is open. Please come in.');
        }
        else {
            console.log('Wrong key! You shall not pass!')
        }
    }
}
const key = new Key();

const house = new MyHouse(key);
const person = new Person("John", key);
const person2 = new Person("Serhii", key);
const person3 = new Person("Irih", key);

house.openDoor(person.getKey());
house.openDoor(person2.getKey());
house.openDoor(person3.getKey());

house.comeIn(person);
house.comeIn(person2);
house.comeIn(person3);

house.leave(person)
house.leave(person2)
house.leave(person3)