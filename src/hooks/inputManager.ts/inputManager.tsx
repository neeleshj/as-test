import { useEffect, useState } from 'react';
import { GridItem, Position, TwoDimensionalCoords } from '../../types';
import { InputManagerProps } from './types';

const DefaultLayout: GridItem[] = [
  { i: '1', x: 0, y: 0, w: 3, h: 3 },
  { i: '2', x: 3, y: 0, w: 3, h: 3 },
  { i: '3', x: 6, y: 0, w: 3, h: 3 },
  { i: '4', x: 9, y: 0, w: 3, h: 3 },

  { i: '5', x: 0, y: 1, w: 6, h: 1 },
  { i: '6', x: 6, y: 1, w: 6, h: 1 },

  { i: '7', x: 0, y: 2, w: 4, h: 4 },
  { i: '8', x: 4, y: 2, w: 4, h: 3 },
  { i: '9', x: 8, y: 2, w: 1, h: 1 }
];

const DefaultCursorPositon: GridItem = { i: 'cursor', x: 0, y: 0, w: 1, h: 1 };

const generateLayout = (currentBreakpoint?: string) => {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => {
    const y = Math.ceil(Math.random() * 4) + 1;
    const w = Math.ceil(Math.random() * 6) + 1;

    return {
      x: Math.round(Math.random() * 5) * 2,
      y: Math.floor(i / 6) * y,
      w: w,
      h: y,
      i: i.toString()
    };
  });
};

export function useInputManager({}: InputManagerProps) {
  const [cursor, setCursor] = useState<GridItem>(DefaultCursorPositon);
  const [layout, setLayout] = useState<GridItem[]>(DefaultLayout);
  const [layouts, setLayouts] = useState<any>();

  const generateNewLayout = (currentBreakpoint: string) => {
    const newLayout = generateLayout(currentBreakpoint);
    // let newCursorPosition = console.log(newLayout, DefaultCursorPositon);
    //TODO workout if the default cursor positon is valid, or do we need to find a valid tile
    setLayout(newLayout);
    setLayouts({
      ...layouts,
      ...{
        [currentBreakpoint]: newLayout
      }
    });
  };

  const onAddItem = () => {
    const max = 12; //TODO update using breakpoint value

    const ids = layout.map((item) => parseInt(item.i || '0'));
    const maxId = Math.max(...ids);

    const item = {
      x: Math.round(Math.random() * 5) * 2,
      y: Infinity, // Place at the bottom
      w: Math.floor(Math.random() * (max - 1 + 1) + 1),
      h: Math.floor(Math.random() * (3 - 1 + 1) + 1),
      i: (maxId + 1).toString()
    };

    console.log(layout.length, item);

    setLayout([...layout, ...[item]]);
  };

  const onRemoveItem = (toRemove: GridItem) => {
    setLayout(layout.filter((item) => item.i !== toRemove.i));
    //TODO update layouts too - need break point
    //TODO update cursor -> it might be over an item that has been removed
  };

  const generateDom = (breakpoint: string = 'lg') => {
    return layout.map((item) => (
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
        data-grid={item}
      >
        Item {item.i}
        <span
          className="remove"
          style={{
            position: 'absolute',
            right: '2px',
            top: 0,
            cursor: 'pointer'
          }}
          onClick={() => onRemoveItem(item)}
        >
          x
        </span>
      </div>
    ));
  };

  const checkCursorCollision = (el: GridItem, cur: Position): boolean => {
    if (
      el.x < cur.x + cur.w &&
      el.x + el.w > cur.x &&
      el.y < cur.y + cur.h &&
      el.h + el.y > cur.y
    ) {
      return true;
    } else {
      return false;
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onKeyPressHandler = (event: KeyboardEvent) => {
    const { code } = event;

    const cursorCurrent = cursor;
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

        newCursorPosition.y =
          newCursorPosition.y + distanceToMove * direction.y;

        if (newCursorPosition.y < 0) break;

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
      } while (newCursorPosition.y >= 0 && validPositionFound === false);
    }

    if (code === 'KeyS') {
      const yPosList = layout.map((item) => {
        return item.y + item.h;
      });
      const maxY = Math.max(...yPosList);

      do {
        const direction: TwoDimensionalCoords = { x: 0, y: 1 };

        newCursorPosition.y =
          newCursorPosition.y + distanceToMove * direction.y;

        if (newCursorPosition.y > maxY) break;

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
      } while (newCursorPosition.y <= maxY && validPositionFound === false);
    }

    if (code === 'KeyA') {
      if (cursorCurrent.x === 0) return;

      do {
        const direction: TwoDimensionalCoords = { x: -1, y: 0 };

        newCursorPosition.x =
          newCursorPosition.x + distanceToMove * direction.x;

        if (newCursorPosition.x < 0) break;

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
      } while (newCursorPosition.x >= 0 && validPositionFound === false);
    }

    if (code === 'KeyD') {
      const lastCol = 12; // Get this vaule depending on the current breakpoint
      if (cursorCurrent.x === lastCol) return;

      do {
        const direction: TwoDimensionalCoords = { x: 1, y: 0 };

        newCursorPosition.x =
          newCursorPosition.x + distanceToMove * direction.x;

        if (newCursorPosition.x > lastCol) break;

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
      } while (newCursorPosition.x <= lastCol && validPositionFound === false);
    }

    if (validPositionFound) {
      setCursor(newCursorPosition);
    }
  };

  useEffect(() => {
    window.addEventListener('keypress', onKeyPressHandler);
    return () => {
      window.removeEventListener('keypress', onKeyPressHandler);
    };
  }, [onKeyPressHandler]);

  return {
    cursor,
    checkCursorCollision,
    layouts,
    setLayout,
    setLayouts,
    generateDom,
    generateNewLayout,
    onAddItem
  };
}
