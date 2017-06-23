import { h, createProjector, Projector, ProjectorOptions, VNode } from '../../common/maquette';
import {IMessage, IWriter} from '../../utility/logger'

/**
 * Interface for doughnut component values
 */
export interface IProfilerValue {
    percentage: number,
    color: string
}

/**
 * Interface for doughnut component options
 */

export interface IProfilerOptions {
    width?: number,
}

export class ProfilerWriter implements IWriter {
    /**
     * Component default option. These options can be overridden from constructor
     */
    public static defaultOptions: IProfilerOptions = {
        width: 10,
    }

    private log: any;
    public element;
    public options;
    public projector;
    /**
     * Constructor to initiate the doughnut component 
     * @param element Context of the component 
     * @param options Component options
     */
    constructor(options?: IProfilerOptions) {
        this.element =  document.body, 
        this.options = <IProfilerOptions>{ ...ProfilerWriter.defaultOptions, ...options };
        this.log = [];
        this.projector = createProjector();
        this.projector.append(this.element, this.renderMaquette.bind(this));
    }

    /**
     * Virtual DOM H template method; in case of values provided it generated the multi arc template otherwise single vales template  
     */
    private renderMaquette() {
        return h("div#global-profiler", {}, [
            h("div.log-context", [
                this.log.map((item, index) => { return h("div.log", { key: index }, [h("span", { key: 83 }), h("span", { key: 84 })]) })
            ]), h("button", ["Clear"])]);
    }

    public write(message: IMessage): void {
        this.log.push(message);
    }
    public clear(): void {
        this.log.length = 0;
    }
}