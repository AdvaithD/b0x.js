#!/bin/bash

node_modules="node_modules"
protocol_contracts="../protocol_contracts"

rimraf="$node_modules/rimraf/bin.js"
ziptool="$node_modules/ziptool/bin/ziptool"
ganache_cli="$node_modules/ganache-cli/build/cli.node.js"

folder="./test_network"
zip_file="$protocol_contracts/extra/b0x_db_latest.zip"

node $rimraf $folder && mkdir $folder && node $ziptool --unzip $zip_file -o $folder
