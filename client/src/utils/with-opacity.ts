export const withOpacity = (color: string, opacity: number) => {
	opacity = Math.min(Math.max(opacity, 0), 100);
	return `color-mix(in hsl, ${color} ${opacity}%, transparent)`;
};
