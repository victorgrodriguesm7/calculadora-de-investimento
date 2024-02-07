export enum InvestmentType {
    "Renda Fixa",
    "Renda Varíavel"
}

export type Investment = {
    label: string;
    type: InvestmentType;
}

export const Investments: Investment[] = [
    { label: "Tesouro Direto", type: InvestmentType["Renda Fixa"] },
    { label: "CDB", type: InvestmentType["Renda Fixa"] },
    { label: "LC", type: InvestmentType["Renda Fixa"] },
    { label: "LCI", type: InvestmentType["Renda Fixa"] },
    { label: "LCA", type: InvestmentType["Renda Fixa"] },
    { label: "CRI", type: InvestmentType["Renda Fixa"] },
    { label: "CRA", type: InvestmentType["Renda Fixa"] },
    { label: "Ação", type: InvestmentType["Renda Varíavel"] },
    { label: "FII", type: InvestmentType["Renda Varíavel"] },
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
    type: InvestmentType;
    label: string;
    total: number;
}
