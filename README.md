<p align="center">
  <a href="https://streamr.network">
    <img alt="Streamr" src="https://raw.githubusercontent.com/streamr-dev/streamr-docker-dev-action/master/docker-header-img.png" width="1320" />
  </a>
</p>
<h1 align="left"></h1>

# streamr-docker-dev GitHub Action

![Test](https://github.com/streamr-dev/streamr-docker-dev-action/workflows/Test/badge.svg)

## Description
`streamr-docker-dev-action` is a custom GitHub Action that:
- Clones [streamr-docker-dev](https://github.com/streamr-dev/streamr-docker-dev/) command line tool
- Sets command `streamr-docker-dev` to `$PATH` and makes it available to next steps
- Starts Streamr Docker stack

## Required input arguments
None.

## Optional input arguments
Currently the following services are started by default:
- mysql
- redis
- core-api
- cassandra
- parity-node0
- parity-sidechain-node0
- bridge
- broker-node-storage-1
- nginx
- smtp
- platform

You can customise services that are required by your use case with `services-to-start` input parameter.
For example:
```
on: [push]

jobs:
  test:
    runs-on: ubuntu-latest
    name: Use streamr-docker-dev-action to start a few services
    steps:
    - uses: actions/checkout@v2
    - id: start-docker-services
      uses: streamr-dev/streamr-docker-dev-action@v1
      with:
        services-to-start: 'redis mysql core-api'
```

`branch` input parameter for using a different branch.
Branch defaults to `main` branch.
```
on: [push]

jobs:
  test:
	runs-on: ubuntu-latest
	name: Use streamr-docker-dev-action to start a few services
	steps:
	- uses: actions/checkout@v2
	- id: start-docker-services
	  uses: streamr-dev/streamr-docker-dev-action@v1
	  with:
	    branch: my-test-branch
```

## Required output arguments
None.

## Optional output arguments
None.

## Secrets
None.

## Environment variables
None.

## Example
```
on: [push]

jobs:
  example:
    runs-on: ubuntu-latest
    name: Using streamr-docker-dev-action
    steps:
    - uses: actions/checkout@v2
    - uses: streamr-dev/streamr-docker-dev-action@v1
    - run: npm ci && npm test
      shell: bash
```
