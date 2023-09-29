import chroma from 'chroma-js';

export function getBackgroundColor(ref: HTMLElement | null) {
	while (ref) {
		const color = chroma(getComputedStyle(ref).backgroundColor);
		if (color.alpha() > 0) return color.hex();
		ref = ref.parentElement;
	}
}
