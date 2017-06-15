
export interface ILogger {
    log(message): void;
    error(message): void;
}

export interface IWriter {
    write(message: IMessage): void;
    clear(): void;
}

export class ConsoleWriter implements IWriter {
    public write(message: IMessage): void {
        if (message.type === 'error')
            console.error(message.format());
        else
            console.log(message.format());
    }
    public clear() {
        console.clear();
    }

}

export class ProfileWriter implements IWriter {

    public element: HTMLElement;

    constructor(profilerId?: string) {
        var elm = document.getElementById('global-profiler');
        if (elm == null)
            this.element = this.createProfileElement();
        else
            this.element = elm;
    }

    private createProfileElement() {
        var div = document.createElement("div");
        div.setAttribute('id', 'global-profiler');
        div.setAttribute('style', 'width: 400px; height: 100vh; position:fixed; background-color:#000; opacity:0.6; top:0; right:20px; overflow-y:auto');
        document.body.appendChild(div);
        return div;
    }

    private createElement(message: IMessage) {
        var div = document.createElement('div');
        div.innerHTML = `<span>${message.time()}</span><span>${message.text}</span>`;
        div.setAttribute('style', `color:${message.type === 'log' ? 'green' : 'orange'}`);
        div.setAttribute('class', `${message.type === 'log' ? 'log' : 'error'}`);
        return div;
    }

    public write(message: IMessage): void {
        this.element.appendChild(this.createElement(message));
    }
    public clear(): void {
        this.element.innerText = '';
    }
}

type MessageType = 'log' | 'error';
export interface IMessage {
    text: string;
    dateTime: Date;
    type: MessageType;
    format(): string;
    time():string;
}

export class Message {
    public dateTime: Date;
    public type: MessageType;
    constructor(public text: string, type?: MessageType) {
        this.dateTime = new Date();
        this.type = type || 'log';
    }
    public time(){
        return this.dateTime.getHours() + ":" + this.dateTime.getMinutes() + ":" + this.dateTime.getSeconds() +  ":" + this.dateTime.getMilliseconds();
    }
    public format() {
        return this.dateTime.getHours() + ":" + this.dateTime.getMinutes() + ":" + this.dateTime.getSeconds() + ":" + this.dateTime.getMilliseconds() + ': ' + this.text;
    }
}

export class Logger implements ILogger {
    private static _instance;
    private _stack: Array<Message>;
    private _writer: IWriter;
    private constructor(writer?: IWriter) {
        if (writer === undefined) this._writer = new ConsoleWriter();
        else this._writer = writer;
        this._stack = [];
        Logger._instance = this;
    }

    public static getInstance(writer?: IWriter) {
        if (this._instance === undefined) {
            this._instance = new Logger(writer);
        }
        return this._instance;
    }

    public clear() {
        this._stack.length = 0;
    }

    public log(value) {
        var message: IMessage = new Message(value);
        this._stack.push(message);
        this._writer.write(message);
    }

    public error(value) {
        var message = new Message(value, 'error');
        this._stack.push(message);
        this._writer.write(message);
    }
}