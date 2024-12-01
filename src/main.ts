import { calculateArmorDiff } from "./armor.js";
import {
    csvData,
    getName,
    getNames,
    getTextCategories,
    transformForParagraph,
    transformForSelect,
} from "./data.js";
import {
    attachListeners,
    populateItemSpec,
    populateSelectElement,
    selectors,
} from "./dom.js";
import { type Subsriber, createSubscriber } from "./subscriber.js";
import { CompareType, type GlobalState } from "./types.js";
import { assert, first } from "./utils.js";

function populateInitialData(rootState: GlobalState) {
    populateSelectElement(
        selectors.selectLeftRoot,
        getTextCategories(rootState.csvData),
        transformForSelect,
    );

    populateSelectElement(
        selectors.selectLeft,
        getNames(rootState.csvData.armors.items.data),
        transformForSelect,
    );

    populateItemSpec(
        selectors.leftResults,
        Object.entries(first(rootState.csvData.armors.items.data)),
        transformForParagraph,
    );

    populateSelectElement(
        selectors.selectRightRoot,
        getTextCategories(rootState.csvData),
        transformForSelect,
    );

    populateSelectElement(
        selectors.selectRight,
        getNames(rootState.csvData.armors.items.data),
        transformForSelect,
    );

    populateItemSpec(
        selectors.rightResults,
        Object.entries(first(rootState.csvData.armors.items.data)),
        transformForParagraph,
    );
}

function listenForChanges(store: Subsriber<GlobalState>) {
    store.subscribe(() => {
        const { selectedLeftName, selectedRightName, csvData } =
            store.getState();

        const entryLeft = getName(csvData.armors.items.data, selectedLeftName);
        const entryRight = getName(
            csvData.armors.items.data,
            selectedRightName,
        );

        populateItemSpec(
            selectors.leftResults,
            Object.entries(entryLeft!),
            transformForParagraph,
        );

        populateItemSpec(
            selectors.rightResults,
            Object.entries(entryRight!),
            transformForParagraph,
        );

        const calc = calculateArmorDiff(entryLeft!, entryRight!);

        populateItemSpec(
            selectors.calcResults,
            Object.entries(calc),
            transformForParagraph,
        );
    });
}

async function main() {
    const data = await csvData();
    const rootState: GlobalState = {
        csvData: data,
        selectedLeftName: first(data.armors.items.data).name,
        selectedLeftType: CompareType.Armor,
        selectedRightName: first(data.armors.items.data).name,
        selectedRightType: CompareType.Armor,
    };

    const store = createSubscriber(rootState);

    Object.entries(selectors).forEach(([key, value]) => {
        assert(value, `element ${key} not found`);
    });

    populateInitialData(rootState);

    attachListeners(store);
    listenForChanges(store);
}

document.addEventListener("DOMContentLoaded", main);
