import React, { useEffect, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { GridItem } from './types';
import useInputManager from './hooks/inputManager.ts';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

// make functio n to generate random components and place them prooerly
// make sure navigation is working

//define structure for the layours
// make the grid repsonsive
// make the components responsive

// read me section aout the last bit
// have a context provider which tracks children elements

function App() {
  const [breakpoint, setBreakpoint] = useState('lg');
  const {
    generateDom,
    generateNewLayout,
    layouts,
    cursor,
    setLayout,
    setLayouts
  } = useInputManager({});

  const onBreakpointChange = (b: string) => setBreakpoint(b);

  const onLayoutChange = (a: any, b: any) => {
    setLayout(a);
    setLayouts(b);
  };

  useEffect(() => {
    console.log(cursor);
  }, [cursor]);

  return (
    <>
      <button
        onClick={() => {
          generateNewLayout(breakpoint);
        }}
      >
        Generate new layout
      </button>

      
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
        // compactType="vertical"
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
