var shell = require("shelljs");
shell.exec("npm run buildLibs");
shell.exec("npm run build");