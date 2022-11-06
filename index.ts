import * as readline from "node:readline";
const { createCanvas, loadImage } = require("canvas");
const open = require("open");
const ncp = require("copy-paste");
import { stdin as input, stdout as output } from "node:process";

const multiple: number = 100;
const size = [20, 20];

const canvas = createCanvas(size[0] * multiple, size[1] * multiple);
const ctx = canvas.getContext("2d");

(async () => {
    for (var x = 0; x < size[0]; x++) {
        for (var y = 0; y < size[1]; y++) {
            plot(x, y, false);
        }
    }
    //#region Eyes
    await plotLine(5, 5, 6, 5);
    await plotLine(5, 6, 6, 6);
    await plotLine(size[0] - 7, 5, size[0] - 6, 5);
    await plotLine(size[0] - 7, 6, size[0] - 6, 6);
    //#endregion
    //#region Smile
    await plotLine(5, size[1] - 5, size[0] - 6, size[1] - 5);
    await plotLine(4, size[1] - 6, 4, size[1] - 6);
    await plotLine(size[0] - 5, size[1] - 6, size[0] - 5, size[1] - 6);
    //#endregion
    ncp.copy(canvas.toDataURL());
})();

function plotLineLow(x0: number, y0: number, x1: number, y1: number) {
    return new Promise<void>((resolve) => {
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
            } else D = D + 2 * dy;
        }
        resolve();
    });
}

function plotLineHigh(x0: number, y0: number, x1: number, y1: number) {
    return new Promise<void>((resolve) => {
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
            } else D = D + 2 * dx;
        }
        resolve();
    });
}

function plotLine(x0: number, y0: number, x1: number, y1: number) {
    return new Promise<void>((resolve) => {
        if (Math.abs(y1 - y0) < Math.abs(x1 - x0)) {
            if (x0 > x1) plotLineLow(x1, y1, x0, y0);
            else plotLineLow(x0, y0, x1, y1);
        } else {
            if (y0 > y1) plotLineHigh(x1, y1, x0, y0);
            else plotLineHigh(x0, y0, x1, y1);
        }
        resolve();
    });
}

function plot(x: number, y: number, on: boolean) {
    console.log(`${x}, ${y}`);
    ctx.fillStyle = "#000000";
    ctx.fillRect(x * multiple, y * multiple, multiple, multiple);
    if (on) ctx.fillStyle = "#ff5500";
    else ctx.fillStyle = "#111111";
    ctx.fillRect(
        x * multiple + 10,
        y * multiple + 10,
        multiple - 20,
        multiple - 20
    );
}

function question(query: string) {
    return new Promise<string>((resolve) => {
        const rl = readline.createInterface({ input, output });
        rl.question(query, (answer: string) => {
            resolve(answer);
            rl.close();
        });
    });
}

enum ExitType {
    normal,
    error,
}

function exit(reason: string, exitType: ExitType) {
    if (exitType == ExitType.error) {
        console.error("[ERR] " + reason);
    } else {
        console.log(reason);
    }
    process.exit();
}
