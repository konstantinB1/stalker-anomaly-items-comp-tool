export type ValueOf<T> = T extends Record<any, infer V> ? V : never;

export type AllData = {
    armors: Armor[];
};

export type Unit = {
    value: number;
    unit: string;
    toString: () => string;
};

export type Armor = {
    data: ArmorData[];
    fields: string[];
};

export type ArmorData = {
    name: string;
    faction: string;
    type: string;
    weight: Unit;
    beltSlots: number;
    carryBonus: Unit;
    ballistic: Unit;
    burn: Unit;
    electric: Unit;
    chemical: Unit;
    radiation: Unit;
    psi: Unit;
    rupture: Unit;
    impact: Unit;
    explosive: Unit;
    hasHelmet: boolean;
    hasBackpack: boolean;
    noSprint: boolean;
};

export enum FileType {
    Armors = "all_armors",
    Weapons = "all_weapons",
}

export enum CompareType {
    Armor = "Armor",
    Weapon = "Weapon",
}

export type CsvData = {
    armors: {
        text: CompareType.Armor;
        items: Armor;
    };
};

export type SelectData = {
    label: string;
    value: string;
};

export type ParagraphData = {
    label: string;
    value: string;
    labelClassName?: string;
    valueClassName?: string;
    wrapperClassName?: string;
};

export type GlobalState = {
    csvData: CsvData;
    selectedLeftName: string;
    selectedRightName: string;
    selectedLeftType: CompareType;
    selectedRightType: CompareType;
};
