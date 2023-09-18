import { CoverArt, PlaybackContols, View } from '../components';

export function PlayerView() {
	return (
		<View>
			<CoverArt releaseId='' />
			<div style={{ display: 'flex', 'flex-direction': 'column', 'align-items': 'center', color: '#fff' }}>
				<h3>Song Title</h3>
				<h4>Artist Name</h4>
			</div>

			<PlaybackContols />
		</View>
	);
}
