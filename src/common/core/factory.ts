import {VNode, ProjectionOptions, Projector, ProjectorOptions, Projection} from './interfaces';
import {XProjection} from './Projection';
import {XProjector} from './Projector';


export class ProjectionFactory {
  public static createProjection(vnode: VNode, projectionOptions: ProjectionOptions): Projection {
    return new XProjection(vnode, projectionOptions);
  }
}

export class ProjectorFactory {
  public static createProjector(projectorOptions?: ProjectorOptions):Projector {
    return new XProjector(projectorOptions);
  }
}
