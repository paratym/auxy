import { A } from '@solidjs/router';

export function HomeView() {
	return (
		<>
			<A href='/player'>Player</A>
			<A href='/session'>Session</A>
		</>
	);
}
