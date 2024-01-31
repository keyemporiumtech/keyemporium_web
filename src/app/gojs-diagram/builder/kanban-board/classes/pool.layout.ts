import * as go from 'gojs';

export class PoolLayout extends go.GridLayout {
  MINLENGTH: number;
  MINBREADTH: number;
  myDiagram: go.Diagram;

  constructor(myDiagram: go.Diagram) {
    super();
    this.MINLENGTH = 200; // this controls the minimum length of any swimlane
    this.MINBREADTH = 100; // this controls the minimum breadth of any non-collapsed swimlane
    this.cellSize = new go.Size(1, 1);
    this.wrappingColumn = Infinity;
    this.wrappingWidth = Infinity;
    this.spacing = new go.Size(0, 0);
    this.alignment = go.GridLayout.Position;
    this.myDiagram = myDiagram;
  }

  override doLayout(coll: any) {
    const diagram = this.diagram;
    if (diagram === null) return;
    diagram.startTransaction('PoolLayout');
    // make sure all of the Group Shapes are big enough
    const minlen = this.computeMinPoolLength();
    diagram.findTopLevelGroups().each((lane) => {
      if (!(lane instanceof go.Group)) return;
      const shape = lane.selectionObject;
      if (shape !== null) {
        // change the desiredSize to be big enough in both directions
        const sz = this.computeLaneSize(lane);
        shape.width = !isNaN(shape.width)
          ? Math.max(shape.width, sz.width)
          : sz.width;
        // if you want the height of all of the lanes to shrink as the maximum needed height decreases:
        shape.height = minlen;
        // if you want the height of all of the lanes to remain at the maximum height ever needed:
        //shape.height = (isNaN(shape.height) ? minlen : Math.max(shape.height, minlen));
        const cell = lane.resizeCellSize;
        if (!isNaN(shape.width) && !isNaN(cell.width) && cell.width > 0)
          shape.width = Math.ceil(shape.width / cell.width) * cell.width;
        if (!isNaN(shape.height) && !isNaN(cell.height) && cell.height > 0)
          shape.height = Math.ceil(shape.height / cell.height) * cell.height;
      }
    });
    // now do all of the usual stuff, according to whatever properties have been set on this GridLayout
    super.doLayout(coll);
    diagram.commitTransaction('PoolLayout');
  }

  // compute the minimum length of the whole diagram needed to hold all of the Lane Groups
  computeMinPoolLength() {
    let len = this.MINLENGTH;
    this.myDiagram.findTopLevelGroups().each((lane) => {
      const holder = lane.placeholder;
      if (holder !== null) {
        const sz = holder.actualBounds;
        len = Math.max(len, sz.height);
      }
    });
    return len;
  }

  // compute the minimum size for a particular Lane Group
  computeLaneSize(lane: any) {
    // assert(lane instanceof go.Group);
    const sz = new go.Size(
      lane.isSubGraphExpanded ? this.MINBREADTH : 1,
      this.MINLENGTH
    );
    if (lane.isSubGraphExpanded) {
      const holder = lane.placeholder;
      if (holder !== null) {
        const hsz = holder.actualBounds;
        sz.width = Math.max(sz.width, hsz.width);
      }
    }
    // minimum breadth needs to be big enough to hold the header
    const hdr = lane.findObject('HEADER');
    if (hdr !== null) sz.width = Math.max(sz.width, hdr.actualBounds.width);
    return sz;
  }
}
