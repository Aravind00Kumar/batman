// Comment that is displayed in the API documentation for the Doughnut module:
/**
 * Welcome to the API documentation of the **batman** library.
 * @preferred
 */

// import all components
import { Doughnut, IDoughnutComponent, IDoughnutOptions } from './doughnut/doughnut';
import { List, IListOptions, IListComponent } from './list/list';
import { Tree } from './tree/tree';
import { OptimalTree, ITreeComponent, IOptimalTreeNode, IOptimalTreeOptions } from './tree/optimal-tree';

// import all components
export {
    Doughnut, IDoughnutComponent, IDoughnutOptions,
    List, IListComponent, IListOptions,
    Tree, OptimalTree, ITreeComponent, IOptimalTreeOptions, IOptimalTreeNode
}; 
