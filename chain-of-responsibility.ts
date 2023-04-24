// Chain of responsibility

interface Handler {
  next(handler: Handler): Handler;
  handle(request: string): string | null;
}

abstract class AbstractHandler implements Handler {
  protected nextHandler: Handler | null = null;

  public next(handler: Handler): Handler {
    this.nextHandler = handler;

    return handler;
  }

  abstract handle(request: string): string | null;
}

class ConcreteHandler1 extends AbstractHandler {
  public handle(request: string): string | null {
    if (request === 'foo') {
      console.log('Handler1: processing the request %s', request);

      return 'foo!';
    }

    return this.nextHandler?.handle(request) ?? null;
  }
}

class ConcreteHandler2 extends AbstractHandler {
  public handle(request: string): string | null {
    if (request === 'bar') {
      console.log('Handler2: processing the request %s', request);

      return 'bar!';
    }

    return this.nextHandler?.handle(request) ?? null;
  }
}

class ConcreteHandler3 extends AbstractHandler {
  public handle(request: string): string | null {
    if (request === 'baz') {
      console.log('Handler3: processing the request %s', request);

      return 'baz!';
    }

    return this.nextHandler?.handle(request) ?? null;
  }
}

function clientCode(handler: Handler) {
  const requests = ['foo', 'bar', 'baz'];

  for (const request of requests) {
    const result = handler.handle(request);

    if (result) {
      console.log(`Result: ${result}`);
    } else {
      console.log(`Unhandled request: ${request}`);
    }
  }
}

const handler1 = new ConcreteHandler1();
const handler2 = new ConcreteHandler2();
const handler3 = new ConcreteHandler3();

handler1.next(handler2).next(handler3);

clientCode(handler1);
