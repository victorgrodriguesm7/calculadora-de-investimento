import type { Asset, Line } from "$lib/enums";
import { addPercentage } from "$lib/utils/assets";
import { findInvestmentTypeByLabel } from "$lib/utils/investments";
import { parseLocaleNumber } from "$lib/utils/number";

const SEPARATOR_IDENTIFIER = "sep=";
const CSV_NUMBER_LOCALE = "pt-Br"

function parseTotal(line: Line[]): number {
    let parser = parseLocaleNumber(line[6], CSV_NUMBER_LOCALE);

    if (parser != 0) return parser

    parser = parseLocaleNumber(line[5], CSV_NUMBER_LOCALE);

    if (parser != 0) return parser
    parser = parseLocaleNumber(line[7], CSV_NUMBER_LOCALE);

    return parser
}

export function parseNubankCSV(lines: Line[]): Asset[] {
    // Inicio do arquivo do NuBank
    // sep=;
    // "TIPO DE INVESTIMENTO";"DESCRI��O";"VENCIMENTO";"TAXA NEGOCIADA";"QUANTIDADE";"VALOR APLICADO";"VALOR BRUTO";"VALOR L�QUIDO";"RENDIMENTO R$";"RENDIMENTO %"
    const separator = lines[0].slice(lines[0].indexOf(SEPARATOR_IDENTIFIER) + SEPARATOR_IDENTIFIER.length)
    const validLines = lines.slice(2).slice(0, -1);
    const content = validLines
        .map((line) => line.split(separator).map((v) => v.replace(/[\'\"]/g, '')));

    const assets = content.map((values) => {
        const investmentType = findInvestmentTypeByLabel(values[0]);

        return ({
            label: values[1],
            total: parseTotal(values),
            type: investmentType.id,
            investmentClass: investmentType.investmentClass
        }) as Asset
    });

    return addPercentage(assets);
}