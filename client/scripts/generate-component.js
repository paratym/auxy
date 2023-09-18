const kebabName = process.argv[2];
if (!kebabName) {
	console.error('Please specify a component name');
	process.exit(1);
} else if (kebabName.toLowerCase() !== kebabName || kebabName.includes(' ') || kebabName.includes('_')) {
	console.error('Please use kebab case');
	process.exit(1);
}

const camelName = kebabName.replace(/-([a-z])/g, (match) => match[1].toUpperCase());
const pascalName = camelName[0].toUpperCase() + camelName.slice(1);

import * as fs from 'fs/promises';
import * as path from 'path';

const componentsPath = path.resolve(
	import.meta.url.replace('file:', '').replace('generate-component.js', ''),
	'../src/components'
);

try {
	const componentPath = path.resolve(componentsPath, `${kebabName}.tsx`);
	fs.writeFile(
		componentPath,
		`import * as styles from './${kebabName}.css';

export type ${pascalName}Props = {};

export function ${pascalName}({}: ${pascalName}Props) {
  return <div class={styles.container} />
};
`
	);
} catch (err) {
	console.error('error writing component file', err);
}

try {
	const stylesPath = path.resolve(componentsPath, `${kebabName}.css.ts`);
	await fs.writeFile(
		stylesPath,
		`import { style } from '@vanilla-extract/css';

export const container = style({});`
	);
} catch (err) {
	console.error('error writing styles file', err);
}

try {
	const indexPath = path.resolve(componentsPath, `index.ts`);
	await fs.appendFile(indexPath, `export * from './${kebabName};'`);
} catch (err) {
	console.error('error appending to index file', err);
}
