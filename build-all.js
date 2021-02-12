// ng build global-types --prod && ng build array-helpers --prod && 
// ng build date-time-helpers --prod && 
// ng build state-management --prod && 
// ng build",

var shell = require("shelljs");
shell.exec("ng build global-types --prod");
shell.exec("ng build array-helpers --prod");
shell.exec("ng build date-time-helpers --prod");
shell.exec("ng build state-management --prod");
shell.exec("ng build optimistic-http --prod");
shell.exec("ng build state-db --prod");
shell.exec("ng build state-sync --prod");
shell.exec("ng build state-auth --prod");
shell.exec("ng build state-model --prod");
shell.exec("ng build model-data-table --prod");
shell.exec("ng build dynamic-forms --prod");
shell.exec("ng build form-sheet --prod");
shell.exec("ng build confirm-dialog --prod");
shell.exec("ng build model-form --prod");
shell.exec("ng build cdk-selectable --prod");
shell.exec("ng build notification --prod");
shell.exec("npm run build");