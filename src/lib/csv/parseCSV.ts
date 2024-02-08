import { CSVType, type Asset, type Line } from "$lib/enums";
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

export async function parseCSV(file: File, type: CSVType): Promise<Asset[]> {
    const lines = await readFile(file);

    switch (type){
        case CSVType.NuBank:
            return parseNubankCSV(lines);
    }
}