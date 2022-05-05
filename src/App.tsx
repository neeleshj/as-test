import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import useInputManager from './hooks/inputManager.ts';
import { CompactType } from './types';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

function App() {
  const [breakpoint, setBreakpoint] = useState('lg');

  const [compact, setCompact] = useState<CompactType>('vertical');

  const {
    generateDom,
    generateNewLayout,
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
    <>
      <button
        onClick={() => {
          generateNewLayout(breakpoint);
        }}
      >
        Generate new layout
      </button>

      <button
        onClick={() => {
          onAddItem();
        }}
      >
        Add new component to grid
      </button>

      <button onClick={() => onCompactChange()}>Change Compact Type</button>

      <div>h: {cursor.h}</div>
      <div>w: {cursor.w}</div>
      <div>x: {cursor.x}</div>
      <div>y: {cursor.y}</div>

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
    </>
  );
}

export default App;
