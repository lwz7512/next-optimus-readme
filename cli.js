#!/usr/bin/env node

// const meow = require('meow');
const path = require('path');
const fs = require('fs-extra')
const os = require('os')
const spawn = require('cross-spawn');


// const cli = meow(`
// 	Usage
// 	  $ next-optimus-readme [input]

// 	Options
// 	  --postfix  Lorem ipsum  [Default: rainbows]

// 	Examples
// 	  $ next-optimus-readme
// 	  unicorns & rainbows
// 	  $ cli-name ponies
// 	  ponies & rainbows
// `, {
// 	flags: {
// 		postfix: {
// 			type: 'string',
// 			default: 'rainbows'
// 		}
// 	}
// });
   
console.log('>>>>>>>>>> next-optimuse-readme start working >>>>>>>>>>>>>>>>>>>>>')
console.log("Current directory: ", __dirname);
const origProjectPath = process.cwd()
console.log("Current process: ", origProjectPath)

const packageJSON = require(path.join(origProjectPath, 'package.json'))
console.log(packageJSON.name)
console.log(packageJSON.description)
console.log(packageJSON.logo)
console.log(packageJSON.banner)
console.log(packageJSON.menu)

const menuJson = JSON.stringify(packageJSON.menu)

let envContent = `NEXT_PUBLIC_TITLE=${packageJSON.name}${os.EOL}`
envContent += `NEXT_PUBLIC_DESCRIPTION=${packageJSON.description}${os.EOL}`
envContent += `NEXT_PUBLIC_LOGO=${packageJSON.logo}${os.EOL}`
envContent += `NEXT_PUBLIC_BANNER=${packageJSON.banner}${os.EOL}`
envContent += `NEXT_PUBLIC_AUTHOR=${packageJSON.author}${os.EOL}`
envContent += `NEXT_PUBLIC_TWITTER=${packageJSON.twitter}${os.EOL}`
envContent += `NEXT_PUBLIC_GITHUB=${packageJSON.github}${os.EOL}`
envContent += `NEXT_PUBLIC_MENU=${menuJson}${os.EOL}`

console.log('>>>>>> write .env.local')
fs.writeFileSync(path.join(__dirname, '.env.local'), envContent)

const checkAndCopyMD = file => {
	const md = path.join(origProjectPath, file)
	if (fs.existsSync(md)) {
		fs.copyFileSync(md, path.join(__dirname, `.${file}`))
	}
}

const checkAndCopyIMG = file => {
	const img = path.join(origProjectPath, file)
	if (!fs.existsSync(img)) return console.log(`<<<< image: ${file} not exist!`)
	try {
		fs.copySync(img, path.join(__dirname, 'public', file))
		console.log('image copy success!')
	} catch (err) {
		console.error(err)
	}
}

console.log('====== copy README.md and logo/banner ...')
checkAndCopyMD('README.md')
checkAndCopyMD('CHANGELOG.md')
checkAndCopyMD('CODE_OF_CONDUCT.md')
checkAndCopyMD('CONTRIBUTING.md')
checkAndCopyMD('CORE_TEAM.md')
checkAndCopyIMG(packageJSON.logo)
checkAndCopyIMG(packageJSON.banner)

console.log('====== CHANGE DIRECTORY TO CURRENT THEME: ======')
process.chdir(__dirname)
console.log("Current DIR: ", process.cwd())

console.log('=== to build: ===')
spawn.sync('npx', ['next', 'build'], { stdio: 'inherit' });
console.log('>>>> build completed!')

console.log('=== to write files back to docs !')
const output = path.join(origProjectPath, 'docs')
spawn.sync('npx', ['next', 'export', '-o', output], { stdio: 'inherit' });