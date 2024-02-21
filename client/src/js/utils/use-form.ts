import { createSignal } from "solid-js";
import { ZodType } from "zod";
import { getErrorMessage } from ".";
import { createStore } from "solid-js/store";

export type FormOpts<TResult> = {
	schema: ZodType<TResult>;
	initialState?: Partial<TResult>;
};

export function useForm<TResult extends Record<PropertyKey, unknown>>({
	schema,
	initialState = {},
}: FormOpts<TResult>) {
	const [state, setState] = createStore(initialState);
	const [fieldErrors, setFieldErrors] = createStore<
		Partial<Record<keyof TResult, string>>
	>({});

	const setField = <TKey extends keyof TResult>(
		key: TKey,
		value: TResult[TKey],
	) => {
		setState({ [key]: value } as unknown as Partial<TResult>);
	};

	const [submitting, setSubmitting] = createSignal(false);
	const [submitError, setSubmitError] = createSignal("");

	type SubmitCallback = (
		result: TResult,
	) => void | typeof fieldErrors | Promise<void> | Promise<typeof fieldErrors>;

	const submit = async (callback: SubmitCallback) => {
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
			const result = callback(parseResult.data);
			const errors = result instanceof Promise ? await result : result;
			console.log(errors);
			setFieldErrors(errors ?? {});
		} catch (error) {
			console.log(error);
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
