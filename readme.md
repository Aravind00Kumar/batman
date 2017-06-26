![alt](./logo_64.png) 
# Batman
Batman is a native JavaScript UI components library developed using TypeScript, SASS and virtual DOM concept. Easy to use, include following files in the html file.

```
<!-- include only to support IE browsers -->
<script src="../dist/batman-polifills.js"></script>

<script src="../dist/batman.js"></script>
<link href="../dist/css/batman.css" rel="stylesheet" />
```

## How to use

In the `index.html`

```
<!DOCTYPE html>
<html>
<head>
    <title>Demo</title>
    <link rel="stylesheet" href="./css/batman.css">
</head>
<body>
    <div class="flex">
        <div id="demo" style="height:200px; width:200px"></div>
    </div>
    <script src="./scripts/batman-polifills.js"></script>
    <script src="./scripts/batman.js"></script>
    <script src="main.js"></script>
</body>
</html>
```

In `main.js`

```
document.addEventListener('DOMContentLoaded', function () {
    new Batman.Doughnut(document.getElementById('demo'), {
        values: [ { percentage: 30, color: '#a52a22'} ], 
        sectorColor: '#03a9f4',
        title:'Batman'
    });
});

```

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
> Setup installs the following global modules 
>
> `typescript typedoc commitizen cz-conventional-changelog semantic-release-gitlab conventional-changelog-cli`
> 
> Setup auto starts the development server use (`Ctrl + C`) to stop the server, to start again use command 'npm start'
>   
> Have a look on [contribution guidelines](https://code.siemens.com/aravind.pampana/batman/blob/master/CONTRIBUTING.md)

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
> Note: Generating documentation is optional; to access documentation page generate it before staring the `lite-server` using `npm start`. 
>
> If you use `npm run setup` it auto generates documentation as well.

### Documentation page 

```
http://localhost:8000/documentation/index.html
```

## Technology Stack
* SASS
* TypeScript
* Virtual DOM

