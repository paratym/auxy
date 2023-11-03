import { View } from '../components';

export function AuthView() {
	// const urlParams = useParams();
	// const [hasAccount, setHasAccount] = createSignal(
	// 	typeof urlParams.hasAccount === 'boolean' ? urlParams.hasAccount : true
	// );

	return (
		<View>
			<div></div>
			<form>
				<input type='text' placeholder='username' />
				<input type='password' placeholder='password' />
				<button type='submit'>sign up</button>
			</form>
		</View>
	);
}
