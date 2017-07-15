import {Projection, ProjectionOptions, VNode} from './interfaces';
import {dom} from './dom';

export class XProjection implements Projection {
  public domNode: Element;
  constructor(private vnode: VNode, private projectionOptions: ProjectionOptions) {
    this.domNode = <Element>vnode.domNode;
  }
  public update(updatedVnode: VNode) {
    if (this.vnode.vnodeSelector !== updatedVnode.vnodeSelector) {
      throw new Error('The selector for the root VNode may not be changed. (consider using dom.merge and add one extra level to the virtual DOM)');
    }
    dom.updateDom(this.vnode, updatedVnode, this.projectionOptions);
    this.vnode = updatedVnode;
  }

}

