# swagger-toolkit
Tools to work with (swagger/OpenApi 2.0)

For the moment it is a CLI program that allows the following commands: 
- node ./index.js --extract yes
- node ./indes.js --model <model-name>

With the --extract option, the program must be given a swagger-input.json file that contains the swagger to extract from. 
The swagger is modified to add the extract option on the chosen endpoints.
A swagger 2.0 model is generated with only the selected endpoints (this comes handy for monolyths with a lot of endpoints depending on complex models)

with the --model options, it is possible to extract a json file containing the chosen model and all of its dependencies

Possible enhancements: 
- Add unit tests
- add an option to input the swagger file
- Support openApi 3.0 as well
- Add grammar checks (via other existing libraries)


