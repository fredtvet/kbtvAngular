var shell = require("shelljs");
shell.exec("cd libs/array-helpers && api-extractor run");
shell.exec("cd libs/global-types && api-extractor run");
shell.exec("cd libs/date-time-helpers && api-extractor run");
shell.exec("cd libs/state-management && api-extractor run");
shell.exec("cd libs/optimistic-http && api-extractor run");
shell.exec("cd libs/state-db && api-extractor run");
shell.exec("cd libs/state-sync && api-extractor run");
shell.exec("cd libs/state-auth && api-extractor run");
shell.exec("cd libs/model && api-extractor run");
shell.exec("cd libs/dynamic-forms && api-extractor run");
shell.exec("cd libs/form-sheet && api-extractor run");
shell.exec("cd libs/confirm-dialog && api-extractor run");
shell.exec("cd libs/cdk-selectable && api-extractor run");
shell.exec("cd libs/notification && api-extractor run");
shell.exec("cd libs/google-places-autocomplete && api-extractor run");
shell.exec("api-documenter markdown --input-folder temp --output-folder docs")