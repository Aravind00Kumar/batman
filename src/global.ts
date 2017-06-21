import {ILogger, Logger, ProfileWriter} from './utility/logger'

export default class Global {
    public static readonly Name : string = 'Batman' 
    public static readonly Version : string = '1.0.0.alpha.1';
    public static readonly AnimationDuration : number = 150;
    public static Logger :ILogger = Logger.getInstance(new ProfileWriter()); 
//    public static Logger :ILogger = Logger.getInstance(); 
    private constructor(){
    } 
} 