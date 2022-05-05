import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Toolbar, {
  ToolbarSection,
  ToolbarButton,
  ToolbarStat
} from './components/toolbar';
import useInputManager from './hooks/inputManager.ts';
import { CompactType } from './types';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

function App() {
  const [breakpoint, setBreakpoint] = useState('lg');

  const [compact, setCompact] = useState<CompactType>('vertical');

  const {
    generateDom,
    layouts,
    cursor,
    setLayout,
    setLayouts,
    onAddItem
  } = useInputManager({});

  const onBreakpointChange = (b: string) => setBreakpoint(b);

  const onLayoutChange = (a: any, b: any) => {
    console.log('layout change');
    setLayout(a);
    setLayouts(b);
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
          <ToolbarStat label="H:" value={cursor.h.toString()} />
          <ToolbarStat label="W:" value={cursor.w.toString()} />
          <ToolbarStat label="X:" value={cursor.x.toString()} />
          <ToolbarStat label="Y:" value={cursor.y.toString()} />
        </ToolbarSection>
      </Toolbar>

      <ResponsiveReactGridLayout
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        // preventCollision={true}
        isDraggable={false}
        isResizable={false}
        compactType={compact}
        onBreakpointChange={onBreakpointChange}
        onLayoutChange={onLayoutChange}
        layouts={layouts}
      >
        {generateDom(breakpoint)}
      </ResponsiveReactGridLayout>
    </div>
  );
}

export default App;
