/**
 * Type of message `log` or `error`
 */export type MessageType = 'log' | 'error';

/**
 * Interface to define Message
 */
export interface IMessage {
    /**
     * Message
     */
    text: string;
    /**
     * Created date time
     */
    dateTime: Date;
    /**
     * Type of the message 
     */
    type: MessageType;
    /**
     * This method will format message content to a string 
     */
    format(): string;
    /**
     * This method will format message created date time to a string 
     */
    time(): string;
}

/**
 * Message class
 */
export class Message {
    /**
     * Created date time
     */
    public dateTime: Date;
    /**
     * Type of the message 
     */
    public type: MessageType;
    /**
     * 
     * @param text Text string
     * @param type Type of the message `log` or `error`
     * If type not provided default type is `log`
     */
    constructor(public text: string, type?: MessageType) {
        this.dateTime = new Date();
        this.type = type || 'log';
    }
    /**
     * This method will format message created date time to a string 
     */
    public time() {
        return this.dateTime.getHours() + ":" + this.dateTime.getMinutes() + ":" + this.dateTime.getSeconds() + ":" + this.dateTime.getMilliseconds();
    }
    /**
     * This method will format message content to a string 
     */
    public format() {
        return this.dateTime.getHours() + ":" + this.dateTime.getMinutes() + ":" + this.dateTime.getSeconds() + ":" + this.dateTime.getMilliseconds() + ': ' + this.text;
    }
}