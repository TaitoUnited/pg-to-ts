import {camelCase, upperFirst} from 'lodash';

const DEFAULT_OPTIONS: OptionValues = {
  writeHeader: true,
  camelCase: false,
  datesAsStrings: false,
  prefixWithSchemaNames: false,
  enums: 'literal',
};

export type EnumOption = 'literal' | 'enum';

export type OptionValues = {
  camelCase?: boolean;
  /** Leave date, timestamp, and timestamptz columns as strings, rather than Dates. */
  datesAsStrings?: boolean;
  writeHeader?: boolean; // write schemats description header
  /** Import types for jsdoc-tagged JSON columns from this path */
  jsonTypesFile?: string;
  /** Prefix the tablenames with the schema name. */
  prefixWithSchemaNames?: boolean;
  /** Whether to generate enums as literal types (type Enum = 'value1' | 'value2' ...) or enums (enum Enum { ... }) */
  enums?: 'literal' | 'enum';
  /** String to prefix table names with */
  tablePrefix?: string;
  /** String to prefix enum names with */
  enumPrefix?: string;
};

export default class Options {
  public options: OptionValues;

  constructor(options: OptionValues = {}) {
    this.options = {...DEFAULT_OPTIONS, ...options};
  }

  transformTypeName(typename: string) {
    const name = this.options.camelCase
      ? upperFirst(camelCase(typename))
      : typename;
    return `${this.options.enumPrefix ?? ''}${name}`;
  }

  transformColumnName(columnName: string) {
    return this.options.camelCase ? camelCase(columnName) : columnName;
  }
}
