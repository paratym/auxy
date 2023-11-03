export type Track = {
	name: string;
};

export type Release = {
	name: string;
};

export type Artist = {
	name: string;
};

export type LibraryObject =
	| (Track & { type: 'track' })
	| (Release & { type: 'release' })
	| (Artist & { type: 'artist' });
