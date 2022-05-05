export interface TwoDimensionalCoords {
  x: number;
  y: number;
}

export interface Position {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface GridItem extends Position {
  i?: string;
}

export type CompactType = 'horizontal' | 'vertical' | null | undefined;
