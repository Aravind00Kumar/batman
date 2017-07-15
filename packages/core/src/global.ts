/**
 * Global services and configuration for library
 */
export class Global {
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

}

export interface IConfigurationOptions{
    animationDuration?: number;
}

export class Configuration {
    public static _options: IConfigurationOptions = {
        animationDuration: 200
    }
    
    public static setOptions(options: IConfigurationOptions){
        Configuration._options = { ...Configuration._options, ...options };
    }

    public static getOptions(){
        return Configuration._options;
    }

}