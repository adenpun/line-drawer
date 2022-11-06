"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("node:readline"));
const { createCanvas, loadImage } = require("canvas");
const open = require("open");
const ncp = require("copy-paste");
const node_process_1 = require("node:process");
const multiple = 100;
const size = [20, 20];
const canvas = createCanvas(size[0] * multiple, size[1] * multiple);
const ctx = canvas.getContext("2d");
(() => __awaiter(void 0, void 0, void 0, function* () {
    for (var x = 0; x < size[0]; x++) {
        for (var y = 0; y < size[1]; y++) {
            plot(x, y, false);
        }
    }
    // -=-=-=-Write your code between this-=-=-=- \\
    //#region Eyes
    yield plotLine(5, 5, 6, 5);
    yield plotLine(5, 6, 6, 6);
    yield plotLine(size[0] - 7, 5, size[0] - 6, 5);
    yield plotLine(size[0] - 7, 6, size[0] - 6, 6);
    //#endregion
    //#region Smile
    yield plotLine(5, size[1] - 5, size[0] - 6, size[1] - 5);
    yield plotLine(4, size[1] - 6, 4, size[1] - 6);
    yield plotLine(size[0] - 5, size[1] - 6, size[0] - 5, size[1] - 6);
    //#endregion
    // -=-=-=-and this-=-=-=- \\
    ncp.copy(canvas.toDataURL());
}))();
function plotLineLow(x0, y0, x1, y1) {
    return new Promise((resolve) => {
        var dx = x1 - x0;
        var dy = y1 - y0;
        var yi = 1;
        if (dy < 0) {
            yi = -1;
            dy = -dy;
        }
        var D = 2 * dy - dx;
        var y = y0;
        for (var x = x0; x <= x1; x++) {
            plot(x, y, true);
            if (D > 0) {
                y = y + yi;
                D = D + 2 * (dy - dx);
            }
            else
                D = D + 2 * dy;
        }
        resolve();
    });
}
function plotLineHigh(x0, y0, x1, y1) {
    return new Promise((resolve) => {
        var dx = x1 - x0;
        var dy = y1 - y0;
        var xi = 1;
        if (dx < 0) {
            xi = -1;
            dy = -dy;
        }
        var D = 2 * dx - dy;
        var x = x0;
        for (var y = y0; y <= y1; y++) {
            plot(x, y, true);
            if (D > 0) {
                x = x + xi;
                D = D + 2 * (dx - dy);
            }
            else
                D = D + 2 * dx;
        }
        resolve();
    });
}
function plotLine(x0, y0, x1, y1) {
    return new Promise((resolve) => {
        if (Math.abs(y1 - y0) < Math.abs(x1 - x0)) {
            if (x0 > x1)
                plotLineLow(x1, y1, x0, y0);
            else
                plotLineLow(x0, y0, x1, y1);
        }
        else {
            if (y0 > y1)
                plotLineHigh(x1, y1, x0, y0);
            else
                plotLineHigh(x0, y0, x1, y1);
        }
        resolve();
    });
}
function plot(x, y, on) {
    console.log(`${x}, ${y}`);
    ctx.fillStyle = "#000000";
    ctx.fillRect(x * multiple, y * multiple, multiple, multiple);
    if (on)
        ctx.fillStyle = "#ff5500";
    else
        ctx.fillStyle = "#111111";
    ctx.fillRect(x * multiple + 10, y * multiple + 10, multiple - 20, multiple - 20);
}
function question(query) {
    return new Promise((resolve) => {
        const rl = readline.createInterface({ input: node_process_1.stdin, output: node_process_1.stdout });
        rl.question(query, (answer) => {
            resolve(answer);
            rl.close();
        });
    });
}
var ExitType;
(function (ExitType) {
    ExitType[ExitType["normal"] = 0] = "normal";
    ExitType[ExitType["error"] = 1] = "error";
})(ExitType || (ExitType = {}));
function exit(reason, exitType) {
    if (exitType == ExitType.error) {
        console.error("[ERR] " + reason);
    }
    else {
        console.log(reason);
    }
    process.exit();
}
