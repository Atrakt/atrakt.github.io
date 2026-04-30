/// <reference types="vite/client" />

import { InitialData } from './types/types';

declare global {
  var __INITIAL_DATA__: InitialData | undefined;
  var __INITIAL_COLORS__: Record<string, string> | undefined;
}

export {};
