const {
  parseTl,
  serializeBytes,
  serializeDate,
} = require('./generationHelpers');
const { toSignedLittleBuffer } = require('../Helpers');

const tlContent = require('./apiTl');
const schemeContent = require('./schemaTl');

function buildApiFromTlSchema() {
  const definitions = loadFromTlSchemas();

  return mergeWithNamespaces(
    createClasses('constructor', definitions.constructors),
    createClasses('request', definitions.requests)
  );
}

function loadFromTlSchemas() {
  const [constructorParamsApi, functionParamsApi] = extractParams(tlContent);
  const [constructorParamsSchema, functionParamsSchema] =
    extractParams(schemeContent);
  const constructors = [].concat(constructorParamsApi, constructorParamsSchema);
  const requests = [].concat(functionParamsApi, functionParamsSchema);

  return {
    constructors,
    requests,
  };
}

function mergeWithNamespaces(obj1, obj2) {
  const result = { ...obj1 };

  Object.keys(obj2).forEach((key) => {
    if (typeof obj2[key] === 'function' || !result[key]) {
      result[key] = obj2[key];
    } else {
      Object.assign(result[key], obj2[key]);
    }
  });

  return result;
}

function extractParams(fileContent) {
  const f = parseTl(fileContent);
  const constructors = [];
  const functions = [];
  for (const d of f) {
    if (d.isFunction) {
      functions.push(d);
    } else {
      constructors.push(d);
    }
  }
  return [constructors, functions];
}

function argToBytes(x, type) {
  switch (type) {
    case 'int': {
      const i = Buffer.alloc(4);
      i.writeInt32LE(x, 0);
      return i;
    }
    case 'long':
      return toSignedLittleBuffer(x, 8);
    case 'int128':
      return toSignedLittleBuffer(x, 16);
    case 'int256':
      return toSignedLittleBuffer(x, 32);
    case 'double': {
      const d = Buffer.alloc(8);
      d.writeDoubleLE(x, 0);
      return d;
    }
    case 'string':
      return serializeBytes(x);
    case 'Bool':
      return x
        ? Buffer.from('b5757299', 'hex')
        : Buffer.from('379779bc', 'hex');
    case 'true':
      return Buffer.alloc(0);
    case 'bytes':
      return serializeBytes(x);
    case 'date':
      return serializeDate(x);
    default:
      return x.getBytes();
  }
}

function getArgFromReader(reader, arg) {
  if (arg.isVector) {
    if (arg.useVectorId) {
      reader.readInt();
    }
    const temp = [];
    const len = reader.readInt();
    arg.isVector = false;
    for (let i = 0; i < len; i++) {
      temp.push(getArgFromReader(reader, arg));
    }
    arg.isVector = true;
    return temp;
  }
  if (arg.flagIndicator) {
    return reader.readInt();
  }
  switch (arg.type) {
    case 'int':
      return reader.readInt();
    case 'long':
      return reader.readLong();
    case 'int128':
      return reader.readLargeInt(128);
    case 'int256':
      return reader.readLargeInt(256);
    case 'double':
      return reader.readDouble();
    case 'string':
      return reader.tgReadString();
    case 'Bool':
      return reader.tgReadBool();
    case 'true':
      return true;
    case 'bytes':
      return reader.tgReadBytes();
    case 'date':
      return reader.tgReadDate();
    default:
      if (!arg.skipConstructorId) {
        return reader.tgReadObject();
      }
      throw new Error(`Unknown type ${arg}`);
  }
}

function createClasses(classesType, params) {
  const classes = {};
  for (const classParams of params) {
    const { name, constructorId, subclassOfId, argsConfig, namespace, result } =
      classParams;
    const fullName = [namespace, name].join('.').replace(/^\./, '');

    class VirtualClass {
      static CONSTRUCTOR_ID = constructorId;

      static SUBCLASS_OF_ID = subclassOfId;

      static className = fullName;

      static classType = classesType;

      CONSTRUCTOR_ID = constructorId;

      SUBCLASS_OF_ID = subclassOfId;

      className = fullName;

      classType = classesType;

      constructor(args) {
        args = args || {};
        Object.keys(args).forEach((argName) => {
          this[argName] = args[argName];
        });
      }

      static fromReader(reader) {
        const args = {};

        for (const argName in argsConfig) {
          if (argsConfig.hasOwnProperty(argName)) {
            const arg = argsConfig[argName];
            if (arg.isFlag) {
              const flagGroupSuffix = arg.flagGroup > 1 ? arg.flagGroup : '';
              const flagValue =
                args[`flags${flagGroupSuffix}`] & (1 << arg.flagIndex);
              if (arg.type === 'true') {
                args[argName] = Boolean(flagValue);
                continue;
              }

              args[argName] = flagValue
                ? getArgFromReader(reader, arg)
                : undefined;
            } else {
              args[argName] = getArgFromReader(reader, arg);
            }
          }
        }
        return new VirtualClass(args);
      }

      getBytes() {
        // The next is pseudo-code:
        const idForBytes = this.CONSTRUCTOR_ID;
        const c = Buffer.alloc(4);
        c.writeUInt32LE(idForBytes, 0);
        const buffers = [c];
        for (const arg in argsConfig) {
          if (argsConfig.hasOwnProperty(arg)) {
            if (argsConfig[arg].isFlag) {
              if (
                (this[arg] === false && argsConfig[arg].type === 'true') ||
                this[arg] === undefined
              ) {
                continue;
              }
            }
            if (argsConfig[arg].isVector) {
              if (argsConfig[arg].useVectorId) {
                buffers.push(Buffer.from('15c4b51c', 'hex'));
              }
              const l = Buffer.alloc(4);
              l.writeInt32LE(this[arg].length, 0);
              buffers.push(
                l,
                Buffer.concat(
                  this[arg].map((x) => argToBytes(x, argsConfig[arg].type))
                )
              );
            } else if (argsConfig[arg].flagIndicator) {
              if (!Object.values(argsConfig).some((f) => f.isFlag)) {
                buffers.push(Buffer.alloc(4));
              } else {
                let flagCalculate = 0;
                for (const f in argsConfig) {
                  if (argsConfig[f].isFlag) {
                    if (
                      (this[f] === false && argsConfig[f].type === 'true') ||
                      this[f] === undefined
                    ) {
                      flagCalculate |= 0;
                    } else {
                      flagCalculate |= 1 << argsConfig[f].flagIndex;
                    }
                  }
                }
                const f = Buffer.alloc(4);
                f.writeUInt32LE(flagCalculate, 0);
                buffers.push(f);
              }
            } else {
              buffers.push(argToBytes(this[arg], argsConfig[arg].type));

              if (this[arg] && typeof this[arg].getBytes === 'function') {
                let boxed = argsConfig[arg].type.charAt(
                  argsConfig[arg].type.indexOf('.') + 1
                );
                boxed = boxed === boxed.toUpperCase();
                if (!boxed) {
                  buffers.shift();
                }
              }
            }
          }
        }
        return Buffer.concat(buffers);
      }

      readResult(reader) {
        if (classesType !== 'request') {
          throw new Error('`readResult()` called for non-request instance');
        }

        const m = result.match(/Vector<(int|long)>/);
        if (m) {
          reader.readInt();
          const temp = [];
          const len = reader.readInt();
          if (m[1] === 'int') {
            for (let i = 0; i < len; i++) {
              temp.push(reader.readInt());
            }
          } else {
            for (let i = 0; i < len; i++) {
              temp.push(reader.readLong());
            }
          }
          return temp;
        }
        return reader.tgReadObject();
      }
    }

    if (namespace) {
      if (!classes[namespace]) {
        classes[namespace] = {};
      }
      classes[namespace][name] = VirtualClass;
    } else {
      classes[name] = VirtualClass;
    }
  }

  return classes;
}

module.exports = buildApiFromTlSchema();
