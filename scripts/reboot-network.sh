#!/bin/bash

node_modules="node_modules"
protocol_contracts="../protocol_contracts"

rimraf="$node_modules/rimraf/bin.js"
ziptool="$node_modules/ziptool/bin/ziptool"
ganache_cli="$node_modules/ganache-cli/build/cli.node.js"

folder="./test_network"
zip_file="$protocol_contracts/extra/b0x_db_latest.zip"

node $rimraf $folder && mkdir $folder && node $ziptool --unzip $zip_file -o $folder

network_id="50"
port="8545"
mnemonic="concert load couple harbor equip island argue ramp clarify fence smart topic"
node $ganache_cli --networkId $network_id -p $port --db $folder -m "$mnemonic"