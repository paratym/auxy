import { AbsoluteSize } from '../theme.css';

export const ABSOLUTE_SIZE_ORDER: ReadonlyArray<AbsoluteSize> = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

/**
 * returns negative if a < b, 0 if a == b, and positive if a > b
 */
export const compareAbsoluteSize = (a: AbsoluteSize, b: AbsoluteSize) => {
	return Math.sign(ABSOLUTE_SIZE_ORDER.indexOf(a) - ABSOLUTE_SIZE_ORDER.indexOf(b));
};
