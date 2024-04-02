"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = exports.SERVER_KEYS = void 0;
var big_integer_1 = __importDefault(require("big-integer"));
var Helpers_1 = require("../Helpers");
exports.SERVER_KEYS = [
    {
        fingerprint: (0, big_integer_1.default)('-3414540481677951611'),
        n: (0, big_integer_1.default)('2937959817066933702298617714945612856538843112005886376816255642404751219133084745514657634448776440866'
            + '1701890505066208632169112269581063774293102577308490531282748465986139880977280302242772832972539403531'
            + '3160108704012876427630091361567343395380424193887227773571344877461690935390938502512438971889287359033'
            + '8945177273024525306296338410881284207988753897636046529094613963869149149606209957083647645485599631919'
            + '2747663615955633778034897140982517446405334423701359108810182097749467210509584293428076654573384828809'
            + '574217079944388301239431309115013843331317877374435868468779972014486325557807783825502498215169806323'),
        e: 65537,
    },
    {
        fingerprint: (0, big_integer_1.default)('-5595554452916591101'),
        n: (0, big_integer_1.default)('2534288944884041556497168959071347320689884775908477905258202659454602246385394058588521595116849196570'
            + '8222649399180603818074200620463776135424884632162512403163793083921641631564740959529419359595852941166'
            + '8489405859523376133330223960965841179548922160312292373029437018775884567383353986024616752250817918203'
            + '9315375750495263623495132323782003654358104782690612092797248736680529211579223142368426126233039432475'
            + '0785450942589751755390156647751460719351439969059949569615302809050721500330239005077889855323917509948'
            + '255722081644689442127297605422579707142646660768825302832201908302295573257427896031830742328565032949'),
        e: 65537,
    },
].reduce(function (acc, _a) {
    var fingerprint = _a.fingerprint, keyInfo = __rest(_a, ["fingerprint"]);
    acc.set(fingerprint.toString(), keyInfo);
    return acc;
}, new Map());
/**
 * Encrypts the given data known the fingerprint to be used
 * in the way Telegram requires us to do so (sha1(data) + data + padding)

 * @param fingerprint the fingerprint of the RSA key.
 * @param data the data to be encrypted.
 * @returns {Buffer|*|undefined} the cipher text, or undefined if no key matching this fingerprint is found.
 */
function encrypt(fingerprint, data) {
    return __awaiter(this, void 0, void 0, function () {
        var key, rand, toEncrypt, _a, _b, payload, encrypted;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    key = exports.SERVER_KEYS.get(fingerprint.toString());
                    if (!key) {
                        return [2 /*return*/, undefined];
                    }
                    rand = (0, Helpers_1.generateRandomBytes)(235 - data.length);
                    _b = (_a = Buffer).concat;
                    return [4 /*yield*/, (0, Helpers_1.sha1)(data)];
                case 1:
                    toEncrypt = _b.apply(_a, [[_c.sent(), data, rand]]);
                    payload = (0, Helpers_1.readBigIntFromBuffer)(toEncrypt, false);
                    encrypted = (0, Helpers_1.modExp)(payload, (0, big_integer_1.default)(key.e), key.n);
                    // rsa module uses transform.int2bytes(encrypted, keylength), easier:
                    return [2 /*return*/, (0, Helpers_1.readBufferFromBigInt)(encrypted, 256, false)];
            }
        });
    });
}
exports.encrypt = encrypt;
