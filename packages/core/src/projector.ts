import { Projection, Projector, ProjectionOptions, ProjectorOptions, VNode, VNodeProperties } from './interfaces';
import { dom } from './dom';

/**
 * Creates a [[Projector]] instance using the provided projectionOptions.
 *
 * For more information, see [[Projector]].
 *
 * @param projectorOptions   Options that influence how the DOM is rendered and updated.
 */

export class XProjector implements Projector {
  private projector: Projector;
  private projectionOptions;
  private renderCompleted = true;
  private scheduled: number | undefined;
  private stopped = false;
  private projections = [] as Projection[];
  private renderFunctions = [] as (() => VNode)[]; // matches the projections array


  private missingTransition() {
    throw new Error('Provide a transitions object to the projectionOptions to do animations');
  };

  private DEFAULT_PROJECTION_OPTIONS: ProjectionOptions = {
    namespace: undefined,
    eventHandlerInterceptor: undefined,
    styleApplyer: function (domNode: HTMLElement, styleName: string, value: string) {
      // Provides a hook to add vendor prefixes for browsers that still need it.
      (domNode.style as any)[styleName] = value;
    },
    transitions: {
      enter: this.missingTransition,
      exit: this.missingTransition
    }
  };

  private extend = <T>(base: T, overrides: any): T => {
    let result = {} as any;
    Object.keys(base).forEach(function (key) {
      result[key] = (base as any)[key];
    });
    if (overrides) {
      Object.keys(overrides).forEach((key) => {
        result[key] = overrides[key];
      });
    }
    return result;
  }

  private applyDefaultProjectionOptions = (projectorOptions?: ProjectionOptions) => {
    return this.extend(this.DEFAULT_PROJECTION_OPTIONS, projectorOptions);
  };


  constructor(private projectorOptions?: ProjectorOptions) {

    this.projectionOptions = this.applyDefaultProjectionOptions(projectorOptions);
    this.projectionOptions.eventHandlerInterceptor = ((propertyName: string, eventHandler: Function, domNode: Node, properties: VNodeProperties) => {
      return (...param) => {
        // intercept function calls (event handlers) to do a render afterwards.
        this.scheduleRender();
        return eventHandler.apply(properties.bind || this, param);
      };
    }).bind(this);

  }

  private doRender() {
    this.scheduled = undefined;
    if (!this.renderCompleted) {
      return; // The last render threw an error, it should be logged in the browser console.
    }
    this.renderCompleted = false;
    for (let i = 0; i < this.projections.length; i++) {
      let updatedVnode = this.renderFunctions[i]();
      this.projections[i].update(updatedVnode);
    }
    this.renderCompleted = true;
  }

  public renderNow = this.doRender;

  public scheduleRender() {
    if (!this.scheduled && !this.stopped) {
      this.scheduled = requestAnimationFrame(this.doRender.bind(this));
    }
  }
  public stop() {
    if (this.scheduled) {
      cancelAnimationFrame(this.scheduled);
      this.scheduled = undefined;
    }
    this.stopped = true;
  }

  public resume() {
    this.stopped = false;
    this.renderCompleted = true;
    this.projector.scheduleRender();
  }

  public append(parentNode, renderMaquetteFunction) {
    this.projections.push(dom.append(parentNode, renderMaquetteFunction(), this.projectionOptions));
    this.renderFunctions.push(renderMaquetteFunction);
  }

  public insertBefore(beforeNode, renderMaquetteFunction) {
    this.projections.push(dom.insertBefore(beforeNode, renderMaquetteFunction(), this.projectionOptions));
    this.renderFunctions.push(renderMaquetteFunction);
  }

  public merge(domNode, renderMaquetteFunction) {
    this.projections.push(dom.merge(domNode, renderMaquetteFunction(), this.projectionOptions));
    this.renderFunctions.push(renderMaquetteFunction);
  }

  public replace(domNode, renderMaquetteFunction) {
    this.projections.push(dom.replace(domNode, renderMaquetteFunction(), this.projectionOptions));
    this.renderFunctions.push(renderMaquetteFunction);
  }

  public detach(renderMaquetteFunction) {
    for (let i = 0; i < this.renderFunctions.length; i++) {
      if (this.renderFunctions[i] === renderMaquetteFunction) {
        this.renderFunctions.splice(i, 1);
        return this.projections.splice(i, 1)[0];
      }
    }
    throw new Error('renderMaquetteFunction was not found');
  }
}

