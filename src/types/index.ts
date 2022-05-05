export interface TwoDimensionalCoords {
  x: number;
  y: number;
}

export interface Position extends TwoDimensionalCoords {
  w: number;
  h: number;
}

export interface GridItem {
  i?: string;
  repsonsiveSizes: {
    [key: string]: Position;
  };
}

export type CompactType = 'horizontal' | 'vertical' | null | undefined;

export type Breakpoints = 'lg' | 'md' | 'sm';
