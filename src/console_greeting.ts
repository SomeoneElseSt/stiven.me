import {
    getMessage,
    type LocaleId,
} from './i18n.js';

const BORDER_WIDTH = 48;
const INNER_WIDTH = 46;
const LEFT_PAD = '  ';
const TEXT_WIDTH = INNER_WIDTH - LEFT_PAD.length;

const PLAIN_CONSOLE_LOCALES: ReadonlySet<LocaleId> = new Set(['ja', 'hi', 'ko', 'zh']);

function usesPlainConsoleMessage(locale: LocaleId): boolean {
    return PLAIN_CONSOLE_LOCALES.has(locale);
}

const COMBINING_MARK = /\p{M}/u;

function isWideCodePoint(codePoint: number): boolean {
    if (codePoint >= 0x1100 && codePoint <= 0x115f) {
        return true;
    }
    if (codePoint >= 0x2329 && codePoint <= 0x232a) {
        return true;
    }
    if (codePoint >= 0x2e80 && codePoint <= 0xa4cf) {
        return true;
    }
    if (codePoint >= 0xac00 && codePoint <= 0xd7a3) {
        return true;
    }
    if (codePoint >= 0xf900 && codePoint <= 0xfaff) {
        return true;
    }
    if (codePoint >= 0xfe10 && codePoint <= 0xfe19) {
        return true;
    }
    if (codePoint >= 0xfe30 && codePoint <= 0xfe6f) {
        return true;
    }
    if (codePoint >= 0xff00 && codePoint <= 0xff60) {
        return true;
    }
    if (codePoint >= 0xffe0 && codePoint <= 0xffe6) {
        return true;
    }
    return false;
}

function getCharDisplayWidth(char: string): number {
    if (COMBINING_MARK.test(char)) {
        return 0;
    }
    const codePoint = char.codePointAt(0);
    if (codePoint === undefined) {
        return 0;
    }
    if (isWideCodePoint(codePoint)) {
        return 2;
    }
    return 1;
}

function displayWidth(text: string): number {
    let width = 0;
    for (const char of text) {
        width += getCharDisplayWidth(char);
    }
    return width;
}

function truncateToDisplayWidth(text: string, maxWidth: number): string {
    let width = 0;
    let result = '';
    for (const char of text) {
        const charWidth = getCharDisplayWidth(char);
        if (width + charWidth > maxWidth) {
            break;
        }
        width += charWidth;
        result += char;
    }
    return result;
}

function padToDisplayWidth(text: string, targetWidth: number): string {
    const currentWidth = displayWidth(text);
    if (currentWidth >= targetWidth) {
        return truncateToDisplayWidth(text, targetWidth);
    }
    return text + ' '.repeat(targetWidth - currentWidth);
}

function splitByDisplayWidth(text: string, maxWidth: number): string[] {
    const chars = [...text];
    const lines: string[] = [];
    let offset = 0;

    while (offset < chars.length) {
        let width = 0;
        let end = offset;

        while (end < chars.length) {
            const charWidth = getCharDisplayWidth(chars[end]);
            if (width + charWidth > maxWidth) {
                break;
            }
            width += charWidth;
            end += 1;
        }

        if (end === offset) {
            end = offset + 1;
        }

        lines.push(chars.slice(offset, end).join(''));
        offset = end;
    }

    return lines;
}

function wrapText(text: string, maxDisplayWidth: number): string[] {
    if (text.length === 0) {
        return [];
    }

    const hasSpaces = /\s/.test(text);
    if (!hasSpaces) {
        return splitByDisplayWidth(text, maxDisplayWidth);
    }

    const words = text.split(/\s+/).filter((word) => word.length > 0);
    const lines: string[] = [];
    let current = '';

    for (const word of words) {
        if (displayWidth(word) > maxDisplayWidth) {
            if (current.length > 0) {
                lines.push(current);
                current = '';
            }
            lines.push(...splitByDisplayWidth(word, maxDisplayWidth));
            continue;
        }

        const candidate = current.length === 0 ? word : `${current} ${word}`;
        if (displayWidth(candidate) > maxDisplayWidth) {
            lines.push(current);
            current = word;
            continue;
        }
        current = candidate;
    }

    if (current.length > 0) {
        lines.push(current);
    }

    return lines;
}

function formatInnerLine(text: string): string {
    const content = `${LEFT_PAD}${text}`;
    const padded = padToDisplayWidth(content, INNER_WIDTH);
    return `|${padded}|`;
}

function formatEmptyLine(): string {
    return `|${' '.repeat(INNER_WIDTH)}|`;
}

function buildFramedMessage(bodyLines: readonly string[]): string {
    const border = '='.repeat(BORDER_WIDTH);
    const rows = [border];

    for (const line of bodyLines) {
        if (line === '') {
            rows.push(formatEmptyLine());
            continue;
        }
        rows.push(formatInnerLine(line));
    }

    rows.push(border);
    return `\n${rows.join('\n')}\n`;
}

function buildPlainMessage(greeting: string, instruction: string): string {
    return `\n${greeting}\n\n${instruction}\n`;
}

export function buildCuriousConsoleMessage(locale: LocaleId): string {
    const greeting = getMessage(locale, 'consoleGreeting');
    const instruction = getMessage(locale, 'consoleInstruction');

    if (usesPlainConsoleMessage(locale)) {
        return buildPlainMessage(greeting, instruction);
    }

    const bodyLines: string[] = [
        '',
        greeting,
        '',
        ...wrapText(instruction, TEXT_WIDTH),
        '',
    ];

    return buildFramedMessage(bodyLines);
}

export function logCuriousGreeting(locale: LocaleId): void {
    console.log(buildCuriousConsoleMessage(locale));
}
