import { h, createProjector, Projector, ProjectorOptions, VNode } from '../../common/maquette';
import { IWriter } from '../../utility/writer'
import { IMessage } from '../../utility/message'
import { IBaseComponent, BaseComponent } from '../base-component'

/**
 * Interface for profiler options
 */

export interface IProfilerOptions {
    width?: number,
}

/**
 * This is a component which allow developer to write messages in DOM 
 */

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
     * Constructor to initiate the ProfilerWriter component 
     * @param element Context of the component 
     * @param options Component options
     */
    constructor(options?: IProfilerOptions) {
        this.element = document.body,
            this.options = <IProfilerOptions>{ ...ProfilerWriter.defaultOptions, ...options };
        this.log = [];
        this.projector = createProjector();
        this.projector.append(this.element, this.renderMaquette.bind(this));
    }

    /**
     * Virtual DOM H template method; in case of values provided it generated the multi arc template otherwise single vales template  
     */
    private renderMaquette() {
        return h("div#global-profiler.flex.column", {}, [
            h('div.head.pad-mar-2x', [h("button", { onclick: this.clear.bind(this) }, ["Clear"])]),
            h("div.content.pad-mar-2x.full", [
                this.log.map((item: IMessage, index) => {
                    return h("div", { key: index, class: item.type }, [h("span", [item.time()]), h("span", [item.text])])
                })
            ])]);
    }

    /**
     * Writes the message into the DOM
     * @param message Messages that need to be written in DOM
     */

    public write(message: IMessage): void {
        this.log.push(message);
        this.projector.scheduleRender();
    }
    /**
     * This method delete all messages written inside the DOM
     */
    public clear(): void {
        this.log.length = 0;
    }
}