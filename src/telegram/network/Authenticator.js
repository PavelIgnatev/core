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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doAuthentication = void 0;
/**
 * Executes the authentication process with the Telegram servers.
 * @param sender a connected {MTProtoPlainSender}.
 * @param log
 * @returns {Promise<{authKey: *, timeOffset: *}>}
 */
// eslint-disable-next-line import/no-named-default
var api_1 = __importDefault(require("../tl/api"));
var errors_1 = require("../errors");
var RSA_1 = require("../crypto/RSA");
var bigInt = require('big-integer');
var IGE = require('../crypto/IGE');
var AuthKey = require('../crypto/AuthKey');
var Factorizator = require('../crypto/Factorizator');
var Helpers = require('../Helpers');
var BinaryReader = require('../extensions/BinaryReader');
var RETRIES = 20;
function doAuthentication(sender, log) {
    return __awaiter(this, void 0, void 0, function () {
        var bytes, nonce, resPQ, pq, _a, p, q, pBuffer, qBuffer, newNonce, pqInnerData, targetFingerprint, targetKey, _i, _b, fingerprint, padding, dataWithPadding, dataPadReversed, encryptedData, i, tempKey, shaDigestKeyWithData, dataWithHash, ige_1, aesEncrypted, tempKeyXor, _c, _d, _e, keyAesEncrypted, keyAesEncryptedInt, encryptedDataBuffer, serverDhParams, sh, nnh, _f, key, iv, ige, plainTextAnswer, reader, hash, serverDhInner, sha1Answer, dhPrime, ga, timeOffset, b, gb, gab, toCheckAgainst, clientDhInner, clientDdhInnerHashed, _g, _h, clientDhEncrypted, dhGen, nonceTypes, nonceTypesString, name, authKey, nonceNumber, newNonceHash, dhHash;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    bytes = Helpers.generateRandomBytes(16);
                    nonce = Helpers.readBigIntFromBuffer(bytes, false, true);
                    return [4 /*yield*/, sender.send(new api_1.default.ReqPqMulti({ nonce: nonce }))];
                case 1:
                    resPQ = _j.sent();
                    log.debug('Starting authKey generation step 1');
                    if (!(resPQ instanceof api_1.default.ResPQ)) {
                        throw new errors_1.SecurityError("Step 1 answer was ".concat(resPQ));
                    }
                    if (resPQ.nonce.neq(nonce)) {
                        throw new errors_1.SecurityError('Step 1 invalid nonce from server');
                    }
                    pq = Helpers.readBigIntFromBuffer(resPQ.pq, false, true);
                    log.debug('Finished authKey generation step 1');
                    _a = Factorizator.factorize(pq), p = _a.p, q = _a.q;
                    pBuffer = Helpers.getByteArray(p);
                    qBuffer = Helpers.getByteArray(q);
                    bytes = Helpers.generateRandomBytes(32);
                    newNonce = Helpers.readBigIntFromBuffer(bytes, true, true);
                    pqInnerData = new api_1.default.PQInnerData({
                        pq: Helpers.getByteArray(pq), // unsigned
                        p: pBuffer,
                        q: qBuffer,
                        nonce: resPQ.nonce,
                        serverNonce: resPQ.serverNonce,
                        newNonce: newNonce,
                    }).getBytes();
                    if (pqInnerData.length > 144) {
                        throw new errors_1.SecurityError('Step 1 invalid nonce from server');
                    }
                    for (_i = 0, _b = resPQ.serverPublicKeyFingerprints; _i < _b.length; _i++) {
                        fingerprint = _b[_i];
                        targetKey = RSA_1.SERVER_KEYS.get(fingerprint.toString());
                        if (targetKey !== undefined) {
                            targetFingerprint = fingerprint;
                            break;
                        }
                    }
                    if (targetFingerprint === undefined || targetKey === undefined) {
                        throw new errors_1.SecurityError('Step 2 could not find a valid key for fingerprints');
                    }
                    padding = Helpers.generateRandomBytes(192 - pqInnerData.length);
                    dataWithPadding = Buffer.concat([pqInnerData, padding]);
                    dataPadReversed = Buffer.from(dataWithPadding).reverse();
                    i = 0;
                    _j.label = 2;
                case 2:
                    if (!(i < RETRIES)) return [3 /*break*/, 6];
                    tempKey = Helpers.generateRandomBytes(32);
                    return [4 /*yield*/, Helpers.sha256(Buffer.concat([tempKey, dataWithPadding]))];
                case 3:
                    shaDigestKeyWithData = _j.sent();
                    dataWithHash = Buffer.concat([dataPadReversed, shaDigestKeyWithData]);
                    ige_1 = new IGE(tempKey, Buffer.alloc(32));
                    aesEncrypted = ige_1.encryptIge(dataWithHash);
                    _d = (_c = Helpers).bufferXor;
                    _e = [tempKey];
                    return [4 /*yield*/, Helpers.sha256(aesEncrypted)];
                case 4:
                    tempKeyXor = _d.apply(_c, _e.concat([_j.sent()]));
                    keyAesEncrypted = Buffer.concat([tempKeyXor, aesEncrypted]);
                    keyAesEncryptedInt = Helpers.readBigIntFromBuffer(keyAesEncrypted, false, false);
                    if (keyAesEncryptedInt.greaterOrEquals(targetKey.n)) {
                        log.debug('Aes key greater than RSA. retrying');
                        return [3 /*break*/, 5];
                    }
                    encryptedDataBuffer = Helpers.modExp(keyAesEncryptedInt, bigInt(targetKey.e), targetKey.n);
                    encryptedData = Helpers.readBufferFromBigInt(encryptedDataBuffer, 256, false, false);
                    return [3 /*break*/, 6];
                case 5:
                    i++;
                    return [3 /*break*/, 2];
                case 6:
                    if (encryptedData === undefined) {
                        throw new errors_1.SecurityError('Step 2 could create a secure encrypted key');
                    }
                    log.debug('Step 2 : Generated a secure aes encrypted data');
                    return [4 /*yield*/, sender.send(new api_1.default.ReqDHParams({
                            nonce: resPQ.nonce,
                            serverNonce: resPQ.serverNonce,
                            p: pBuffer,
                            q: qBuffer,
                            publicKeyFingerprint: targetFingerprint,
                            encryptedData: encryptedData,
                        }))];
                case 7:
                    serverDhParams = _j.sent();
                    if (!(serverDhParams instanceof api_1.default.ServerDHParamsOk
                        || serverDhParams instanceof api_1.default.ServerDHParamsFail)) {
                        throw new Error("Step 2.1 answer was ".concat(serverDhParams));
                    }
                    if (serverDhParams.nonce.neq(resPQ.nonce)) {
                        throw new errors_1.SecurityError('Step 2 invalid nonce from server');
                    }
                    if (serverDhParams.serverNonce.neq(resPQ.serverNonce)) {
                        throw new errors_1.SecurityError('Step 2 invalid server nonce from server');
                    }
                    if (!(serverDhParams instanceof api_1.default.ServerDHParamsFail)) return [3 /*break*/, 9];
                    return [4 /*yield*/, Helpers.sha1(Helpers.toSignedLittleBuffer(newNonce, 32).slice(4, 20))];
                case 8:
                    sh = _j.sent();
                    nnh = Helpers.readBigIntFromBuffer(sh, true, true);
                    if (serverDhParams.newNonceHash.neq(nnh)) {
                        throw new errors_1.SecurityError('Step 2 invalid DH fail nonce from server');
                    }
                    _j.label = 9;
                case 9:
                    if (!(serverDhParams instanceof api_1.default.ServerDHParamsOk)) {
                        throw new Error("Step 2.2 answer was ".concat(serverDhParams));
                    }
                    log.debug('Finished authKey generation step 2');
                    log.debug('Starting authKey generation step 3');
                    return [4 /*yield*/, Helpers.generateKeyDataFromNonce(resPQ.serverNonce, newNonce)];
                case 10:
                    _f = _j.sent(), key = _f.key, iv = _f.iv;
                    if (serverDhParams.encryptedAnswer.length % 16 !== 0) {
                        // See PR#453
                        throw new errors_1.SecurityError('Step 3 AES block size mismatch');
                    }
                    ige = new IGE(key, iv);
                    plainTextAnswer = ige.decryptIge(serverDhParams.encryptedAnswer);
                    reader = new BinaryReader(plainTextAnswer);
                    hash = reader.read(20);
                    serverDhInner = reader.tgReadObject();
                    if (!(serverDhInner instanceof api_1.default.ServerDHInnerData)) {
                        throw new Error("Step 3 answer was ".concat(serverDhInner));
                    }
                    return [4 /*yield*/, Helpers.sha1(serverDhInner.getBytes())];
                case 11:
                    sha1Answer = _j.sent();
                    if (!(hash.equals(sha1Answer))) {
                        throw new errors_1.SecurityError('Step 3 Invalid hash answer');
                    }
                    if (serverDhInner.nonce.neq(resPQ.nonce)) {
                        throw new errors_1.SecurityError('Step 3 Invalid nonce in encrypted answer');
                    }
                    if (serverDhInner.serverNonce.neq(resPQ.serverNonce)) {
                        throw new errors_1.SecurityError('Step 3 Invalid server nonce in encrypted answer');
                    }
                    if (serverDhInner.g !== 3 || serverDhInner.dhPrime.toString('hex') !== 'c71caeb9c6b1c9048e6c522f70f13'
                        + 'f73980d40238e3e21c14934d037563d930f48198a0aa7c14058229493d22530f4dbfa336f6e0ac925139543aed44cce7c3720fd5'
                        + '1f69458705ac68cd4fe6b6b13abdc9746512969328454f18faf8c595f642477fe96bb2a941d5bcd1d4ac8cc49880708fa9b378e3'
                        + 'c4f3a9060bee67cf9a4a4a695811051907e162753b56b0f6b410dba74d8a84b2a14b3144e0ef1284754fd17ed950d5965b4b9dd4'
                        + '6582db1178d169c6bc465b0d6ff9ca3928fef5b9ae4e418fc15e83ebea0f87fa9ff5eed70050ded2849f47bf959d956850ce9298'
                        + '51f0d8115f635b105ee2e4e15d04b2454bf6f4fadf034b10403119cd8e3b92fcc5b') {
                        throw new errors_1.SecurityError('Step 3 invalid dhPrime or g');
                    }
                    dhPrime = Helpers.readBigIntFromBuffer(serverDhInner.dhPrime, false, false);
                    ga = Helpers.readBigIntFromBuffer(serverDhInner.gA, false, false);
                    timeOffset = serverDhInner.serverTime - Math.floor(Date.now() / 1000);
                    b = Helpers.readBigIntFromBuffer(Helpers.generateRandomBytes(256), false, false);
                    gb = Helpers.modExp(bigInt(serverDhInner.g), b, dhPrime);
                    gab = Helpers.modExp(ga, b, dhPrime);
                    if (ga.lesserOrEquals(1)) {
                        throw new errors_1.SecurityError('Step 3 failed ga > 1 check');
                    }
                    if (gb.lesserOrEquals(1)) {
                        throw new errors_1.SecurityError('Step 3 failed gb > 1 check');
                    }
                    if (ga.greater(dhPrime.minus(1))) {
                        throw new errors_1.SecurityError('Step 3 failed ga > dh_prime - 1 check');
                    }
                    toCheckAgainst = bigInt(2).pow(2048 - 64);
                    if (!(ga.greaterOrEquals(toCheckAgainst) && ga.lesserOrEquals(dhPrime.minus(toCheckAgainst)))) {
                        throw new errors_1.SecurityError('Step 3 failed dh_prime - 2^{2048-64} < ga < 2^{2048-64} check');
                    }
                    if (!(gb.greaterOrEquals(toCheckAgainst) && gb.lesserOrEquals(dhPrime.minus(toCheckAgainst)))) {
                        throw new errors_1.SecurityError('Step 3 failed dh_prime - 2^{2048-64} < gb < 2^{2048-64} check');
                    }
                    clientDhInner = new api_1.default.ClientDHInnerData({
                        nonce: resPQ.nonce,
                        serverNonce: resPQ.serverNonce,
                        retryId: bigInt.zero, // TODO Actual retry ID
                        gB: Helpers.getByteArray(gb, false),
                    }).getBytes();
                    _h = (_g = Buffer).concat;
                    return [4 /*yield*/, Helpers.sha1(clientDhInner)];
                case 12:
                    clientDdhInnerHashed = _h.apply(_g, [[
                            _j.sent(),
                            clientDhInner
                        ]]);
                    clientDhEncrypted = ige.encryptIge(clientDdhInnerHashed);
                    return [4 /*yield*/, sender.send(new api_1.default.SetClientDHParams({
                            nonce: resPQ.nonce,
                            serverNonce: resPQ.serverNonce,
                            encryptedData: clientDhEncrypted,
                        }))];
                case 13:
                    dhGen = _j.sent();
                    nonceTypes = [api_1.default.DhGenOk, api_1.default.DhGenRetry, api_1.default.DhGenFail];
                    nonceTypesString = ['DhGenOk', 'DhGenRetry', 'DhGenFail'];
                    if (!(dhGen instanceof nonceTypes[0]
                        || dhGen instanceof nonceTypes[1]
                        || dhGen instanceof nonceTypes[2])) {
                        throw new Error("Step 3.1 answer was ".concat(dhGen));
                    }
                    name = dhGen.constructor.name;
                    if (dhGen.nonce.neq(resPQ.nonce)) {
                        throw new errors_1.SecurityError("Step 3 invalid ".concat(name, " nonce from server"));
                    }
                    if (dhGen.serverNonce.neq(resPQ.serverNonce)) {
                        throw new errors_1.SecurityError("Step 3 invalid ".concat(name, " server nonce from server"));
                    }
                    authKey = new AuthKey();
                    return [4 /*yield*/, authKey.setKey(Helpers.getByteArray(gab))];
                case 14:
                    _j.sent();
                    nonceNumber = 1 + nonceTypesString.indexOf(dhGen.className);
                    return [4 /*yield*/, authKey.calcNewNonceHash(newNonce, nonceNumber)];
                case 15:
                    newNonceHash = _j.sent();
                    dhHash = dhGen["newNonceHash".concat(nonceNumber)];
                    if (dhHash.neq(newNonceHash)) {
                        throw new errors_1.SecurityError('Step 3 invalid new nonce hash');
                    }
                    if (!(dhGen instanceof api_1.default.DhGenOk)) {
                        throw new Error("Step 3.2 answer was ".concat(dhGen));
                    }
                    log.debug('Finished authKey generation step 3');
                    return [2 /*return*/, { authKey: authKey, timeOffset: timeOffset }];
            }
        });
    });
}
exports.doAuthentication = doAuthentication;
