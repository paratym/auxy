import { createSignal } from 'solid-js';
import { View } from '../components';
import { useParams } from '@solidjs/router';

export function AuthView() {
	const urlParams = useParams();
	const [hasAccount, setHasAccount] = createSignal(
		typeof urlParams.hasAccount === 'boolean' ? urlParams.hasAccount : true
	);

	return <View></View>;
}
