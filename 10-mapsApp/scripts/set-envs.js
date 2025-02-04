const { writeFileSync, mkdirSync } = require('fs');

require('dotenv').config()

const targetPath = './src/environments/environments.ts';

const envFileContent = `
export const environment = {
    mapbox_token: "${process.env['MAPBOX_TOKEN']}",
    other: "PROPERTY"
};
`;

mkdirSync('./src/environments', { recursive: true });
writeFileSync(targetPath, envFileContent);