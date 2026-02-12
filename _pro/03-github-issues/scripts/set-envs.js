const {writeFileSync, mkdirSync} = require('fs');

require('dotenv').config();

const targetPath = './src/environments/environment.ts'
const targetPathDev = './src/environments/environment.development.ts'

const gitHubToken = process.env['GITHUB_TOKEN'];

if(!gitHubToken) {
  throw new Error('GITHUB_TOKEN is not set')
}

const envFileContent = `
export const environment = {
  baseUrl: 'https://api.github.com/repos/angular/angular',
  gitHubToken: '${gitHubToken}',
};
`;

mkdirSync('./src/environments', {recursive: true});

writeFileSync(targetPath, envFileContent);
writeFileSync(targetPathDev, envFileContent);
