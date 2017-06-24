
import {IMessage} from './message';
import {IWriter} from './writer';

/**
 * This class writes all messages into console 
 */
export class ConsoleWriter implements IWriter {
    /**
     * Writes the message into console
     * @param message Messages that need to be written in console
     */
    public write(message: IMessage): void {
        if (message.type === 'error')
            console.error(message.format());
        else
            console.log(message.format());
    }
    /**
     * This method clears all messages in the console
     */
    public clear() {
        console.clear();
    }

}
