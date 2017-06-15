export interface IBaseComponent{
    elements: Array<string>;
    options: any; 
}

export class BaseComponent implements IBaseComponent{
    public static Name : string;
    public static Version : string;

    public elements: Array<string>;
    public options: any;

    constructor(name){
        BaseComponent.Name = name;
        BaseComponent.Version = '1.0.0'
        this.options = {};
    } 
} 