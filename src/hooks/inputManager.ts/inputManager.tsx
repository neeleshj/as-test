import { useEffect, useState } from 'react';
import { GridItem, Position, TwoDimensionalCoords } from '../../types';
import { InputManagerProps } from './types';

const DefaultLayout: GridItem[] = [
  {
    i: '1',
    repsonsiveSizes: {
      sm: { x: 0, y: 0, w: 3, h: 3 },
      md: { x: 0, y: 0, w: 3, h: 3 },
      lg: { x: 0, y: 0, w: 3, h: 3 }
    }
  },
  {
    i: '2',
    repsonsiveSizes: {
      sm: { x: 3, y: 0, w: 3, h: 3 },
      md: { x: 3, y: 0, w: 3, h: 3 },
      lg: { x: 3, y: 0, w: 3, h: 3 }
    }
  },
  {
    i: '3',
    repsonsiveSizes: {
      sm: { x: 6, y: 0, w: 3, h: 3 },
      md: { x: 6, y: 0, w: 3, h: 3 },
      lg: { x: 6, y: 0, w: 3, h: 3 }
    }
  },
  {
    i: '4',
    repsonsiveSizes: {
      sm: { x: 9, y: 0, w: 3, h: 3 },
      md: { x: 9, y: 0, w: 3, h: 3 },
      lg: { x: 9, y: 0, w: 3, h: 3 }
    }
  },

  {
    i: '5',
    repsonsiveSizes: {
      sm: { x: 0, y: 1, w: 6, h: 1 },
      md: { x: 0, y: 1, w: 6, h: 1 },
      lg: { x: 0, y: 1, w: 6, h: 1 }
    }
  },
  {
    i: '6',
    repsonsiveSizes: {
      sm: { x: 6, y: 1, w: 6, h: 1 },
      md: { x: 6, y: 1, w: 6, h: 1 },
      lg: { x: 6, y: 1, w: 6, h: 1 }
    }
  },

  {
    i: '7',
    repsonsiveSizes: {
      sm: { x: 0, y: 2, w: 4, h: 4 },
      md: { x: 0, y: 2, w: 4, h: 4 },
      lg: { x: 0, y: 2, w: 4, h: 4 }
    }
  },
  {
    i: '8',
    repsonsiveSizes: {
      sm: { x: 4, y: 2, w: 4, h: 3 },
      md: { x: 4, y: 2, w: 4, h: 3 },
      lg: { x: 4, y: 2, w: 4, h: 3 }
    }
  },
  {
    i: '9',
    repsonsiveSizes: {
      sm: { x: 8, y: 2, w: 1, h: 1 },
      md: { x: 8, y: 2, w: 1, h: 1 },
      lg: { x: 8, y: 2, w: 1, h: 1 }
    }
  }
];

const DefaultCursorPositon: GridItem = {
  i: 'cursor',
  repsonsiveSizes: {
    sm: { x: 0, y: 0, w: 1, h: 1 },
    md: { x: 0, y: 0, w: 1, h: 1 },
    lg: { x: 0, y: 0, w: 1, h: 1 }
  }
};

// const generateLayout = (currentBreakpoint?: string) => {
//   return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => {
//     const y = Math.ceil(Math.random() * 4) + 1;
//     const w = Math.ceil(Math.random() * 6) + 1;

//     return {
//       x: Math.round(Math.random() * 5) * 2,
//       y: Math.floor(i / 6) * y,
//       w: w,
//       h: y,
//       i: i.toString()
//     };
//   });
// };

export function useInputManager() {
  const [cursor, setCursor] = useState<GridItem>(DefaultCursorPositon);
  const [layout, setLayout] = useState<GridItem[]>(DefaultLayout);
  const [layouts, setLayouts] = useState<any>();
  const [breakpoint, setBreakpoint] = useState('lg');

  // const generateNewLayout = (currentBreakpoint: string) => {
  //   const newLayout = generateLayout(currentBreakpoint);
  //   // let newCursorPosition = console.log(newLayout, DefaultCursorPositon);
  //   //TODO workout if the default cursor positon is valid, or do we need to find a valid tile
  //   setLayout(newLayout);
  //   setLayouts({
  //     ...layouts,
  //     ...{
  //       [currentBreakpoint]: newLayout
  //     }
  //   });
  // };

  const onAddItem = () => {
    const max = 12; //TODO update using breakpoint value

    const ids = layout.map((item) => parseInt(item.i || '0'));
    const maxId = Math.max(...ids);

    const item: GridItem = {
      i: (maxId + 1).toString(),
      repsonsiveSizes: {
        lg: {
          x: Math.round(Math.random() * 5) * 2,
          y: Infinity, // Place at the bottom
          w: Math.floor(Math.random() * (max - 1 + 1) + 1),
          h: Math.floor(Math.random() * (3 - 1 + 1) + 1)
        }
      }
    };

    setLayout([...layout, ...[item]]);
  };

  const onRemoveItem = (toRemove: GridItem) => {
    setLayout(layout.filter((item) => item.i !== toRemove.i));
    //TODO update layouts too - need break point
    //TODO update cursor -> it might be over an item that has been removed
  };

  const onBreakpointChange = (b: string) => setBreakpoint(b);

  const generateDom = () => {
    console.log(layout, DefaultLayout, DefaultCursorPositon);
    const layoutToGenerate = layout.length ? layout : DefaultLayout;
    return layoutToGenerate.map((item) => (
      <div
        style={{
          zIndex: item.i === 'cursor' ? 100 : 0,
          backgroundColor:
            item.i === 'cursor'
              ? 'green'
              : checkCursorCollision(item, cursor)
              ? 'red'
              : 'gray'
        }}
        key={item.i?.toString()}
        data-grid={item.repsonsiveSizes[breakpoint]}
      >
        Item {item.i}
        <span
          className="remove"
          style={{
            position: 'absolute',
            right: '2px',
            top: 0,
            cursor: 'pointer',
            fontSize: '16px'
          }}
          onClick={() => onRemoveItem(item)}
        >
          x
        </span>
      </div>
    ));
  };

  const checkCursorCollision = (el: GridItem, cur: GridItem): boolean => {
    console.log(el, cur);
    if (
      el.repsonsiveSizes[breakpoint].x <
        cur.repsonsiveSizes[breakpoint].x + cur.repsonsiveSizes[breakpoint].w &&
      el.repsonsiveSizes[breakpoint].x + el.repsonsiveSizes[breakpoint].w >
        cur.repsonsiveSizes[breakpoint].x &&
      el.repsonsiveSizes[breakpoint].y <
        cur.repsonsiveSizes[breakpoint].y + cur.repsonsiveSizes[breakpoint].h &&
      el.repsonsiveSizes[breakpoint].h + el.repsonsiveSizes[breakpoint].y >
        cur.repsonsiveSizes[breakpoint].y
    ) {
      return true;
    } else {
      return false;
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onKeyPressHandler = (event: KeyboardEvent) => {
    const { code } = event;

    const cursorCurrent = cursor.repsonsiveSizes[breakpoint];
    const currentGridItem = layout.filter((gridItem) =>
      checkCursorCollision(gridItem, cursor)
    )[0];

    const newCursorPosition = {
      ...cursor
    };

    const distanceToMove = 1;
    let validPositionFound = false;

    if (code === 'KeyW') {
      if (cursorCurrent.y === 0) return;

      do {
        const direction: TwoDimensionalCoords = { x: 0, y: -1 };

        newCursorPosition.repsonsiveSizes[breakpoint].y =
          newCursorPosition.repsonsiveSizes[breakpoint].y +
          distanceToMove * direction.y;

        if (newCursorPosition.repsonsiveSizes[breakpoint].y < 0) break;

        // Are we on the same grid element?
        if (checkCursorCollision(currentGridItem, newCursorPosition)) {
          validPositionFound = false;
          continue;
        }

        //Does the new position collide with any element in the array that isnt the current
        const layoutExludingCurrent = layout.filter(
          (item) => item.i !== currentGridItem.i
        );
        const gridSearchResults = layoutExludingCurrent.filter((gridItem) =>
          checkCursorCollision(gridItem, newCursorPosition)
        );

        if (gridSearchResults.length === 0) {
          validPositionFound = false;
        } else if (gridSearchResults.length === 1) {
          validPositionFound = true;
        }
      } while (
        newCursorPosition.repsonsiveSizes[breakpoint].y >= 0 &&
        validPositionFound === false
      );
    }

    if (code === 'KeyS') {
      const yPosList = layout.map((item) => {
        return (
          item.repsonsiveSizes[breakpoint].y +
          item.repsonsiveSizes[breakpoint].h
        );
      });
      const maxY = Math.max(...yPosList);

      do {
        const direction: TwoDimensionalCoords = { x: 0, y: 1 };

        newCursorPosition.repsonsiveSizes[breakpoint].y =
          newCursorPosition.repsonsiveSizes[breakpoint].y +
          distanceToMove * direction.y;

        if (newCursorPosition.repsonsiveSizes[breakpoint].y > maxY) break;

        // Are we on the same grid element?
        if (checkCursorCollision(currentGridItem, newCursorPosition)) {
          validPositionFound = false;
          continue;
        }
        //Does the new position collide with any element in the array that isnt the current
        const layoutExludingCurrent = layout.filter(
          (item) => item.i !== currentGridItem.i
        );
        const gridSearchResults = layoutExludingCurrent.filter((gridItem) =>
          checkCursorCollision(gridItem, newCursorPosition)
        );

        if (gridSearchResults.length === 0) {
          validPositionFound = false;
        } else if (gridSearchResults.length === 1) {
          validPositionFound = true;
        }
      } while (
        newCursorPosition.repsonsiveSizes[breakpoint].y <= maxY &&
        validPositionFound === false
      );
    }

    if (code === 'KeyA') {
      if (cursorCurrent.x === 0) return;

      do {
        const direction: TwoDimensionalCoords = { x: -1, y: 0 };

        newCursorPosition.repsonsiveSizes[breakpoint].x =
          newCursorPosition.repsonsiveSizes[breakpoint].x +
          distanceToMove * direction.x;

        if (newCursorPosition.repsonsiveSizes[breakpoint].x < 0) break;

        // Are we on the same grid element?
        if (checkCursorCollision(currentGridItem, newCursorPosition)) {
          validPositionFound = false;
          continue;
        }
        //Does the new position collide with any element in the array that isnt the current
        const layoutExludingCurrent = layout.filter(
          (item) => item.i !== currentGridItem.i
        );
        const gridSearchResults = layoutExludingCurrent.filter((gridItem) =>
          checkCursorCollision(gridItem, newCursorPosition)
        );

        if (gridSearchResults.length === 0) {
          validPositionFound = false;
        } else if (gridSearchResults.length === 1) {
          validPositionFound = true;
        }
      } while (
        newCursorPosition.repsonsiveSizes[breakpoint].x >= 0 &&
        validPositionFound === false
      );
    }

    if (code === 'KeyD') {
      const lastCol = 12; // Get this vaule depending on the current breakpoint
      if (cursorCurrent.x === lastCol) return;

      do {
        const direction: TwoDimensionalCoords = { x: 1, y: 0 };

        newCursorPosition.repsonsiveSizes[breakpoint].x =
          newCursorPosition.repsonsiveSizes[breakpoint].x +
          distanceToMove * direction.x;

        if (newCursorPosition.repsonsiveSizes[breakpoint].x > lastCol) break;

        // Are we on the same grid element?
        if (checkCursorCollision(currentGridItem, newCursorPosition)) {
          validPositionFound = false;
          continue;
        }
        //Does the new position collide with any element in the array that isnt the current
        const layoutExludingCurrent = layout.filter(
          (item) => item.i !== currentGridItem.i
        );
        const gridSearchResults = layoutExludingCurrent.filter((gridItem) =>
          checkCursorCollision(gridItem, newCursorPosition)
        );

        if (gridSearchResults.length === 0) {
          validPositionFound = false;
        } else if (gridSearchResults.length === 1) {
          validPositionFound = true;
        }
      } while (
        newCursorPosition.repsonsiveSizes[breakpoint].x <= lastCol &&
        validPositionFound === false
      );
    }

    if (validPositionFound) {
      setCursor(newCursorPosition);
    }
  };

  // useEffect(() => {
  //   window.addEventListener('keypress', onKeyPressHandler);
  //   return () => {
  //     window.removeEventListener('keypress', onKeyPressHandler);
  //   };
  // }, [onKeyPressHandler]);

  return {
    cursor,
    checkCursorCollision,
    layouts,
    setLayout,
    setLayouts,
    generateDom,
    onAddItem,
    breakpoint,
    onBreakpointChange
  };
}
