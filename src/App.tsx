import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Toolbar, {
  ToolbarButton,
  ToolbarSection,
  ToolbarStat
} from './components/toolbar';
import useInputManager from './hooks/inputManager.ts';
import { CompactType } from './types';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

function App() {
  const [compact, setCompact] = useState<CompactType>('vertical');

  const {
    generateDom,
    layouts,
    cursor,
    setLayout,
    setLayouts,
    onAddItem,
    breakpoint,
    // onBreakpointChange
  } = useInputManager();


  const onLayoutChange = (a: any, b: any) => {
    setLayout(a);
    setLayouts(b);
  };

  const onCompactChange = () => {
    console.log(compact);
    setCompact(
      compact === 'horizontal'
        ? 'vertical'
        : compact === 'vertical'
        ? null
        : 'horizontal'
    );
  };

  return (
    <div className="container">
      <Toolbar>
        <ToolbarSection title="Actions">
          {/* <ToolbarButton
            onClick={() => {
              generateNewLayout(breakpoint);
            }}
          >
            Generate new layout
          </ToolbarButton> */}
          <ToolbarButton
            onClick={() => {
              onAddItem();
            }}
          >
            Add random component
          </ToolbarButton>
        </ToolbarSection>
        <ToolbarSection title="cursor">
          <ToolbarStat label="H:" value={cursor.repsonsiveSizes[breakpoint].h.toString()} />
          <ToolbarStat label="W:" value={cursor.repsonsiveSizes[breakpoint].w.toString()} />
          <ToolbarStat label="X:" value={cursor.repsonsiveSizes[breakpoint].x.toString()} />
          <ToolbarStat label="Y:" value={cursor.repsonsiveSizes[breakpoint].y.toString()} />
        </ToolbarSection>
      </Toolbar>

      <ResponsiveReactGridLayout
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        preventCollision={true}
        isDraggable={false}
        isResizable={false}
        compactType={compact}
        // onBreakpointChange={onBreakpointChange}
        onLayoutChange={onLayoutChange}
        layouts={layouts}
      >
        {generateDom()}
      </ResponsiveReactGridLayout>
    </div>
  );
}

export default App;
