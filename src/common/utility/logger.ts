
import { IMessage, Message, MessageType } from './message';
import { IWriter } from './writer';
import { ConsoleWriter } from './console-writer';

/**
 * Logger options interface
 */
export interface ILoggerOptions {
    /**
     * Enable or disable state of the logger
     * `true` to enable logger 
     * `false` to disable logger
     */
    enable?: boolean;
}

/**
 * Logger interface to log messages in the framework
 */
export interface ILogger {
    /**
     * This message logs the message as `log`
     */
    log(message: string): void;
    /**
     * This message logs the message as `error`
     */
    error(message: string): void;
    /**
     * This method disables the logger 
     */
    disable(): void;
    /**
     * This method enables the logger
     */
    enable(): void;
}

export class Logger implements ILogger {
    /**
     * Logger default options
     */
    public static defaultOptions = <ILoggerOptions>{
        enable: true
    }

    private static _instance;
    private _stack: Array<Message>;
    private _writer: IWriter;
    private options: ILoggerOptions;

    /**
     * Initiate the logger class with writer and options
     * @param writer Instance of writer to write messages
     * @param options A set of logger options 
     */
    private constructor(writer?: IWriter, options?: ILoggerOptions) {
        this.options = <ILoggerOptions>{ ...Logger.defaultOptions, ...options };
        if (writer === undefined) this._writer = new ConsoleWriter();
        else this._writer = writer;
        this._stack = [];
        Logger._instance = this;
    }
    /**
     * This method give return singleton instance of the logger class 
     * @param writer Instance of writer to write messages
     * @param options A set of logger options 
     */
    public static getInstance(writer?: IWriter, options?: ILoggerOptions) {
        if (this._instance === undefined) {
            this._instance = new Logger(writer, options);
        }
        return this._instance;
    }
    /**
     * 
     * @param value text message to be logged
     * @param type Type of the message `log` or `error`
     */
    private writeLog(value: string, type?: MessageType) {
        if (this.options.enable) {
            var message: IMessage = new Message(value, type);
            this._stack.push(message);
            this._writer.write(message);
        }

    }
    /**
     * This method delete all log and sets the log stack to empty
     */
    public clear() {
        this._stack.length = 0;
    }
    /**
     * This message logs the message as `log` 
     * @param value text message
     */
    public log(value: string) {
        this.writeLog(value)
    }
    /**
     * This message logs the message as `error` 
     * @param value text message
     */

    public error(value: string) {
        this.writeLog(value, 'error')
    }
    /**
     * This method enables the logger
     */
    public enable() {
        this.options.enable = true;
    }
    /**
     * This method disables the logger
     */

    public disable() {
        this.options.enable = false;
    }
}