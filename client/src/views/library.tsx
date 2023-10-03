import { Navigation, LibraryObjectList, View } from '../components';
import { LibraryObject } from '../services';

export function LibraryView() {
	return (
		<View>
			<div />
			<LibraryObjectList objects={Array<LibraryObject>(56).fill({ name: 'Track Title', type: 'track' })} />
			<Navigation />
		</View>
	);
}
