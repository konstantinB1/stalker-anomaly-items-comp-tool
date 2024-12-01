import { Armor, ArmorData, CompareType, CsvData, FileType } from "./types.js";
import { createUnit, getCsvFile, parseBool, parseUnit } from "./utils.js";

const normalizeArmorData = ([
    name,
    faction,
    type,
    weight,
    beltSlots,
    carryBonus,
    ballistic,
    burn,
    electric,
    chemical,
    radiation,
    psi,
    rupture,
    impact,
    explosive,
    hasHelmet,
    hasBackpack,
    noSprint,
]: string[]): ArmorData => ({
    name,
    faction,
    type,
    weight: parseUnit(weight),
    beltSlots: parseInt(beltSlots, 10),
    carryBonus: parseUnit(carryBonus),
    ballistic: parseUnit(ballistic),
    burn: parseUnit(burn),
    electric: parseUnit(electric),
    chemical: parseUnit(chemical),
    radiation: parseUnit(radiation),
    psi: parseUnit(psi),
    rupture: parseUnit(rupture),
    impact: parseUnit(impact),
    explosive: parseUnit(explosive),
    hasHelmet: parseBool(hasHelmet),
    hasBackpack: parseBool(hasBackpack),
    noSprint: parseBool(noSprint),
});

const getArmors = async (): Promise<Armor> => {
    const armorData: Armor = {
        fields: [],
        data: [],
    };

    await getCsvFile(FileType.Armors, (data, index) => {
        if (index === 0) {
            armorData.fields = data;
        } else {
            armorData.data.push(normalizeArmorData(data));
        }
    });

    return armorData;
};

export const createArmorStateEntry = async (): Promise<CsvData["armors"]> => ({
    text: CompareType.Armor,
    items: await getArmors(),
});

export const calculateArmorDiff = (
    leftArmor: ArmorData,
    rightArmor: ArmorData,
): Partial<ArmorData> => {
    const diffArmor: Partial<ArmorData> = {
        weight: createUnit(
            leftArmor.weight.value - rightArmor.weight.value,
            leftArmor.weight.unit,
        ),
        beltSlots: leftArmor.beltSlots - rightArmor.beltSlots,
        carryBonus: createUnit(
            leftArmor.carryBonus.value - rightArmor.carryBonus.value,
            leftArmor.carryBonus.unit,
        ),
        ballistic: createUnit(
            leftArmor.ballistic.value - rightArmor.ballistic.value,
            leftArmor.ballistic.unit,
        ),
        burn: createUnit(
            leftArmor.burn.value - rightArmor.burn.value,
            leftArmor.burn.unit,
        ),
        electric: createUnit(
            leftArmor.electric.value - rightArmor.electric.value,
            leftArmor.electric.unit,
        ),
        chemical: createUnit(
            leftArmor.chemical.value - rightArmor.chemical.value,
            leftArmor.chemical.unit,
        ),
        radiation: createUnit(
            leftArmor.radiation.value - rightArmor.radiation.value,
            leftArmor.radiation.unit,
        ),
        psi: createUnit(
            leftArmor.psi.value - rightArmor.psi.value,
            leftArmor.psi.unit,
        ),
        rupture: createUnit(
            leftArmor.rupture.value - rightArmor.rupture.value,
            leftArmor.rupture.unit,
        ),
        impact: createUnit(
            leftArmor.impact.value - rightArmor.impact.value,
            leftArmor.impact.unit,
        ),
        explosive: createUnit(
            leftArmor.explosive.value - rightArmor.explosive.value,
            leftArmor.explosive.unit,
        ),
        hasHelmet: leftArmor.hasHelmet !== rightArmor.hasHelmet,
        hasBackpack: leftArmor.hasBackpack !== rightArmor.hasBackpack,
        noSprint: leftArmor.noSprint !== rightArmor.noSprint,
    };

    return diffArmor;
};
