"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.checkAuthorization = exports.signInUserWithPreferredMethod = exports.authFlow = void 0;
var api_1 = __importDefault(require("../tl/api"));
var Utils_1 = __importDefault(require("../Utils"));
var Helpers_1 = require("../Helpers");
var Password_1 = require("../Password");
var DEFAULT_INITIAL_METHOD = "phoneNumber";
var QR_CODE_TIMEOUT = 30000;
function authFlow(client, apiCredentials, authParams) {
    return __awaiter(this, void 0, void 0, function () {
        var me;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!("botAuthToken" in authParams)) return [3 /*break*/, 2];
                    return [4 /*yield*/, signInBot(client, apiCredentials, authParams)];
                case 1:
                    me = _a.sent();
                    return [3 /*break*/, 6];
                case 2:
                    if (!("webAuthToken" in authParams && authParams.webAuthToken)) return [3 /*break*/, 4];
                    return [4 /*yield*/, signInUserWithWebToken(client, apiCredentials, authParams)];
                case 3:
                    me = _a.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, signInUserWithPreferredMethod(client, apiCredentials, authParams)];
                case 5:
                    me = _a.sent();
                    _a.label = 6;
                case 6:
                    // @ts-ignore
                    client._log.info("Signed in successfully as", Utils_1.default.getDisplayName(me));
                    return [2 /*return*/];
            }
        });
    });
}
exports.authFlow = authFlow;
function signInUserWithPreferredMethod(client, apiCredentials, authParams) {
    var _a = authParams.initialMethod, initialMethod = _a === void 0 ? DEFAULT_INITIAL_METHOD : _a;
    if (initialMethod === "phoneNumber") {
        return signInUser(client, apiCredentials, authParams);
    }
    else {
        return signInUserWithQrCode(client, apiCredentials, authParams);
    }
}
exports.signInUserWithPreferredMethod = signInUserWithPreferredMethod;
function checkAuthorization(client_1) {
    return __awaiter(this, arguments, void 0, function (client, shouldThrow) {
        var e_1;
        if (shouldThrow === void 0) { shouldThrow = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    // @ts-ignore
                    return [4 /*yield*/, client.invoke(new api_1.default.updates.GetState())];
                case 1:
                    // @ts-ignore
                    _a.sent();
                    return [2 /*return*/, true];
                case 2:
                    e_1 = _a.sent();
                    if (e_1.message === "Disconnect" || shouldThrow)
                        throw e_1;
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.checkAuthorization = checkAuthorization;
function signInUserWithWebToken(client, apiCredentials, authParams) {
    return __awaiter(this, void 0, void 0, function () {
        var apiId, apiHash, sendResult, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    apiId = apiCredentials.apiId, apiHash = apiCredentials.apiHash;
                    return [4 /*yield*/, client.invoke(new api_1.default.auth.ImportWebTokenAuthorization({
                            webAuthToken: authParams.webAuthToken,
                            apiId: apiId,
                            apiHash: apiHash,
                        }))];
                case 1:
                    sendResult = _a.sent();
                    if (sendResult instanceof api_1.default.auth.Authorization) {
                        return [2 /*return*/, sendResult.user];
                    }
                    else {
                        throw new Error("SIGN_UP_REQUIRED");
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    if (err_1.message === "SESSION_PASSWORD_NEEDED") {
                        return [2 /*return*/, signInWithPassword(client, apiCredentials, authParams, true)];
                    }
                    else {
                        client._log.error("Failed to login with web token: ".concat(err_1));
                        authParams.webAuthTokenFailed();
                        return [2 /*return*/, signInUserWithPreferredMethod(client, apiCredentials, __assign(__assign({}, authParams), { webAuthToken: undefined }))];
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function signInUser(client, apiCredentials, authParams) {
    return __awaiter(this, void 0, void 0, function () {
        var phoneNumber, phoneCodeHash, isCodeViaApp, err_2, sendCodeResult, err_3, phoneCode, isRegistrationRequired, termsOfService, err_4, result, err_5, _a, firstName, lastName, user, err_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    isCodeViaApp = false;
                    _b.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 12];
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 10, , 11]);
                    if (!(typeof authParams.phoneNumber === "function")) return [3 /*break*/, 7];
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, authParams.phoneNumber()];
                case 4:
                    phoneNumber = _b.sent();
                    return [3 /*break*/, 6];
                case 5:
                    err_2 = _b.sent();
                    if (err_2.message === "RESTART_AUTH_WITH_QR") {
                        return [2 /*return*/, signInUserWithQrCode(client, apiCredentials, authParams)];
                    }
                    throw err_2;
                case 6: return [3 /*break*/, 8];
                case 7:
                    phoneNumber = authParams.phoneNumber;
                    _b.label = 8;
                case 8: return [4 /*yield*/, sendCode(client, apiCredentials, phoneNumber, authParams.forceSMS)];
                case 9:
                    sendCodeResult = _b.sent();
                    phoneCodeHash = sendCodeResult.phoneCodeHash;
                    isCodeViaApp = sendCodeResult.isCodeViaApp;
                    if (typeof phoneCodeHash !== "string") {
                        throw new Error("Failed to retrieve phone code hash");
                    }
                    return [3 /*break*/, 12];
                case 10:
                    err_3 = _b.sent();
                    if (typeof authParams.phoneNumber !== "function") {
                        throw err_3;
                    }
                    authParams.onError(err_3);
                    return [3 /*break*/, 11];
                case 11: return [3 /*break*/, 1];
                case 12:
                    isRegistrationRequired = false;
                    _b.label = 13;
                case 13:
                    if (!1) return [3 /*break*/, 22];
                    _b.label = 14;
                case 14:
                    _b.trys.push([14, 20, , 21]);
                    _b.label = 15;
                case 15:
                    _b.trys.push([15, 17, , 18]);
                    return [4 /*yield*/, authParams.phoneCode(isCodeViaApp)];
                case 16:
                    phoneCode = _b.sent();
                    return [3 /*break*/, 18];
                case 17:
                    err_4 = _b.sent();
                    // This is the support for changing phone number from the phone code screen.
                    if (err_4.message === "RESTART_AUTH") {
                        return [2 /*return*/, signInUser(client, apiCredentials, authParams)];
                    }
                    return [3 /*break*/, 18];
                case 18:
                    if (!phoneCode) {
                        throw new Error("Code is empty");
                    }
                    return [4 /*yield*/, client.invoke(new api_1.default.auth.SignIn({
                            phoneNumber: phoneNumber,
                            phoneCodeHash: phoneCodeHash,
                            phoneCode: phoneCode,
                        }))];
                case 19:
                    result = _b.sent();
                    if (result instanceof api_1.default.auth.AuthorizationSignUpRequired) {
                        isRegistrationRequired = true;
                        termsOfService = result.termsOfService;
                        return [3 /*break*/, 22];
                    }
                    return [2 /*return*/, result.user];
                case 20:
                    err_5 = _b.sent();
                    if (err_5.message === "SESSION_PASSWORD_NEEDED") {
                        return [2 /*return*/, signInWithPassword(client, apiCredentials, authParams)];
                    }
                    else {
                        authParams.onError(err_5);
                    }
                    return [3 /*break*/, 21];
                case 21: return [3 /*break*/, 13];
                case 22:
                    if (!isRegistrationRequired) return [3 /*break*/, 31];
                    _b.label = 23;
                case 23:
                    if (!1) return [3 /*break*/, 31];
                    _b.label = 24;
                case 24:
                    _b.trys.push([24, 29, , 30]);
                    return [4 /*yield*/, authParams.firstAndLastNames()];
                case 25:
                    _a = _b.sent(), firstName = _a[0], lastName = _a[1];
                    if (!firstName) {
                        throw new Error("First name is required");
                    }
                    return [4 /*yield*/, client.invoke(new api_1.default.auth.SignUp({
                            phoneNumber: phoneNumber,
                            phoneCodeHash: phoneCodeHash,
                            firstName: firstName,
                            lastName: lastName,
                        }))];
                case 26:
                    user = (_b.sent()).user;
                    if (!termsOfService) return [3 /*break*/, 28];
                    // @ts-ignore
                    // This is a violation of Telegram rules: the user should be presented with and accept TOS.
                    return [4 /*yield*/, client.invoke(new api_1.default.help.AcceptTermsOfService({
                            id: termsOfService.id,
                        }))];
                case 27:
                    // @ts-ignore
                    // This is a violation of Telegram rules: the user should be presented with and accept TOS.
                    _b.sent();
                    _b.label = 28;
                case 28: return [2 /*return*/, user];
                case 29:
                    err_6 = _b.sent();
                    authParams.onError(err_6);
                    return [3 /*break*/, 30];
                case 30: return [3 /*break*/, 23];
                case 31:
                    authParams.onError(new Error("Auth failed"));
                    return [2 /*return*/, signInUser(client, apiCredentials, authParams)];
            }
        });
    });
}
function signInUserWithQrCode(client, apiCredentials, authParams) {
    return __awaiter(this, void 0, void 0, function () {
        var isScanningComplete, inputPromise, updatePromise, err_7, result2, migratedResult, err_8;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    isScanningComplete = false;
                    inputPromise = (function () { return __awaiter(_this, void 0, void 0, function () {
                        var result, token, expires;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!1) return [3 /*break*/, 3];
                                    if (isScanningComplete) {
                                        return [3 /*break*/, 3];
                                    }
                                    return [4 /*yield*/, client.invoke(new api_1.default.auth.ExportLoginToken({
                                            apiId: Number(process.env.TELEGRAM_API_ID),
                                            apiHash: process.env.TELEGRAM_API_HASH,
                                            exceptIds: [],
                                        }))];
                                case 1:
                                    result = _a.sent();
                                    if (!(result instanceof api_1.default.auth.LoginToken)) {
                                        throw new Error("Unexpected");
                                    }
                                    token = result.token, expires = result.expires;
                                    return [4 /*yield*/, Promise.race([
                                            authParams.qrCode({ token: token, expires: expires }),
                                            (0, Helpers_1.sleep)(QR_CODE_TIMEOUT),
                                        ])];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 0];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })();
                    updatePromise = new Promise(function (resolve) {
                        client.addEventHandler(function (update) {
                            if (update instanceof api_1.default.UpdateLoginToken) {
                                resolve();
                            }
                        }, { build: function (update) { return update; } });
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 6, 7]);
                    // Either we receive an update that QR is successfully scanned,
                    // or we receive a rejection caused by user going back to the regular auth form
                    return [4 /*yield*/, Promise.race([updatePromise, inputPromise])];
                case 2:
                    // Either we receive an update that QR is successfully scanned,
                    // or we receive a rejection caused by user going back to the regular auth form
                    _a.sent();
                    return [3 /*break*/, 7];
                case 3:
                    err_7 = _a.sent();
                    if (!(err_7.message === "RESTART_AUTH")) return [3 /*break*/, 5];
                    return [4 /*yield*/, signInUser(client, apiCredentials, authParams)];
                case 4: return [2 /*return*/, _a.sent()];
                case 5: throw err_7;
                case 6:
                    isScanningComplete = true;
                    return [7 /*endfinally*/];
                case 7:
                    _a.trys.push([7, 13, , 14]);
                    return [4 /*yield*/, client.invoke(new api_1.default.auth.ExportLoginToken({
                            apiId: Number(process.env.TELEGRAM_API_ID),
                            apiHash: process.env.TELEGRAM_API_HASH,
                            exceptIds: [],
                        }))];
                case 8:
                    result2 = _a.sent();
                    if (!(result2 instanceof api_1.default.auth.LoginTokenSuccess &&
                        result2.authorization instanceof api_1.default.auth.Authorization)) return [3 /*break*/, 9];
                    return [2 /*return*/, result2.authorization.user];
                case 9:
                    if (!(result2 instanceof api_1.default.auth.LoginTokenMigrateTo)) return [3 /*break*/, 12];
                    return [4 /*yield*/, client._switchDC(result2.dcId)];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, client.invoke(new api_1.default.auth.ImportLoginToken({
                            token: result2.token,
                        }))];
                case 11:
                    migratedResult = _a.sent();
                    if (migratedResult instanceof api_1.default.auth.LoginTokenSuccess &&
                        migratedResult.authorization instanceof api_1.default.auth.Authorization) {
                        return [2 /*return*/, migratedResult.authorization.user];
                    }
                    _a.label = 12;
                case 12: return [3 /*break*/, 14];
                case 13:
                    err_8 = _a.sent();
                    if (err_8.message === "SESSION_PASSWORD_NEEDED") {
                        return [2 /*return*/, signInWithPassword(client, apiCredentials, authParams)];
                    }
                    throw err_8;
                case 14: 
                // This is a workaround for TypeScript (never actually reached)
                // eslint-disable-next-line @typescript-eslint/no-throw-literal
                throw undefined;
            }
        });
    });
}
function sendCode(client_1, apiCredentials_1, phoneNumber_1) {
    return __awaiter(this, arguments, void 0, function (client, apiCredentials, phoneNumber, forceSMS) {
        var apiId, apiHash, sendResult, resendResult, err_9;
        if (forceSMS === void 0) { forceSMS = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    apiId = apiCredentials.apiId, apiHash = apiCredentials.apiHash;
                    return [4 /*yield*/, client.invoke(new api_1.default.auth.SendCode({
                            phoneNumber: phoneNumber,
                            apiId: apiId,
                            apiHash: apiHash,
                            settings: new api_1.default.CodeSettings(),
                        }))];
                case 1:
                    sendResult = _a.sent();
                    if (!(sendResult instanceof api_1.default.auth.SentCode)) {
                        throw Error("Unexpected SentCodeSuccess");
                    }
                    // If we already sent a SMS, do not resend the phoneCode (hash may be empty)
                    if (!forceSMS || sendResult.type instanceof api_1.default.auth.SentCodeTypeSms) {
                        return [2 /*return*/, {
                                phoneCodeHash: sendResult.phoneCodeHash,
                                isCodeViaApp: sendResult.type instanceof api_1.default.auth.SentCodeTypeApp,
                            }];
                    }
                    return [4 /*yield*/, client.invoke(new api_1.default.auth.ResendCode({
                            phoneNumber: phoneNumber,
                            phoneCodeHash: sendResult.phoneCodeHash,
                        }))];
                case 2:
                    resendResult = _a.sent();
                    if (!(resendResult instanceof api_1.default.auth.SentCode)) {
                        throw Error("Unexpected SentCodeSuccess");
                    }
                    return [2 /*return*/, {
                            phoneCodeHash: resendResult.phoneCodeHash,
                            isCodeViaApp: resendResult.type instanceof api_1.default.auth.SentCodeTypeApp,
                        }];
                case 3:
                    err_9 = _a.sent();
                    if (err_9.message === "AUTH_RESTART") {
                        return [2 /*return*/, sendCode(client, apiCredentials, phoneNumber, forceSMS)];
                    }
                    else {
                        throw err_9;
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function signInWithPassword(client_1, apiCredentials_1, authParams_1) {
    return __awaiter(this, arguments, void 0, function (client, apiCredentials, authParams, noReset) {
        var passwordSrpResult, password, passwordSrpCheck, user, err_10;
        if (noReset === void 0) { noReset = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!1) return [3 /*break*/, 8];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, client.invoke(new api_1.default.account.GetPassword())];
                case 2:
                    passwordSrpResult = _a.sent();
                    return [4 /*yield*/, authParams.password(passwordSrpResult.hint, noReset)];
                case 3:
                    password = _a.sent();
                    if (!password) {
                        throw new Error("Password is empty");
                    }
                    return [4 /*yield*/, (0, Password_1.computeCheck)(passwordSrpResult, password)];
                case 4:
                    passwordSrpCheck = _a.sent();
                    return [4 /*yield*/, client.invoke(new api_1.default.auth.CheckPassword({
                            password: passwordSrpCheck,
                        }))];
                case 5:
                    user = (_a.sent()).user;
                    return [2 /*return*/, user];
                case 6:
                    err_10 = _a.sent();
                    authParams.onError(err_10);
                    return [3 /*break*/, 7];
                case 7: return [3 /*break*/, 0];
                case 8: 
                // eslint-disable-next-line no-unreachable
                return [2 /*return*/, undefined]; // Never reached (TypeScript fix)
            }
        });
    });
}
function signInBot(client, apiCredentials, authParams) {
    return __awaiter(this, void 0, void 0, function () {
        var apiId, apiHash, botAuthToken, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiId = apiCredentials.apiId, apiHash = apiCredentials.apiHash;
                    botAuthToken = authParams.botAuthToken;
                    return [4 /*yield*/, client.invoke(new api_1.default.auth.ImportBotAuthorization({
                            apiId: apiId,
                            apiHash: apiHash,
                            botAuthToken: botAuthToken,
                        }))];
                case 1:
                    user = (_a.sent()).user;
                    return [2 /*return*/, user];
            }
        });
    });
}
