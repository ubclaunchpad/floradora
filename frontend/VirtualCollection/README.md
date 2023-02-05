## Developer Setup
Make sure you run `npm install` at the very beginning before you start your development

### Testing
Run any of the following commands: `npm run ios`, `npm run android`, `npm run web` to install the dependencies needed to deploy the app on their respective simulators. 

### CI Tools
* Prettier
You have access to `prettier` to help with automatic code formatting with the command: `npm run format`

* Eslint
Eslint can help conduct static code analysis and point out common errors in your code with the command `npm run lint`

* CI
This command will ensure that Eslint has analyzed your code AND that it follows `prettier` formatting standards: `npm run ci`

