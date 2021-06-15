#!/usr/bin/env node

const meow = require('meow');
const path = require('path');
const fs = require('fs')
const os = require('os')
const spawn = require('cross-spawn');


const cli = meow(`
	Usage
	  $ next-optimus-readme [input]

	Options
	  --postfix  Lorem ipsum  [Default: rainbows]

	Examples
	  $ next-optimus-readme
	  unicorns & rainbows
	  $ cli-name ponies
	  ponies & rainbows
`, {
	flags: {
		postfix: {
			type: 'string',
			default: 'rainbows'
		}
	}
});
   
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
console.log("Current directory: ", __dirname);
const origProjectPath = process.cwd()
console.log("Current process: ", origProjectPath)

const packageJSON = require(path.join(origProjectPath, 'package.json'))
console.log(packageJSON.name)
console.log(packageJSON.description)
// console.log(packageJSON.version)
console.log(packageJSON.menu)

const menuJson = JSON.stringify(packageJSON.menu)

console.log('>>>> check meta.json exist:')
const metaJSON = path.join(origProjectPath, 'meta.json')
if (fs.existsSync(metaJSON)) {
	console.log('>>> got meta.json, copy it!')
} else {
	console.log('<<<<< to write .env.local')

	let envContent = `NEXT_PUBLIC_TITLE=${packageJSON.name}${os.EOL}`
	envContent += `NEXT_PUBLIC_DESCRIPTION=${packageJSON.description}${os.EOL}`
	envContent += `NEXT_PUBLIC_MENU=${menuJson}${os.EOL}`

	fs.writeFileSync(
		path.join(__dirname, '.env.local'), envContent
	)
}

const readme = path.join(origProjectPath, 'README.md')
if (fs.existsSync(readme)) {
	console.log('>>>> copy README.md')
	fs.copyFileSync(readme, path.join(__dirname, '.README.md'))
}


console.log('>>>>> change dir to readme: ')
process.chdir(__dirname)
console.log("Current process: ", process.cwd())


console.log('>>>> to build:')
spawn.sync('npx', ['next', 'build'], { stdio: 'inherit' });
console.log('>>>> build completed!')

console.log('>>>> to write files:')
const output = path.join(origProjectPath, 'docs')
spawn.sync('npx', ['next', 'export', '-o', output], { stdio: 'inherit' });