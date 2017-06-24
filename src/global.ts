import { ILogger, Logger } from './utility/logger'
import { ProfilerWriter } from './components/profiler/profiler'
/**
 * Global services and configuration for library
 */
export default class Global {
    /**
     * Name of the library
     */
    public static readonly Name: string = 'Batman'
    /**
     * Library version
     */
    public static readonly Version: string = '1.0.0.alpha.1';
    /**
     * Default animation duration in milliseconds
     */
    public static readonly AnimationDuration: number = 150;

    /**
     * global logger instance  
     */
    public static Logger: ILogger = Logger.getInstance();
    //public static Logger: ILogger = Logger.getInstance(new ProfilerWriter());
    /**
     * Constructor instantiates all global services and instances 
     */
    constructor() { }
} 