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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
// eslint-disable-next-line import/no-named-default
var api_1 = __importDefault(require("../tl/api"));
var Helpers_1 = require("../Helpers");
var Utils_1 = require("../Utils");
var errors_1 = __importDefault(require("../errors"));
var foreman_1 = require("../../../util/foreman");
var KB_TO_BYTES = 1024;
var LARGE_FILE_THRESHOLD = 10 * 1024 * 1024;
var DISCONNECT_SLEEP = 1000;
var MAX_CONCURRENT_CONNECTIONS = 3;
var MAX_CONCURRENT_CONNECTIONS_PREMIUM = 6;
var MAX_WORKERS_PER_CONNECTION = 10;
var foremans = Array(MAX_CONCURRENT_CONNECTIONS_PREMIUM).fill(undefined)
    .map(function () { return new foreman_1.Foreman(MAX_WORKERS_PER_CONNECTION); });
function uploadFile(client, fileParams, shouldDebugExportedSenders) {
    return __awaiter(this, void 0, void 0, function () {
        var file, onProgress, isPremium, name, size, fileId, isLarge, logWithId, partSize, partCount, activeCounts, currentForemanIndex, progress, promises, _loop_1, i, state_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    file = fileParams.file, onProgress = fileParams.onProgress;
                    isPremium = Boolean(client.isPremium);
                    name = file.name, size = file.size;
                    fileId = (0, Helpers_1.readBigIntFromBuffer)((0, Helpers_1.generateRandomBytes)(8), true, true);
                    isLarge = size > LARGE_FILE_THRESHOLD;
                    logWithId = function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        if (!shouldDebugExportedSenders)
                            return;
                        // eslint-disable-next-line no-console
                        console.log.apply(console, __spreadArray(["\u2B06\uFE0F [".concat(fileId, "]")], args, false));
                    };
                    logWithId('Uploading file...');
                    partSize = (0, Utils_1.getUploadPartSize)(size) * KB_TO_BYTES;
                    partCount = Math.floor((size + partSize - 1) / partSize);
                    activeCounts = foremans.map(function (_a) {
                        var activeWorkers = _a.activeWorkers;
                        return activeWorkers;
                    });
                    currentForemanIndex = activeCounts.indexOf(Math.min.apply(Math, activeCounts));
                    progress = 0;
                    if (onProgress) {
                        onProgress(progress);
                    }
                    promises = [];
                    _loop_1 = function (i) {
                        var senderIndex, logWithSenderIndex, blobSlice;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    senderIndex = currentForemanIndex % (isPremium ? MAX_CONCURRENT_CONNECTIONS_PREMIUM : MAX_CONCURRENT_CONNECTIONS);
                                    return [4 /*yield*/, foremans[senderIndex].requestWorker()];
                                case 1:
                                    _b.sent();
                                    if (onProgress === null || onProgress === void 0 ? void 0 : onProgress.isCanceled) {
                                        foremans[senderIndex].releaseWorker();
                                        return [2 /*return*/, "break"];
                                    }
                                    logWithSenderIndex = function () {
                                        var args = [];
                                        for (var _i = 0; _i < arguments.length; _i++) {
                                            args[_i] = arguments[_i];
                                        }
                                        logWithId.apply(void 0, __spreadArray(["[".concat(senderIndex, "]")], args, false));
                                    };
                                    blobSlice = file.slice(i * partSize, (i + 1) * partSize);
                                    // eslint-disable-next-line no-loop-func, @typescript-eslint/no-loop-func
                                    promises.push((function (jMemo, blobSliceMemo) { return __awaiter(_this, void 0, void 0, function () {
                                        var _loop_2, state_2;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    _loop_2 = function () {
                                                        var sender, isDone_1, isDone2_1, partBytes, err_1;
                                                        return __generator(this, function (_b) {
                                                            switch (_b.label) {
                                                                case 0:
                                                                    sender = void 0;
                                                                    _b.label = 1;
                                                                case 1:
                                                                    _b.trys.push([1, 5, , 10]);
                                                                    isDone_1 = false;
                                                                    if (shouldDebugExportedSenders) {
                                                                        setTimeout(function () {
                                                                            if (isDone_1)
                                                                                return;
                                                                            logWithSenderIndex("\u2757\uFE0F\uFE0F getSender took too long j=".concat(jMemo));
                                                                        }, 8000);
                                                                    }
                                                                    return [4 /*yield*/, client.getSender(client.session.dcId, senderIndex, isPremium)];
                                                                case 2:
                                                                    sender = _b.sent();
                                                                    isDone_1 = true;
                                                                    isDone2_1 = false;
                                                                    return [4 /*yield*/, blobSliceMemo.arrayBuffer()];
                                                                case 3:
                                                                    partBytes = _b.sent();
                                                                    if (shouldDebugExportedSenders) {
                                                                        setTimeout(function () {
                                                                            if (isDone2_1)
                                                                                return;
                                                                            logWithSenderIndex("\u2757\uFE0F\uFE0F sender.send took too long j=".concat(jMemo));
                                                                        }, 6000);
                                                                    }
                                                                    return [4 /*yield*/, sender.send(isLarge
                                                                            ? new api_1.default.upload.SaveBigFilePart({
                                                                                fileId: fileId,
                                                                                filePart: jMemo,
                                                                                fileTotalParts: partCount,
                                                                                bytes: Buffer.from(partBytes),
                                                                            })
                                                                            : new api_1.default.upload.SaveFilePart({
                                                                                fileId: fileId,
                                                                                filePart: jMemo,
                                                                                bytes: Buffer.from(partBytes),
                                                                            }))];
                                                                case 4:
                                                                    _b.sent();
                                                                    client.releaseExportedSender(sender);
                                                                    isDone2_1 = true;
                                                                    return [3 /*break*/, 10];
                                                                case 5:
                                                                    err_1 = _b.sent();
                                                                    logWithSenderIndex("\u2757\uFE0F\uFE0F\uFE0FUpload part failed ".concat(err_1 === null || err_1 === void 0 ? void 0 : err_1.toString(), " j=").concat(jMemo));
                                                                    if (!(sender && !sender.isConnected())) return [3 /*break*/, 7];
                                                                    return [4 /*yield*/, (0, Helpers_1.sleep)(DISCONNECT_SLEEP)];
                                                                case 6:
                                                                    _b.sent();
                                                                    return [2 /*return*/, "continue"];
                                                                case 7:
                                                                    if (!(err_1 instanceof errors_1.default.FloodWaitError)) return [3 /*break*/, 9];
                                                                    return [4 /*yield*/, (0, Helpers_1.sleep)(err_1.seconds * 1000)];
                                                                case 8:
                                                                    _b.sent();
                                                                    return [2 /*return*/, "continue"];
                                                                case 9:
                                                                    foremans[senderIndex].releaseWorker();
                                                                    client.releaseExportedSender(sender);
                                                                    throw err_1;
                                                                case 10:
                                                                    foremans[senderIndex].releaseWorker();
                                                                    if (onProgress) {
                                                                        if (onProgress.isCanceled) {
                                                                            throw new Error('USER_CANCELED');
                                                                        }
                                                                        progress += (1 / partCount);
                                                                        logWithSenderIndex("".concat(progress * 100, "%"));
                                                                        onProgress(progress);
                                                                    }
                                                                    return [2 /*return*/, "break"];
                                                            }
                                                        });
                                                    };
                                                    _a.label = 1;
                                                case 1:
                                                    if (!true) return [3 /*break*/, 3];
                                                    return [5 /*yield**/, _loop_2()];
                                                case 2:
                                                    state_2 = _a.sent();
                                                    if (state_2 === "break")
                                                        return [3 /*break*/, 3];
                                                    return [3 /*break*/, 1];
                                                case 3: return [2 /*return*/];
                                            }
                                        });
                                    }); })(i, blobSlice));
                                    currentForemanIndex++;
                                    return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < partCount)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_1(i)];
                case 2:
                    state_1 = _a.sent();
                    if (state_1 === "break")
                        return [3 /*break*/, 4];
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [4 /*yield*/, Promise.all(promises)];
                case 5:
                    _a.sent();
                    return [2 /*return*/, isLarge
                            ? new api_1.default.InputFileBig({
                                id: fileId,
                                parts: partCount,
                                name: name,
                            })
                            : new api_1.default.InputFile({
                                id: fileId,
                                parts: partCount,
                                name: name,
                                md5Checksum: '', // This is not a "flag", so not sure if we can make it optional.
                            })];
            }
        });
    });
}
exports.uploadFile = uploadFile;
