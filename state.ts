import { strict as assert } from 'node:assert';

class Door {
  public constructor(private readonly state: State) {}

  public open() {
    this.state.open();
  }

  public close() {
    this.state.close();
  }
}

abstract class State {
  public abstract open(): void;

  public abstract close(): void;
}

class ClosedState extends State {
  public open(): void {
    console.log('opening the door');
  }

  public close(): void {
    throw new Error('not implemented');
  }
}

class OpenedState extends State {
  public open(): void {
    throw new Error('not implemented');
  }

  public close(): void {
    console.log('closing the door');
  }
}

const closdedDoor = new Door(new ClosedState());

assert.throws(closdedDoor.close.bind(closdedDoor), {
  message: /not implemented/,
});

closdedDoor.open(); // opening the door

const openedDoor = new Door(new OpenedState());

assert.throws(openedDoor.open.bind(openedDoor), { message: /not implemented/ });

openedDoor.close(); // closing the door
