import { Unit } from "./types.js";

export const assert = (condition: any, message: string) => {
    if (!condition) {
        throw new Error(`Assertion failed: ${message}`);
    }
};

export const splitByComma = (str: string) => str.split(",");
export const splitByLine = (str: string) => str.split("\n");
export const endsWith = (str: string) => (suffix: string) =>
    str.toLowerCase().endsWith(suffix);
export const parseBool = (value: string) => value.startsWith("TRUE");
export const first = <T>(arr: T[]) => arr[0];

const KNOWN_UNITS = new Set(["kg", "%"]);

export const parseUnit = (value: string): Unit => {
    const unit = Array.from(KNOWN_UNITS).find(endsWith(value));

    if (!unit) {
        throw new Error(`Unknown unit: ${value}`);
    }

    const [rawValue] = value.split(unit);

    return {
        value: parseFloat(rawValue),
        unit,
        toString: () => `${rawValue}${unit}`,
    };
};

export const createUnit = (value: number, unit: string): Unit => ({
    value,
    unit,
    toString: () => `${value}${unit}`,
});

const fetchCsv = async (file: string): Promise<string> => {
    const response = await fetch(`./src/${file}.csv`, {
        headers: {
            "Content-Type": "text/csv",
        },
    });

    assert(response.ok, `Failed to fetch ${file}.csv`);
    assert(response.body, `No body found in response`);

    return await response.text();
};

export async function getCsvFile<T>(
    file: string,
    transform: (data: string[], index: number) => T,
): Promise<void> {
    try {
        const response = await fetchCsv(file);
        return splitByLine(response).forEach((row, i) => {
            const splitRow = splitByComma(row);
            return transform(splitRow, i);
        });
    } catch (e) {
        console.error(e);
    }
}

export const convertToString = <T>(value: T): string => {
    if (typeof value === "string") {
        return value;
    }

    if (value === null || value === undefined) {
        console.error(`No value found`);
        return `N/A`;
    }

    let text = "";

    switch (typeof value) {
        case "number":
            text = `${value}`;
            break;
        case "object":
            text = value.toString();
            break;
        case "boolean":
            text = value ? "Yes" : "No";
            break;
        default:
            throw new Error(`Unknown type: ${typeof value}`);
    }

    return text;
};

export const capitalize = (str: string) =>
    str?.[0].toUpperCase() + str?.slice(1).toLowerCase();

export const camelToTitle = (str: string) => {
    const result = str.replace(/([A-Z])/g, " $1");
    return capitalize(result);
};
