# virtual-collection

## Project Description

### Directory Structure

```
├── frontend          : React Native frontend code
├── backend           : all server and database code
│   ├── controllers   : HTTP controllers to interact with the frontend
│   ├── models        : data models for transferring data between the database/server/frontend
│   ├── repositories  : database access services
│   └── services      : general business logic services
└── ml                : python ML model for classifying plant species
```

## :gear: Developer Setup Guide

Virtual Collection consists of a React Native frontend and an Express/Node backend, with everything written in TypeScript. To set up the frontend development environment, see the [frontend developer setup guide](/frontend/VirtualCollection/README.md). To set up the backend development environment, see the [backend developer setup guide](/backend/README.md).

## :books: Contributing

Any and all contributions are greatly appreciated! Please follow the steps below to ensure your contribution gets accepted:
1. All contributions should be associated with one of our [GitHub issues](https://github.com/ubclaunchpad/virtual-collection/issues)
2. Please create a new branch named `[issue number]-[short description]` to make your changes (eg. `42-create-signup-page`)
3. Once you've made your changes, please submit a pull request and fill out the pull request template as well as possible
4. Request at least one (ideally two) developers to review your pull request
