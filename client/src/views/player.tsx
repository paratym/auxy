import { CoverArt, PlaybackContols } from '../components';

export function PlayerView() {
	return (
		<div style={{ width: '100%', height: '100%', padding: '24px', background: '#000' }}>
			<CoverArt releaseId='' />
			<div style={{ display: 'flex', 'flex-direction': 'column', 'align-items': 'center', color: '#fff' }}>
				<h3>Song Title</h3>
				<h4>Artist Name</h4>
			</div>

			<PlaybackContols />
		</div>
	);
}
