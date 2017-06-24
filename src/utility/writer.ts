
import {IMessage} from './message';

/**
 * Interface for implementing Writer 
 */
export interface IWriter {
    /**
     * This method writes the message
     */
    write(message: IMessage): void;
    /**
     * This method deleted all messages
     */
    clear(): void;
}