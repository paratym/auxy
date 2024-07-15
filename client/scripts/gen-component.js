const kebabName = process.argv[2];
if (!kebabName) {
  console.error("Please specify a component name");
  process.exit(1);
} else if (
  kebabName.toLowerCase() !== kebabName ||
  kebabName.includes(" ") ||
  kebabName.includes("_")
) {
  console.error("Please use kebab case");
  process.exit(1);
}

const camelName = kebabName.replace(/-([a-z])/g, (match) =>
  match[1].toUpperCase(),
);
const pascalName = camelName[0].toUpperCase() + camelName.slice(1);

import * as fs from "fs/promises";
import { fileURLToPath } from "url";

const componentDirPath = new URL(
  `../src/js/components/${kebabName}`,
  import.meta.url,
);

try {
  await fs.mkdir(fileURLToPath(componentDirPath));
} catch (err) {
  console.error("error creating component directory", err);
  process.exit(1);
}

try {
  const componentPath = fileURLToPath(`${componentDirPath}/${kebabName}.tsx`);
  await fs.writeFile(
    componentPath,
    `import * as styles from './${kebabName}.css';

export type ${pascalName}Props = {};

export function ${pascalName}(props: ${pascalName}Props) {
  return <div class={styles.container}></div>;
};
`,
  );
} catch (err) {
  console.error("error writing component file", err);
}

try {
  const stylesPath = fileURLToPath(`${componentDirPath}/${kebabName}.css.ts`);
  await fs.writeFile(
    stylesPath,
    `import { style } from '@vanilla-extract/css';

export const container = style({});`,
  );
} catch (err) {
  console.error("error writing styles file", err);
}

try {
  const indexPath = fileURLToPath(`${componentDirPath}/index.ts`);
  await fs.writeFile(indexPath, `export * from './${kebabName}.tsx';`);
} catch (err) {
  console.error("error writing component index file", err);
}

try {
  const indexPath = fileURLToPath(`${componentDirPath}/../index.ts`);
  await fs.appendFile(
    indexPath,
    `
export * from "./${kebabName}"`,
  );
} catch (err) {
  console.error("error appending to components index file", err);
}
