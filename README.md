<p align="center">
  <a href="https://streamr.network">
    <img alt="Streamr" src="https://raw.githubusercontent.com/streamr-dev/streamr-docker-dev-action/master/docker-header-img.png" width="1320" />
  </a>
</p>
<h1 align="left"></h1>
# streamr-docker-dev-action
![.github/workflows/test.yaml](https://github.com/streamr-dev/streamr-docker-dev-action/workflows/.github/workflows/test.yaml/badge.svg)

## Description
`streamr-docker-dev-action` is a custom GitHub Action that:
- Clones `streamr-docker-dev` command line tool (available via `./streamr-docker-dev/streamr-docker-dev/bin.sh`)
- Starts Streamr Docker stack

## Required input arguments
None.

## Optional input arguments
Currently the following services are started by default:
- mysql
- redis
- engine-and-editor
- cassandra parity-node0
- parity-sidechain-node0
- bridge
- data-union-server
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
        services-to-start: 'redis mysql engine-and-editor'
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
