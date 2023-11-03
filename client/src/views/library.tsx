import { Navigation, LibraryObjectList, View, LibraryObjectOverlay, SearchOverlay } from '../components';
import { LibraryObject } from '../services';
import { useOverlayManager } from '../utils';

export function LibraryView() {
	const [Overlay, openOvelay, closeOverlay] = useOverlayManager({
		libraryObject: LibraryObjectOverlay,
		search: SearchOverlay,
	});

	return (
		<>
			<View>
				<div />
				<LibraryObjectList
					objects={Array<LibraryObject>(56).fill({ name: 'Track Name', type: 'track' })}
					onObjectExpand={(object) => openOvelay('libraryObject', { object, onClose: closeOverlay })}
				/>
				<Navigation />
			</View>

			<Overlay />
		</>
	);
}
