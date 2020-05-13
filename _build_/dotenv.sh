#!/bin/bash

envFile=$1
indexFile=$2
echo "Prepare dynamic config"
jqCMD=`cat $envFile | grep -e "^[^#=]" | sed -E 's/^([^=]+)\=.*$/\1: .\1/' | xargs | sed -E -e 's/([^:]) /\1,/g' -e 's/^/env | {/' -e 's/$/}/'`
ENV=`jq -nc "$jqCMD" && rm $envFile`

echo "Fix index.html"
sed -i $indexFile -e 's#{ "JS_BUNDLE_RUNTIME_CONFIG": false }#'"$ENV"'#'

# Self remove script
rm -- "$0"

# And start the rest
exec "${@:3}"
