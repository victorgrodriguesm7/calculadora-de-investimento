export enum InvestmentClass {
    "Renda Fixa",
    "Renda Varíavel"
}

export type InvestmentType = {
    id: number;
    label: string;
    investmentClass: InvestmentClass;
}

export const InvestmentTypes: InvestmentType[] = [
    { id: 0, label: "Tesouro Direto", investmentClass: InvestmentClass["Renda Fixa"] },
    { id: 1, label: "CDB", investmentClass: InvestmentClass["Renda Fixa"] },
    { id: 2, label: "LC", investmentClass: InvestmentClass["Renda Fixa"] },
    { id: 3, label: "LCI", investmentClass: InvestmentClass["Renda Fixa"] },
    { id: 4, label: "LCA", investmentClass: InvestmentClass["Renda Fixa"] },
    { id: 5, label: "CRI", investmentClass: InvestmentClass["Renda Fixa"] },
    { id: 6, label: "CRA", investmentClass: InvestmentClass["Renda Fixa"] },
    { id: 7, label: "Ação", investmentClass: InvestmentClass["Renda Varíavel"] },
    { id: 8, label: "FII", investmentClass: InvestmentClass["Renda Varíavel"] },
]

export enum CSVType {
    NuBank
}

export type CSVOption = {
    label: string;
    type: CSVType;
}

export const CSVOptions = [
    { label: "NuBank", type: CSVType.NuBank }
]

export type Line = string;

export type Asset = {
    investmentClass: InvestmentClass;
    type: InvestmentClass;
    label: string;
    total: number;
    currentPercentage: number;
    percentageGoal: number;
}
