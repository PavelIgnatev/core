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
exports.downloadFile = void 0;
var big_integer_1 = __importDefault(require("big-integer"));
var Deferred_1 = __importDefault(require("../../../util/Deferred"));
var foreman_1 = require("../../../util/foreman");
var errors_1 = __importDefault(require("../errors"));
var api_1 = __importDefault(require("../tl/api"));
var Helpers_1 = require("../Helpers");
var Utils_1 = require("../Utils");
// Chunk sizes for `upload.getFile` must be multiple of the smallest size
var MIN_CHUNK_SIZE = 4096;
var DEFAULT_CHUNK_SIZE = 64; // kb
var ONE_MB = 1024 * 1024;
var DISCONNECT_SLEEP = 1000;
// when the sender requests hangs for 60 second we will reimport
var SENDER_TIMEOUT = 60 * 1000;
// Telegram may have server issues so we try several times
var SENDER_RETRIES = 5;
var FileView = /** @class */ (function () {
    function FileView(size) {
        this.size = size;
        // eslint-disable-next-line no-restricted-globals
        this.type =
            size && size > self.maxBufferSize ? "opfs" : "memory";
    }
    FileView.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var directory, downloadsFolder, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.type === "opfs")) return [3 /*break*/, 4];
                        // @ts-ignore
                        if (!(FileSystemFileHandle === null || FileSystemFileHandle === void 0 ? void 0 : FileSystemFileHandle.prototype.createSyncAccessHandle)) {
                            throw new Error("`createSyncAccessHandle` is not available. Cannot download files larger than 2GB.");
                        }
                        return [4 /*yield*/, null];
                    case 1:
                        directory = _b.sent();
                        return [4 /*yield*/, directory.getDirectoryHandle("downloads", { create: true })];
                    case 2:
                        downloadsFolder = _b.sent();
                        _a = this;
                        return [4 /*yield*/, downloadsFolder.getFileHandle(Math.random().toString(), { create: true })];
                    case 3:
                        _a.largeFile = _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        this.buffer = this.size ? Buffer.alloc(this.size) : Buffer.alloc(0);
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    FileView.prototype.write = function (data, offset) {
        if (this.type === "opfs") {
            this.largeFileAccessHandle.write(data, { at: offset });
        }
        else if (this.size) {
            for (var i = 0; i < data.length; i++) {
                if (offset + i >= this.buffer.length)
                    return;
                this.buffer.writeUInt8(data[i], offset + i);
            }
        }
        else {
            this.buffer = Buffer.concat([this.buffer, data]);
        }
    };
    FileView.prototype.getData = function () {
        if (this.type === "opfs") {
            return this.largeFile.getFile();
        }
        else {
            return Promise.resolve(this.buffer);
        }
    };
    return FileView;
}());
function downloadFile(client, inputLocation, fileParams, shouldDebugExportedSenders) {
    return __awaiter(this, void 0, void 0, function () {
        var dcId, i, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dcId = fileParams.dcId;
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < SENDER_RETRIES)) return [3 /*break*/, 9];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 8]);
                    return [4 /*yield*/, downloadFile2(client, inputLocation, fileParams, shouldDebugExportedSenders)];
                case 3: return [2 /*return*/, _a.sent()];
                case 4:
                    err_1 = _a.sent();
                    if (!((err_1.message.startsWith("SESSION_REVOKED") ||
                        err_1.message.startsWith("CONNECTION_NOT_INITED")) &&
                        i < SENDER_RETRIES - 1)) return [3 /*break*/, 6];
                    return [4 /*yield*/, client._cleanupExportedSenders(dcId)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 6: throw err_1;
                case 7: return [3 /*break*/, 8];
                case 8:
                    i++;
                    return [3 /*break*/, 1];
                case 9: return [2 /*return*/, undefined];
            }
        });
    });
}
exports.downloadFile = downloadFile;
var MAX_CONCURRENT_CONNECTIONS = 3;
var MAX_CONCURRENT_CONNECTIONS_PREMIUM = 6;
var MAX_WORKERS_PER_CONNECTION = 10;
var MULTIPLE_CONNECTIONS_MIN_FILE_SIZE = 10485760; // 10MB
var foremans = Array(MAX_CONCURRENT_CONNECTIONS_PREMIUM)
    .fill(undefined)
    .map(function () { return new foreman_1.Foreman(MAX_WORKERS_PER_CONNECTION); });
function downloadFile2(client, inputLocation, fileParams, shouldDebugExportedSenders) {
    return __awaiter(this, void 0, void 0, function () {
        var partSizeKb, end, fileSize, fileId, logWithId, isPremium, dcId, progressCallback, _a, start, partSize, partsCount, noParallel, shouldUseMultipleConnections, deferred, fileView, promises, offset, activeCounts, currentForemanIndex, hasEnded, progress, _loop_1, state_1;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    partSizeKb = fileParams.partSizeKb, end = fileParams.end;
                    fileSize = fileParams.fileSize;
                    fileId = "id" in inputLocation ? inputLocation.id : undefined;
                    logWithId = function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        if (!shouldDebugExportedSenders)
                            return;
                        // eslint-disable-next-line no-console
                        console.log.apply(console, __spreadArray(["\u2B07\uFE0F [".concat(fileId, "/").concat(fileParams.dcId, "]")], args, false));
                    };
                    logWithId("Downloading file...");
                    isPremium = Boolean(client.isPremium);
                    dcId = fileParams.dcId, progressCallback = fileParams.progressCallback, _a = fileParams.start, start = _a === void 0 ? 0 : _a;
                    end = end && end < fileSize ? end : fileSize - 1;
                    if (!partSizeKb) {
                        partSizeKb = fileSize
                            ? (0, Utils_1.getDownloadPartSize)(start ? end - start + 1 : fileSize)
                            : DEFAULT_CHUNK_SIZE;
                    }
                    partSize = partSizeKb * 1024;
                    partsCount = end ? Math.ceil((end + 1 - start + 1) / partSize) : 1;
                    noParallel = !end;
                    shouldUseMultipleConnections = fileSize &&
                        fileSize >= MULTIPLE_CONNECTIONS_MIN_FILE_SIZE &&
                        !noParallel;
                    if (partSize % MIN_CHUNK_SIZE !== 0) {
                        throw new Error("The part size must be evenly divisible by ".concat(MIN_CHUNK_SIZE));
                    }
                    client._log.info("Downloading file in chunks of ".concat(partSize, " bytes"));
                    fileView = new FileView(end - start + 1);
                    promises = [];
                    offset = start;
                    activeCounts = foremans.map(function (_a) {
                        var activeWorkers = _a.activeWorkers;
                        return activeWorkers;
                    });
                    currentForemanIndex = activeCounts.indexOf(Math.min.apply(Math, activeCounts));
                    hasEnded = false;
                    progress = 0;
                    if (progressCallback) {
                        progressCallback(progress);
                    }
                    // Allocate memory
                    return [4 /*yield*/, fileView.init()];
                case 1:
                    // Allocate memory
                    _b.sent();
                    _loop_1 = function () {
                        var limit, isPrecise, senderIndex, logWithSenderIndex;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    limit = partSize;
                                    isPrecise = false;
                                    if (Math.floor(offset / ONE_MB) !==
                                        Math.floor((offset + limit - 1) / ONE_MB)) {
                                        limit = ONE_MB - (offset % ONE_MB);
                                        isPrecise = true;
                                    }
                                    if (offset % MIN_CHUNK_SIZE !== 0 || limit % MIN_CHUNK_SIZE !== 0) {
                                        isPrecise = true;
                                    }
                                    senderIndex = !shouldUseMultipleConnections
                                        ? 0
                                        : currentForemanIndex %
                                            (isPremium
                                                ? MAX_CONCURRENT_CONNECTIONS_PREMIUM
                                                : MAX_CONCURRENT_CONNECTIONS);
                                    return [4 /*yield*/, foremans[senderIndex].requestWorker()];
                                case 1:
                                    _c.sent();
                                    if (!deferred) return [3 /*break*/, 3];
                                    return [4 /*yield*/, deferred.promise];
                                case 2:
                                    _c.sent();
                                    _c.label = 3;
                                case 3:
                                    if (noParallel)
                                        deferred = new Deferred_1.default();
                                    if (hasEnded) {
                                        foremans[senderIndex].releaseWorker();
                                        return [2 /*return*/, "break"];
                                    }
                                    logWithSenderIndex = function () {
                                        var args = [];
                                        for (var _i = 0; _i < arguments.length; _i++) {
                                            args[_i] = arguments[_i];
                                        }
                                        logWithId.apply(void 0, __spreadArray(["[".concat(senderIndex, "/").concat(dcId, "]")], args, false));
                                    };
                                    // eslint-disable-next-line no-loop-func, @typescript-eslint/no-loop-func
                                    promises.push((function (offsetMemo) { return __awaiter(_this, void 0, void 0, function () {
                                        var _loop_2, state_2;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    _loop_2 = function () {
                                                        var sender, isDone_1, isDone2_1, result, err_2;
                                                        return __generator(this, function (_b) {
                                                            switch (_b.label) {
                                                                case 0:
                                                                    sender = void 0;
                                                                    _b.label = 1;
                                                                case 1:
                                                                    _b.trys.push([1, 4, , 9]);
                                                                    isDone_1 = false;
                                                                    if (shouldDebugExportedSenders) {
                                                                        setTimeout(function () {
                                                                            if (isDone_1)
                                                                                return;
                                                                            logWithSenderIndex("\u2757\uFE0F\uFE0F getSender took too long ".concat(offsetMemo));
                                                                        }, 8000);
                                                                    }
                                                                    return [4 /*yield*/, client.getSender(dcId, senderIndex, isPremium)];
                                                                case 2:
                                                                    sender = _b.sent();
                                                                    isDone_1 = true;
                                                                    isDone2_1 = false;
                                                                    if (shouldDebugExportedSenders) {
                                                                        setTimeout(function () {
                                                                            if (isDone2_1)
                                                                                return;
                                                                            logWithSenderIndex("\u2757\uFE0F\uFE0F sender.send took too long ".concat(offsetMemo));
                                                                        }, 6000);
                                                                    }
                                                                    return [4 /*yield*/, Promise.race([
                                                                            sender.send(new api_1.default.upload.GetFile({
                                                                                location: inputLocation,
                                                                                offset: (0, big_integer_1.default)(offsetMemo),
                                                                                limit: limit,
                                                                                precise: isPrecise || undefined,
                                                                            })),
                                                                            (0, Helpers_1.sleep)(SENDER_TIMEOUT).then(function () {
                                                                                // If we're on the main DC we just cancel the download and let the user retry later
                                                                                if (dcId === client.session.dcId) {
                                                                                    logWithSenderIndex("Download timed out ".concat(offsetMemo));
                                                                                    return Promise.reject(new Error("USER_CANCELED"));
                                                                                }
                                                                                else {
                                                                                    logWithSenderIndex("Download timed out [not main] ".concat(offsetMemo));
                                                                                    return Promise.reject(new Error("SESSION_REVOKED"));
                                                                                }
                                                                            }),
                                                                        ])];
                                                                case 3:
                                                                    result = _b.sent();
                                                                    client.releaseExportedSender(sender);
                                                                    isDone2_1 = true;
                                                                    if (progressCallback) {
                                                                        if (progressCallback.isCanceled) {
                                                                            throw new Error("USER_CANCELED");
                                                                        }
                                                                        progress += 1 / partsCount;
                                                                        logWithSenderIndex("\u2B07\uFE0F\uFE0F ".concat(progress * 100, "%"));
                                                                        progressCallback(progress);
                                                                    }
                                                                    if (!end && result.bytes.length < limit) {
                                                                        hasEnded = true;
                                                                    }
                                                                    foremans[senderIndex].releaseWorker();
                                                                    if (deferred)
                                                                        deferred.resolve();
                                                                    fileView.write(result.bytes, offsetMemo - start);
                                                                    return [2 /*return*/, { value: void 0 }];
                                                                case 4:
                                                                    err_2 = _b.sent();
                                                                    if (!(sender && !sender.isConnected())) return [3 /*break*/, 6];
                                                                    return [4 /*yield*/, (0, Helpers_1.sleep)(DISCONNECT_SLEEP)];
                                                                case 5:
                                                                    _b.sent();
                                                                    return [2 /*return*/, "continue"];
                                                                case 6:
                                                                    if (!(err_2 instanceof errors_1.default.FloodWaitError)) return [3 /*break*/, 8];
                                                                    return [4 /*yield*/, (0, Helpers_1.sleep)(err_2.seconds * 1000)];
                                                                case 7:
                                                                    _b.sent();
                                                                    return [2 /*return*/, "continue"];
                                                                case 8:
                                                                    logWithSenderIndex("Ended not gracefully ".concat(offsetMemo));
                                                                    foremans[senderIndex].releaseWorker();
                                                                    if (deferred)
                                                                        deferred.resolve();
                                                                    hasEnded = true;
                                                                    client.releaseExportedSender(sender);
                                                                    throw err_2;
                                                                case 9: return [2 /*return*/];
                                                            }
                                                        });
                                                    };
                                                    _a.label = 1;
                                                case 1:
                                                    if (!true) return [3 /*break*/, 3];
                                                    return [5 /*yield**/, _loop_2()];
                                                case 2:
                                                    state_2 = _a.sent();
                                                    if (typeof state_2 === "object")
                                                        return [2 /*return*/, state_2.value];
                                                    return [3 /*break*/, 1];
                                                case 3: return [2 /*return*/];
                                            }
                                        });
                                    }); })(offset));
                                    offset += limit;
                                    currentForemanIndex++;
                                    if (end && offset > end) {
                                        return [2 /*return*/, "break"];
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _b.label = 2;
                case 2:
                    if (!true) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_1()];
                case 3:
                    state_1 = _b.sent();
                    if (state_1 === "break")
                        return [3 /*break*/, 4];
                    return [3 /*break*/, 2];
                case 4: return [4 /*yield*/, Promise.all(promises)];
                case 5:
                    _b.sent();
                    return [2 /*return*/, fileView.getData()];
            }
        });
    });
}
