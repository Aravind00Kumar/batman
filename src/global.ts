import {ILogger, Logger} from './utility/logger'
import { ProfilerWriter  } from './components/profiler/profiler'
export default class Global {
    public static readonly Name : string = 'Batman' 
    public static readonly Version : string = '1.0.0.alpha.1';
    public static readonly AnimationDuration : number = 150;

//   public static Logger :ILogger = Logger.getInstance(new ProfilerWriter()); 
   public static Logger :ILogger = Logger.getInstance(); 
    private constructor(){
    } 
} 