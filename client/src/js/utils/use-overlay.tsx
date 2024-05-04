import { Component, ComponentProps, Show, createSignal } from "solid-js";
import { Dynamic } from "solid-js/web";
import { GenericOptionalParam } from ".";

export function useOverlay<
  const TOverlays extends Record<string, Component<any>>,
>(overlays: Required<TOverlays>) {
  type TProps<TKey extends keyof TOverlays> = ComponentProps<TOverlays[TKey]>;
  type TState<TKey extends keyof TOverlays = keyof TOverlays> =
    | { key: TKey; props: TProps<TKey> }
    | undefined;

  const [state, setState] = createSignal<TState>();

  const Overlay = () => {
    console.log(state());
    return (
      <Show when={state()}>
        {(state) => (
          <Dynamic
            component={overlays[state().key]}
            {...(state().props as any)}
          />
        )}
      </Show>
    );
  };

  const setOverlay = <TKey extends keyof TOverlays>(
    key: TKey,
    ...[props]: GenericOptionalParam<TProps<TKey>>
  ) => setState(() => ({ key, props }) as unknown as TState);

  const closeOverlay = () => setState(undefined);

  return [Overlay, setOverlay, closeOverlay] as const;
}
