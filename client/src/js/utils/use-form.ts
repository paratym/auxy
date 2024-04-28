import { createSignal } from "solid-js";
import { ZodType } from "zod";
import { getErrorMessage } from ".";
import { createStore } from "solid-js/store";

export type FieldErrors<TResult> = Partial<Record<keyof TResult, string>>;
export type SubmitCallback<TResult> = (
  result: TResult,
) =>
  | void
  | FieldErrors<TResult>
  | Promise<void>
  | Promise<FieldErrors<TResult>>;

export type FormOpts<TResult> = {
  schema: ZodType<TResult>;
  initialState?: Partial<TResult>;
  onSubmit: SubmitCallback<TResult>;
};

export function useForm<TResult extends Record<PropertyKey, unknown>>({
  schema,
  initialState = {},
  onSubmit,
}: FormOpts<TResult>) {
  const [state, setState] = createStore(initialState);
  const [fieldErrors, setFieldErrors] = createStore<FieldErrors<TResult>>({});

  const setField = <TKey extends keyof TResult>(
    key: TKey,
    value: TResult[TKey],
  ) => {
    setState({ [key]: value } as unknown as Partial<TResult>);
  };

  const [submitting, setSubmitting] = createSignal(false);
  const [submitError, setSubmitError] = createSignal("");

  const submit = async (e: Event) => {
    e.preventDefault();
    setFieldErrors({});
    setSubmitError("");
    setSubmitting(true);

    const parseResult = await schema.safeParseAsync(state);
    if (!parseResult.success) {
      // todo: set field errors from zod error
      setSubmitError("invalid state");
      return;
    }

    try {
      const result = onSubmit(parseResult.data);
      const errors = result instanceof Promise ? await result : result;
      setFieldErrors(errors ?? {});
    } catch (error) {
      setSubmitError(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return {
    state,
    setField,
    fieldErrors,
    submit,
    submitting,
    submitError,
  };
}
