import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';

const repoUrl = 'https://github.com/letsdothis2003/SCIP-Frontend-Assessment.git';
const outDir = path.resolve('out');

if (!existsSync(outDir)) {
  throw new Error('out directory not found. Run npm run export first.');
}

process.chdir(outDir);

execSync('git init', { stdio: 'inherit' });
execSync('git checkout -B gh-pages', { stdio: 'inherit' });
execSync(`git remote add origin ${repoUrl}`, { stdio: 'inherit' });

if (!existsSync('.nojekyll')) {
  // ensure Jekyll is disabled on GitHub Pages
  execSync('touch .nojekyll', { stdio: 'inherit' });
}

execSync('git add --all', { stdio: 'inherit' });
try {
  execSync('git commit -m "Deploy GitHub Pages"', { stdio: 'inherit' });
} catch (err) {
  // commit can fail if there are no changes; ignore
}

execSync('git push -f origin gh-pages', { stdio: 'inherit' });
