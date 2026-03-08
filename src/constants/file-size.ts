const bytes_multiplier = 1024;

export const ONE_KB_IN_BYTES = bytes_multiplier;
export const ONE_MB_IN_KB = bytes_multiplier;
export const ONE_MB_IN_BYTES = ONE_MB_IN_KB * ONE_KB_IN_BYTES;
export const HALF_MB_IN_KB = ONE_MB_IN_KB / 2;
export const HALF_MB_IN_BYTES = ONE_MB_IN_BYTES / 2;
export const ONE_GB_IN_MB = bytes_multiplier;
export const ONE_GB_IN_KB = ONE_GB_IN_MB * ONE_MB_IN_KB;
export const ONE_GB_IN_BYTES = ONE_GB_IN_KB * ONE_KB_IN_BYTES;
