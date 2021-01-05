#!/bin/bash
set -eu -o pipefail

function usage() {
	echo "Usage: release.sh [-h] semver" 1>&2
	echo "	-h Show help" 1>&2
	echo "Example: release.sh 0.2.7" 1>&2
}

SEMVER_REGEX="^(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)(\\-[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
function validate_version {
	local version=$1
	if ! [[ "$version" =~ $SEMVER_REGEX ]]; then
		echo "version $version does not match the semver scheme 'X.Y.Z(-PRERELEASE)(+BUILD)'. See help for more information." 1>&2
		exit 1
	fi
}

while getopts "h" arg; do
	case $arg in
	h|*) # Show help
		usage
		exit 1
	;;
	esac
done

version="${1-}"
if [ -z "$version" ]; then
	usage
	exit 1
fi

validate_version "$version"

git commit --allow-empty --message="Release v$version"
git tag "v$version"
git push
git push --tags
