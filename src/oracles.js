import { map, mapAccum, pipe, zipWith } from "ramda";
import * as utils from "./utils";
import oracleRegistryAbi from "./contracts/OracleRegistry.abi.json";
import * as addresses from "../test/constants/addresses";

export const getOracleListRaw = async web3 => {
  const ORACLE_ADDRESSES = 0;
  const ORACLE_NAME_LENGTHS = 1;
  const ORACLE_NAMES_ALL_CONCAT = 2;

  const oracleRegistryContract = await utils.getContractInstance(
    web3,
    oracleRegistryAbi,
    addresses.OracleRegistry
  );

  const res = await oracleRegistryContract.methods.getOracleList().call();
  const oracleAddresses = res[ORACLE_ADDRESSES];
  const oracleNameLengths = res[ORACLE_NAME_LENGTHS];
  const oracleNamesAllConcat = res[ORACLE_NAMES_ALL_CONCAT];

  return {
    oracleAddresses,
    oracleNameLengths,
    oracleNamesAllConcat
  };
};

export const cleanOracleNames = ({
  oracleNameLengths,
  oracleNamesAllConcat
}) => {
  const convertStrToNum = map(str => Number(str));
  const getSubstringIndiciesPairs = lengths => {
    // eslint-disable-next-line no-unused-vars
    const [accum, indiciesPairs] = mapAccum(
      (acc, val) => [acc + val, [acc, acc + val]],
      0
    )(lengths);
    return indiciesPairs;
  };
  const getNames = map(indicies =>
    oracleNamesAllConcat.substring(indicies[0], indicies[1])
  );

  const oracleNames = pipe(
    convertStrToNum,
    getSubstringIndiciesPairs,
    getNames
  )(oracleNameLengths);

  return oracleNames;
};

export const formatOracleList = ({ oracleAddresses, oracleNames }) =>
  zipWith(
    (address, name) => ({ address: address.toLowerCase(), name }),
    oracleAddresses,
    oracleNames
  );

export const getOracleList = async web3 => {
  const {
    oracleAddresses,
    oracleNameLengths,
    oracleNamesAllConcat
  } = await getOracleListRaw(web3);

  const oracleNames = cleanOracleNames({
    oracleNameLengths,
    oracleNamesAllConcat
  });

  return formatOracleList({ oracleAddresses, oracleNames });
};