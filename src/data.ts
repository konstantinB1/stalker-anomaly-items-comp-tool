import { createArmorStateEntry } from "./armor.js";
import { CsvData, ParagraphData, SelectData } from "./types.js";
import { camelToTitle, convertToString } from "./utils.js";

export async function csvData(): Promise<CsvData> {
    const state: CsvData = {
        armors: await createArmorStateEntry(),
    };

    return state;
}

export const transformForParagraph = <T>([key, value]: [
    string,
    T,
]): ParagraphData => ({
    label: camelToTitle(key),
    value: convertToString(value),
    wrapperClassName: "item-spec",
});

export const getTextCategories = (state: CsvData): string[] =>
    Object.values(state).map(({ text }) => text);

export const transformForSelect = (category: string): SelectData => ({
    value: category,
    label: category,
});

export const getName = <
    T extends {
        name: string;
    }[],
    D extends T[0] | undefined,
>(
    state: T,
    name: string,
): D => state.find((row) => row.name === name) as unknown as D;

export const getNames = <T extends { name: string }>(state: T[]): string[] =>
    state.map(({ name }) => name);
