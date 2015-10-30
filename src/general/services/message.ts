module Blog {
  export interface IMessageService {
    show(message: string, duration = 1500): void
  }

  class MessageService implements IMessageService {
    constructor() {

    }

    show(message:string, duration):void {
    }

  }
}
