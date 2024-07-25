# UI Testing Playground Suite
The UI Testing Playground suite is an automated cypress acceptance suite written to a production-level standard.
## Features
- production-quality tests written to run repeatedly per execution to weed out flakiness within the devleopment process
- centralized project management through `npm` scripts, such as execution, linting, and formatting
- pristine git commit history, utilizing conventional commits specifications
- integrated with husky pre-commit to ensure uniform development and high-quality commits
- workflow job and ruleset to enforce passing project before merge


## Installation
> [!NOTE]  
> You will need both `npm`  and `nvm` installed on your machine before beginning installation. 

clone the git repository
```
git clone git@github.com:Avienneau/ui_testing_playground_suite.git
```
install the required version of node
```
nvm install
```
use the required version of node
```
nvm use
```
install the project dependencies
```
npm ci
```

## Execution
to run headlessly use
```
npm run cy:run
```
to run in a gui use
```
npm run cy:open
```
