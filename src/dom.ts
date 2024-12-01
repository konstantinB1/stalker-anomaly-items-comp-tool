import { type Subsriber } from "./subscriber";
import { GlobalState, ParagraphData, SelectData } from "./types";

export const selectors = {
    selectLeftRoot: document.getElementById(
        "select-left-root",
    ) as HTMLSelectElement,
    selectRightRoot: document.getElementById(
        "select-right-root",
    ) as HTMLSelectElement,
    selectLeft: document.getElementById("select-left-sub") as HTMLSelectElement,
    selectRight: document.getElementById(
        "select-right-sub",
    ) as HTMLSelectElement,
    leftResults: document.getElementById("left-results") as HTMLElement,
    rightResults: document.getElementById("right-results") as HTMLElement,
    calcResults: document.getElementById("calc-results") as HTMLElement,
};

const clearElement = (element: HTMLElement) => {
    element.innerHTML = "";
};

export function populateSelectElement<T>(
    selector: HTMLSelectElement,
    data: T[],
    transform: (row: T) => SelectData,
): void {
    clearElement(selector);

    data.forEach((row) => {
        const option = document.createElement("option");
        const { label, value } = transform(row);
        option.text = label;
        option.value = value;

        selector.appendChild(option);
    });
}

export function populateItemSpec<TData, TElem extends HTMLElement>(
    selector: TElem,
    data: TData[],
    transform: (row: TData) => ParagraphData,
): void {
    clearElement(selector);

    data.forEach((row) => {
        const div = document.createElement("div");
        div.setAttribute("id", "left-item-spec");

        const labelEl = document.createElement("p");
        const valueEl = document.createElement("p");
        const {
            label: labelValue,
            labelClassName,
            wrapperClassName,
            valueClassName,
            value,
        } = transform(row);

        labelEl.innerText = labelValue;

        valueEl.innerText = value;

        if (labelClassName) {
            labelEl.classList.add(labelClassName);
        }

        if (wrapperClassName) {
            div.classList.add(wrapperClassName);
        }

        if (valueClassName) {
            valueEl.classList.add(valueClassName);
        }

        div.appendChild(labelEl);
        div.appendChild(valueEl);
        selector.appendChild(div);
    });
}

export function attachListeners(store: Subsriber<GlobalState>) {
    selectors.selectLeft.addEventListener("change", (e) => {
        const target = e.target as HTMLSelectElement;

        store.setState((prev) => ({
            ...prev,
            selectedLeftName: target.value.trim(),
        }));
    });

    selectors.selectRight.addEventListener("change", (e) => {
        const target = e.target as HTMLSelectElement;

        store.setState((prev) => ({
            ...prev,
            selectedRightName: target.value.trim(),
        }));
    });
}
