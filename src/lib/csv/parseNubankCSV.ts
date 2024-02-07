import type { Asset, Line } from "$lib/enums";

const SEPARATOR_IDENTIFIER = "sep=";

export function parseNubankCSV(lines: Line[]): Asset[] {
    // Inicio do arquivo do NuBank
    // sep=;
    // "TIPO DE INVESTIMENTO";"DESCRI��O";"VENCIMENTO";"TAXA NEGOCIADA";"QUANTIDADE";"VALOR APLICADO";"VALOR BRUTO";"VALOR L�QUIDO";"RENDIMENTO R$";"RENDIMENTO %"
    const separator = lines[0].slice(lines[0].indexOf(SEPARATOR_IDENTIFIER) + SEPARATOR_IDENTIFIER.length)
    console.log(separator)
    const validLines = lines.slice(2).slice(0, -1);
    const content = validLines.map((line) => line.split(separator));

    console.log(content);

    return []
}