# React generator

Install:

```
npm install -g react-generator-toolkit
```

## Create new project from boilerplate

```
rg new my-app
rg n my-app
```

## Create a component

Create a React functional component with styled component and story book files

```
rg create Button
rg c Button
```

## Create context (Provider, Consumer, with HOC)

```
rg context Recipes
rg ctx Recipes
```

### Options

| Option                        | Description                                                 | Default    | Choices               |
| ----------------------------- | ----------------------------------------------------------- | ---------- | --------------------- |
| --base (-b)                   | react app base directory                                    | src        |
| --dir (-d)                    | directory to output components (relative to base directory) | components |
| --language (-l)               | language to be used for components                          | js         | 'js', 'typescript'    |
| --type (-t)                   | type of generated component                                 | functional | 'functional', 'class' |
| --no-styled-component (--nsc) | don't output styled-component file                          | false      |
| --no-docs (--nsd)             | don't output doc component file                             | false      |
| --no-tests (--nt)             | don't output spec file                                      | false      |
| --config                      | configuration file                                          | .rgrc.json |

### Config file

Supports all options using the json format, example:

```
{
	"base": "my-base-dir",
	"dir": "component-dir",
	"no-tests": true
}
```
