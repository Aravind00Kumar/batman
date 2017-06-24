![alt](./logo_64.png) 
# Batman
UI Components in vanilla js (TypeScript)

## Environment setup 
Install the following applications 
* [Git-SCM](https://code.siemens.com/ui-developers/git/blob/master/readme.md#git-scm-installation)
* [Node.js](https://code.siemens.com/ui-developers/git/blob/master/readme.md#setup-nodejs-and-configuring-proxy)
* [Ruby](https://code.siemens.com/ui-developers/git/blob/master/readme.md#setup-ruby-and-configure-proxy)
* [SASS](https://code.siemens.com/ui-developers/git/blob/master/readme.md#setup-sass)
* [Python](https://code.siemens.com/ui-developers/git/blob/master/readme.md#setup-python)
* [VS Code](https://code.siemens.com/ui-developers/git/blob/master/readme.md#setup-visual-studio-code)

## Install node modules

```
npm install typescript typedoc commitizen cz-conventional-changelog -g
npm link typescript
npm install
```
> Note: optional global packages `semantic-release-gitlab conventional-changelog-cli`

### Start `lite-server` 

```
npm start
```
### Demo application page

```
http://localhost:8000/demo/index.html
```

### Generate documentation 

```
npm docs
```
> Note: Generating documentation is options; to access documentation page generate it before staring the `lite-server` using `npm start`   

### Documentation page 

```
http://localhost:8000/documentation/index.html
```

## Technology Stack
* SASS
* TypeScript

