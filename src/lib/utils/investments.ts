import { InvestmentTypes, type InvestmentType } from "$lib/enums";

export function findInvestmentTypeByLabel(value: string): InvestmentType {

    const investment = InvestmentTypes
        .find(({ label }) => label === value);
    
    if (investment) return investment;

    return InvestmentTypes[0]
}