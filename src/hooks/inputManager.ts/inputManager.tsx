import React, { useEffect, useState } from 'react';
import { GridItem, Position, TwoDimensionalCoords } from '../../types';
import { InputManagerProps } from './types';

const DefaultLayout: GridItem[] = [
  { i: '1', x: 0, y: 0, w: 4, h: 1 },
  { i: '2', x: 4, y: 0, w: 4, h: 1 },
  { i: '3', x: 8, y: 0, w: 4, h: 1 },

  { i: '4', x: 0, y: 1, w: 4, h: 1 },
  { i: '5', x: 4, y: 1, w: 4, h: 1 },
  { i: '6', x: 8, y: 1, w: 4, h: 1 },

  { i: '7', x: 0, y: 2, w: 4, h: 1 },
  { i: '8', x: 4, y: 2, w: 4, h: 1 },
  { i: '9', x: 8, y: 2, w: 4, h: 1 }
];

export function useInputManager({}: InputManagerProps) {
  const [cursor, setCursor] = useState<Position>({ x: 0, y: 1, w: 1, h: 1 });
  const [layout, setLayout] = useState<GridItem[]>(DefaultLayout);

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
    console.log(event);
    const { code } = event;

    const cursorCurrent = cursor;
    const currentGridItem = layout.filter((gridItem) =>
      checkCursorCollision(gridItem, cursor)
    )[0];

    if (code === 'KeyW') {
      const direction: TwoDimensionalCoords = { x: 0, y: -1 };

      if (cursorCurrent.y + direction.y < 0) return; // You cant move here
      const size = currentGridItem.h;

      const newPosition = {
        ...cursor,
        y: cursor.y - size
      };

      const potentiallySelected = {
        ...currentGridItem,
        y: newPosition.y
      };

      if (checkCursorCollision(potentiallySelected, newPosition)) {
        return setCursor(newPosition);
      }
    }

    if (code === 'KeyS') {
      const direction: TwoDimensionalCoords = { x: 0, y: 1 };

      if (cursorCurrent.y + direction.y < 0) return; // You cant move here
      const size = currentGridItem.h;

      const newPosition = {
        ...cursor,
        y: cursor.y + size
      };

      const potentiallySelected = {
        ...currentGridItem,
        y: newPosition.y
      };

      if (checkCursorCollision(potentiallySelected, newPosition)) {
        return setCursor(newPosition);
      }
    }

    if (code === 'KeyA') {
      const direction: TwoDimensionalCoords = { x: -1, y: 0 };
      if (cursorCurrent.x + direction.x < 0) return; // You cant move here
      const size = currentGridItem.w;

      const newPosition = {
        ...cursor,
        x: cursor.x + size
      };

      const potentiallySelected = {
        ...currentGridItem,
        x: newPosition.x
      };

      if (checkCursorCollision(potentiallySelected, newPosition)) {
        return setCursor(newPosition);
      }
    }

    if (code === 'KeyD') {
      const direction: TwoDimensionalCoords = { x: 1, y: 0 };
      //TODO this needs to change depending on the current screen size - different cols for different screens bruh
      if (cursorCurrent.x + direction.x > 12) return; // You cant move here
      const size = currentGridItem.w;

      const newPosition = {
        ...cursor,
        x: cursor.x + size
      };

      const potentiallySelected = {
        ...currentGridItem,
        x: newPosition.x
      };

      if (checkCursorCollision(potentiallySelected, newPosition)) {
        return setCursor(newPosition);
      }
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
    layout
  };
}
