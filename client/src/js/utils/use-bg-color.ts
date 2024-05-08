import chroma from "chroma-js";
import { createSignal, onMount } from "solid-js";

export function getBgColor(ref: HTMLElement | null) {
  while (ref) {
    const color = chroma(getComputedStyle(ref).backgroundColor);
    if (color.alpha() > 0) return color;
    ref = ref.parentElement;
  }

  return undefined;
}

export function useBgColor(ref: HTMLElement | null) {
  const [color, setColor] = createSignal<chroma.Color>(chroma.rgb(0, 0, 0, 0));

  onMount(() => {
    const color = getBgColor(ref);
    if (color) setColor(color);
  });

  return color;
}
