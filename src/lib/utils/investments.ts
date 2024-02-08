import { InvestmentTypes, type InvestmentType } from "$lib/enums";

export function findInvestmentTypeByLabel(value: string): InvestmentType {

    const investment = InvestmentTypes
        .find(({ label }) => label === value);
    
    if (investment) return investment;

    return InvestmentTypes[0]
}

export function getInvestmentType(id: number): InvestmentType {

    const investment = InvestmentTypes
        .find((investment) => investment.id === id);
    
    if (investment) return investment;

    return InvestmentTypes[0]
}