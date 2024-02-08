import { CSVType, type Asset, type Line, type CSVResult } from "$lib/enums";
import { summarizeByType } from "$lib/utils/assets";
import { parseNubankCSV } from "./parseNubankCSV";


async function readFile(file: File): Promise<Line[]>{
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            if (e.target && e.target.result){
                const content = e.target.result as string;

                const lines = content.split("\n");

                resolve(lines);
            }

            reject();
        }

        reader.readAsText(file, 'windows-1252');
    })
}

export async function parseCSV(file: File, type: CSVType): Promise<CSVResult> {
    const lines = await readFile(file);

    const result = {} as CSVResult;

    switch (type){
        case CSVType.NuBank:
            result.investments = parseNubankCSV(lines);
    }

    result.summarize = summarizeByType(result.investments);

    return result;
}