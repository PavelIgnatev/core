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
exports.getTmpPassword = exports.updateTwoFaSettings = void 0;
// eslint-disable-next-line import/no-named-default
var api_1 = __importDefault(require("../tl/api"));
var Helpers_1 = require("../Helpers");
var Password_1 = require("../Password");
var errors_1 = __importDefault(require("../errors"));
/**
 * Changes the 2FA settings of the logged in user.
 Note that this method may be *incredibly* slow depending on the
 prime numbers that must be used during the process to make sure
 that everything is safe.

 Has no effect if both current and new password are omitted.

 * @param client: The telegram client instance
 * @param isCheckPassword: Must be ``true`` if you want to check the current password
 * @param currentPassword: The current password, to authorize changing to ``new_password``.
 Must be set if changing existing 2FA settings.
 Must **not** be set if 2FA is currently disabled.
 Passing this by itself will remove 2FA (if correct).
 * @param newPassword: The password to set as 2FA.
 If 2FA was already enabled, ``currentPassword`` **must** be set.
 Leaving this blank or `undefined` will remove the password.
 * @param hint: Hint to be displayed by Telegram when it asks for 2FA.
 Must be set when changing or creating a new password.
 Has no effect if ``newPassword`` is not set.
 * @param email: Recovery and verification email. If present, you must also
 set `emailCodeCallback`, else it raises an Error.
 * @param emailCodeCallback: If an email is provided, a callback that returns the code sent
 to it must also be set. This callback may be asynchronous.
 It should return a string with the code. The length of the
 code will be passed to the callback as an input parameter.

 If the callback returns an invalid code, it will raise an rpc error with the message
 ``CODE_INVALID``

 * @returns Promise<void>
 * @throws this method can throw:
 "PASSWORD_HASH_INVALID" if you entered a wrong password (or set it to undefined).
 "EMAIL_INVALID" if the entered email is wrong
 "EMAIL_HASH_EXPIRED" if the user took too long to verify their email
 */
function updateTwoFaSettings(client_1, _a) {
    return __awaiter(this, arguments, void 0, function (client, _b) {
        var pwd, password, _c, _d, _e, _f, _g, _h, _j, _k, e_1, code, err_1;
        var _l, _m;
        var isCheckPassword = _b.isCheckPassword, currentPassword = _b.currentPassword, newPassword = _b.newPassword, _o = _b.hint, hint = _o === void 0 ? "" : _o, email = _b.email, emailCodeCallback = _b.emailCodeCallback, onEmailCodeError = _b.onEmailCodeError;
        return __generator(this, function (_p) {
            switch (_p.label) {
                case 0:
                    if (!newPassword && !currentPassword) {
                        throw new Error("Neither `currentPassword` nor `newPassword` is present");
                    }
                    if (email && !(emailCodeCallback && onEmailCodeError)) {
                        throw new Error("`email` present without `emailCodeCallback` and `onEmailCodeError`");
                    }
                    return [4 /*yield*/, client.invoke(new api_1.default.account.GetPassword())];
                case 1:
                    pwd = _p.sent();
                    if (!(pwd.newAlgo instanceof api_1.default.PasswordKdfAlgoUnknown)) {
                        pwd.newAlgo.salt1 = Buffer.concat([
                            pwd.newAlgo.salt1,
                            (0, Helpers_1.generateRandomBytes)(32),
                        ]);
                    }
                    if (!pwd.hasPassword && currentPassword) {
                        currentPassword = undefined;
                    }
                    if (!currentPassword) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, Password_1.computeCheck)(pwd, currentPassword)];
                case 2:
                    _c = _p.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _c = new api_1.default.InputCheckPasswordEmpty();
                    _p.label = 4;
                case 4:
                    password = _c;
                    if (!isCheckPassword) return [3 /*break*/, 6];
                    // @ts-ignore
                    return [4 /*yield*/, client.invoke(new api_1.default.auth.CheckPassword({ password: password }))];
                case 5:
                    // @ts-ignore
                    _p.sent();
                    return [2 /*return*/];
                case 6:
                    _p.trys.push([6, 11, , 21]);
                    _e = (_d = client).invoke;
                    _g = (_f = api_1.default.account.UpdatePasswordSettings).bind;
                    _l = {
                        password: password
                    };
                    _j = (_h = api_1.default.account.PasswordInputSettings).bind;
                    _m = {
                        newAlgo: pwd.newAlgo
                    };
                    if (!newPassword) return [3 /*break*/, 8];
                    return [4 /*yield*/, (0, Password_1.computeDigest)(pwd.newAlgo, newPassword)];
                case 7:
                    _k = _p.sent();
                    return [3 /*break*/, 9];
                case 8:
                    _k = Buffer.alloc(0);
                    _p.label = 9;
                case 9: 
                // @ts-ignore
                return [4 /*yield*/, _e.apply(_d, [new (_g.apply(_f, [void 0, (_l.newSettings = new (_j.apply(_h, [void 0, (_m.newPasswordHash = _k,
                                    _m.hint = hint,
                                    _m.email = email,
                                    // not explained what it does and it seems to always be set to empty in tdesktop
                                    _m.newSecureSettings = undefined,
                                    _m)]))(),
                                _l)]))()])];
                case 10:
                    // @ts-ignore
                    _p.sent();
                    return [3 /*break*/, 21];
                case 11:
                    e_1 = _p.sent();
                    if (!(e_1 instanceof errors_1.default.EmailUnconfirmedError)) return [3 /*break*/, 19];
                    _p.label = 12;
                case 12:
                    if (!true) return [3 /*break*/, 18];
                    _p.label = 13;
                case 13:
                    _p.trys.push([13, 16, , 17]);
                    return [4 /*yield*/, emailCodeCallback(e_1.codeLength)];
                case 14:
                    code = _p.sent();
                    if (!code) {
                        throw new Error("Code is empty");
                    }
                    // @ts-ignore
                    return [4 /*yield*/, client.invoke(new api_1.default.account.ConfirmPasswordEmail({ code: code }))];
                case 15:
                    // @ts-ignore
                    _p.sent();
                    return [3 /*break*/, 18];
                case 16:
                    err_1 = _p.sent();
                    onEmailCodeError(err_1);
                    return [3 /*break*/, 17];
                case 17: return [3 /*break*/, 12];
                case 18: return [3 /*break*/, 20];
                case 19: throw e_1;
                case 20: return [3 /*break*/, 21];
                case 21: return [2 /*return*/];
            }
        });
    });
}
exports.updateTwoFaSettings = updateTwoFaSettings;
function getTmpPassword(client_1, currentPassword_1) {
    return __awaiter(this, arguments, void 0, function (client, currentPassword, ttl) {
        var pwd, inputPassword, result, err_2;
        if (ttl === void 0) { ttl = 60; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.invoke(new api_1.default.account.GetPassword())];
                case 1:
                    pwd = _a.sent();
                    if (!pwd) {
                        return [2 /*return*/, undefined];
                    }
                    return [4 /*yield*/, (0, Password_1.computeCheck)(pwd, currentPassword)];
                case 2:
                    inputPassword = _a.sent();
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, client.invoke(new api_1.default.account.GetTmpPassword({
                            password: inputPassword,
                            period: ttl,
                        }))];
                case 4:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 5:
                    err_2 = _a.sent();
                    if (err_2.message === "PASSWORD_HASH_INVALID") {
                        return [2 /*return*/, { error: err_2.message }];
                    }
                    throw err_2;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getTmpPassword = getTmpPassword;
