# React generator

Clone git repo then run the following command:

```
npm install -g
```

## Create new project from boilerplate

```
rg n my-app
```

## Create a component

Create a React functional component with styled component and story book files

```
rg c Button
```

### Options

| Option                        | Description                                                 | Default          | Choices               |
| ----------------------------- | ----------------------------------------------------------- | ---------------- | --------------------- |
| --base (-b)                   | react app base directory                                    | src              |
| --dir (-d)                    | directory to output components (relative to base directory) | components       |
| --spec-dir (--sd)             | directory to output specs (relative to base directory)      | specs/components |
| --type (-t)                   | type of generated component                                 | functional       | 'functional', 'class' |
| --no-styled-component (--nsb) | don't output styled-component file                          | false            |
| --no-storybook (--nsb)        | don't output storybook component file                       | false            |
| --no-tests (--nt)             | don't output spec file                                      | false            |
| --config                      | configuration file                                          | .rg.json         |

### Config file

Supports all options using the json format, example:

```
{
	"base": "my-base-dir",
	"dir": "component-dir",
	"no-tests": true
}
```
