import assert from 'assert';

abstract class AbstractCommand {
  public abstract execute(): void;

  public abstract undo(): void;
}

class MyDocument {
  public text: string = '';

  public addWord(text: string) {
    this.text = this.text.concat(' ', text).trimStart();
  }

  public removeLastWord() {
    const lastIndex = this.text.lastIndexOf(' ');

    this.text = this.text.substring(0, lastIndex);
  }
}

class AddWordToDocumentCommand extends AbstractCommand {
  public constructor(
    private readonly receiver: MyDocument,
    private readonly word: string
  ) {
    super();
  }

  public execute(): void {
    this.receiver.addWord(this.word);
  }

  public undo(): void {
    this.receiver.removeLastWord();
  }
}

class Invoker {
  private commands: AbstractCommand[] = [];

  private undoList: AbstractCommand[] = [];

  private redoList: AbstractCommand[] = [];

  public addCommand(command: AbstractCommand) {
    this.commands.push(command);

    return this;
  }

  public run() {
    for (const command of this.commands) {
      command.execute();

      this.undoList.push(command);
    }
  }

  public undo() {
    const command = this.undoList.pop();

    if (command) {
      command.undo();

      this.redoList.push(command);
    }
  }

  public redo() {
    const command = this.redoList.pop();

    if (command) {
      command.execute();

      this.undoList.push(command);
    }
  }
}

const doc = new MyDocument();
const invoker = new Invoker();
const command1 = new AddWordToDocumentCommand(doc, 'Hello');
const command2 = new AddWordToDocumentCommand(doc, 'World');

invoker.addCommand(command1).addCommand(command2);
invoker.run();

assert.strictEqual(doc.text, 'Hello World');

invoker.undo();

assert.strictEqual(doc.text, 'Hello');

invoker.undo();
invoker.redo();
invoker.redo();

assert.strictEqual(doc.text, 'Hello World');
