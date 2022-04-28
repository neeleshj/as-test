import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { GridItem } from './types';
import useInputManager from './hooks/inputManager.ts';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

// create a class to manage keyboard input - maybe a hook ?
// keyboard navigation with arrow keys and WSAD
// create a cursor, which will be on one card then when move, calculate whats avaiable to move to

function App() {
  const { cursor, checkCursorCollision, layout } = useInputManager({});

  const createElement = (el: GridItem): React.ReactNode => {
    const i = el.i;
    return (
      <div
        style={{
          backgroundColor: checkCursorCollision(el, cursor) ? 'red' : 'gray'
        }}
        key={i}
        data-grid={el}
      >
        Item {el.i}
      </div>
    );
  };
  return (
    <ResponsiveReactGridLayout
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={100}
      preventCollision={true}
      isDraggable={false}
      isResizable={false}
      compactType="vertical"
    >
      {layout && layout.map((el) => createElement(el))}
    </ResponsiveReactGridLayout>
  );
}

export default App;
