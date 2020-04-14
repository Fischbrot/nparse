#!/usr/bin/env node
const fs = require("fs")
let file = ""

if(process.argv[2] == "-f") {
	if(process.platform === "win32") {
		file = process.cwd() + "\\" + process.argv[3]
	} else {
		file = process.cwd() + "/" + process.argv[3]
	}
} else if(process.argv[2] == "-a") {
	file = process.argv[3]
} else if(process.argv[2] == "-h" || process.argv[2] == "--help") {
	console.log("nparse -f (relative path to JSON)")
	console.log("nparse -a (absolute path to JSON)")
	process.exit(0)
}

if(process.argv[4] == undefined) {
	process.exit(1)
}

fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
    	console.log(data)
    	console.log(file)
    	process.exit(1)
    }
    let json = JSON.parse(data)
	let out = json;
	let query = process.argv[4].split(">");

	query.forEach(function(curr_step) {
		out = out[curr_step]
	})

	process.stdout.write(out)
})
