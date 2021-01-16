<p align="center">
  <a href="https://streamr.network">
    <img alt="Streamr" src="https://raw.githubusercontent.com/streamr-dev/streamr-docker-dev-action/master/docker-header-img.png" width="1320" />
  </a>
</p>
<h1 align="left"></h1>

# streamr-docker-dev GitHub Action

![Test](https://github.com/streamr-dev/streamr-docker-dev-action/workflows/Test/badge.svg)

# Key features
`streamr-docker-dev-action` is a custom GitHub Action that:
- Clones [streamr-docker-dev](https://github.com/streamr-dev/streamr-docker-dev/) command line tool
- Sets command `streamr-docker-dev` to `$PATH` and makes it available to next steps
- Starts Streamr Docker stack
# Table of Contents
- [Required input arguments](#required-input-arguments)
- [Optional input arguments](#optional-input-arguments)
- [Required output arguments](#required-output-arguments)
- [Optional output arguments](#optional-output-arguments)
- [Secrets](#secrets)
- [Environment variables](#environment-variables)
- [Example](#example)

## Required input arguments
None.

## Optional input arguments
| Name              | Type   |Description                 |Default value|
|-------------------|--------|----------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
|`services`|`String`|Customise services to start.|`mysql redis engine-and-editor cassandra parity-node0 parity-sidechain-node0 bridge data-union-server broker-node-storage-1 nginx smtp platform`|
|`start`            |`Bool`  |Whether to start services immediately.|`true`|
|`wait`             |`Bool`  |Whether to wait for services to start. Requires `start: true`.|`true`|

Following inputs can be used with `steps.with` keys.

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
    name: Use streamr-docker-dev-action to start a few services
    steps:
    - uses: actions/checkout@v2
    - id: start-docker-services
      uses: streamr-dev/streamr-docker-dev-action@v1.0.0-alpha.3
      with:
        services: 'redis mysql'
        start: true
        wait: true
    - name: Run tests
      run: |
        streamr-docker-dev help
        make -f Makefile.ci test
```
