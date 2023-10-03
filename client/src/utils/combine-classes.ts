export const combineClasses = (...classes: Array<string | undefined>) => {
	return classes.filter(Boolean).join(' ');
};
