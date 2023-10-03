import { IconBooks, IconHome, IconSearch, IconUser } from '@tabler/icons-solidjs';
import { Button, NowPlaying } from '.';
import * as styles from './navigation.css';
import { A, useLocation } from '@solidjs/router';
import { JSX } from 'solid-js';

export type NavigationProps = {};

export function Navigation({}: NavigationProps) {
	const { pathname } = useLocation();

	return (
		<div class={styles.container}>
			<NowPlaying />
			<div class={styles.navContainer}>
				<NavButton path='/home' activePath={pathname}>
					<IconHome />
				</NavButton>
				<NavButton path='/search' activePath={pathname}>
					<IconSearch />
				</NavButton>
				<NavButton path='/library' activePath={pathname}>
					<IconBooks />
				</NavButton>
				<NavButton path='/profile' activePath={pathname}>
					<IconUser />
				</NavButton>
			</div>
		</div>
	);
}

type NavButtonProps = {
	path: string;
	activePath: string;
	children: JSX.Element;
};

function NavButton({ path, activePath, children }: NavButtonProps) {
	return (
		<A class={styles.navButton} href={path}>
			<Button variant='icon' active={path === activePath}>
				{children}
			</Button>
		</A>
	);
}
