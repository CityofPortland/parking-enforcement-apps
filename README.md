# Parking Enforcement Apps
This repository contains web applications for use by the public and PBOT Parking Enforcement.

## Apps in this repository
### Area Parking Permit (APP) license lookup
This application is intended to be used by the public to quickly determine if a vehicle has an active area parking permit.

## Development guide
This project is built for running in the browser using Node.js using the Vue CLI. It is tested to build and run with Node 14.
### Project setup
```
npm install
```

### Storybook development
This project uses [storybook](storybookjs.org) for design-focused development of presentation components.
#### Compiles and watches storybook stories and components for development
```
npm run storybook
```
#### Builds Storybook into a static website for publication
```
npm run build-storybook
```

### Compiles and hot-reloads apps for development
```
npm run serve
```

### Compiles and minifies apps for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
