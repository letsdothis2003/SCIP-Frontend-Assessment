import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';

const repoUrl = 'https://github.com/letsdothis2003/SCIP-Frontend-Assessment.git';
const outDir = path.resolve('out');

if (!existsSync(outDir)) {
  throw new Error('out directory not found. Run npm run export first.');
}

execSync(`git init`, { stdio: 'inherit' });
execSync(`git checkout -B gh-pages`, { stdio: 'inherit' });
execSync(`git remote add origin ${repoUrl}`, { stdio: 'inherit' });
execSync(`git add .`, { stdio: 'inherit' });
execSync(`git commit -m "Deploy GitHub Pages"`, { stdio: 'inherit' });
execSync(`git push -f origin gh-pages`, { stdio: 'inherit' });
