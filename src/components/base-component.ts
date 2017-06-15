export interface IBaseComponent{
    elements: Array<string>;
}

export class BaseComponent implements IBaseComponent{
    public elements: Array<string>;
    public static Name : string;
    constructor(name){
        BaseComponent.Name = name;
    } 
} 