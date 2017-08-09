![alt](https://github.com/Aravind00Kumar/batman/blob/master/logo_64.png) 
# Batman
Batman is a native JavaScript UI components library developed using TypeScript, SASS and virtual DOM concept. Easy to use, include following files in the html file.

```
<!-- include only to support IE browsers -->

    <script src="./node_modules/@batman/core-es5/polyfills.js"></script>

```

## How to use

In the `index.html`

```
<!DOCTYPE html>
<html>
<head>
    <title>Demo</title>
    <link rel="stylesheet" href="./node_modules/@batman/core-es5/batman.css">
</head>
<body>
    <div class="flex">
        <div id="demo" style="height:200px; width:200px"></div>
    </div>

    <script src="./node_modules/@batman/core-es5/polyfills.js"></script>>
    <script src="./node_modules/@batman/core-es5/core.js"></script>
    <script src="./node_modules/@batman/components-es5/doughnut.js"></script> 
    <script src="./node_modules/@batman/components-es5/list.js"></script>
    <script src="./node_modules/@batman/components-es5/tree.js"></script> 
    <script src="main.js"></script>

</body>
</html>
```

In `main.js`

```
document.addEventListener('DOMContentLoaded', function () {
    var List = Batman.list.List;
    var dataSource = [{ "text": "0" }, { "text": "1" }];
    new List(document.getElementById('demo'), {
        data: this.dataSource,
        height: 30,
    });
});

```
> Use `npm start` to run and see the configuration for `angularjs` and `angulario` projects

## Development Environment setup 
Install the following applications 
* [Git-SCM](https://code.siemens.com/ui-developers/git/blob/master/readme.md#git-scm-installation)
* [Node.js](https://code.siemens.com/ui-developers/git/blob/master/readme.md#setup-nodejs-and-configuring-proxy)
* [Ruby](https://code.siemens.com/ui-developers/git/blob/master/readme.md#setup-ruby-and-configure-proxy)
* [SASS](https://code.siemens.com/ui-developers/git/blob/master/readme.md#setup-sass)
* [Python](https://code.siemens.com/ui-developers/git/blob/master/readme.md#setup-python)
* [VS Code](https://code.siemens.com/ui-developers/git/blob/master/readme.md#setup-visual-studio-code)

## Setup

```
npm run setup 
```
> Setup auto starts the development server use (`Ctrl + C`) to stop the server, to start again use command `npm start`
>   
> Have a look on [contribution guidelines](https://code.siemens.com/aravind.pampana/batman/blob/master/CONTRIBUTING.md)

### Start `lite-server` 

```
npm start
```
### Demo application page

```
http://localhost:8000/index.html
```

### Generate documentation 

```
npm docs
```
> Note: Generating documentation is optional; to access documentation page generate it before staring the `lite-server` using `npm start`. 
>
> If you use `npm run setup` it auto generates documentation as well.

### Documentation page 

```
http://localhost:8000/documentation/index.html
```

### E2E

Setup

```
    npm run e2e:setup
```    
> Make sure the following paths are valid in `protractor.config.js`
>
> `seleniumServerJar: path.join(__dirname, "node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.4.0.jar")`
>
> `chromeDriver: path.join(__dirname, "node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.31.exe")`
>    
> 

Setting up Chrome DevTools for Protractor debugging
* Install the extension [Node.js V8 --inspector Manager (NiM)](https://chrome.google.com/webstore/detail/nodejs-v8-inspector-manag/gnhhdgbaldcilmgcpfddgdbkhjohddkj?hl=en-US)
* Restart Chrome browser

Debugging

* In vscode use `Protractor` from debug window.

* In case if you want to use Chrome DevTools
    * open Chrome browser
    * run `npm run e2e:debug` from command prompt

## Technology Stack
* SASS
* TypeScript
* Virtual DOM

