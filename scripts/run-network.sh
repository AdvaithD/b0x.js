#!/bin/bash

node_modules="node_modules"
ganache_cli="$node_modules/ganache-cli/build/cli.node.js"

folder="./test_network"

network_id="50"
port="8545"
mnemonic="concert load couple harbor equip island argue ramp clarify fence smart topic"
node $ganache_cli --networkId $network_id -p $port --db $folder -m "$mnemonic"