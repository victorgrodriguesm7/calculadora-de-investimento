import { InvestmentTypes, type Asset } from "$lib/enums";
import { notNull } from "./guards";
import { getInvestmentType } from "./investments";

export function addPercentage(assets: Asset[]): Asset[] {
    const total = assets.reduce((prev, curr) => prev + curr.total, 0);

    return assets.map((asset) => ({
        ...asset,
        currentPercentage: (asset.total * 100) / total
    }))
}

export function summarizeByType(assets: Asset[]): Asset[] {
    const grouped = assets.map((asset, index, self) => {
        if (self.findIndex((other) => other.type === asset.type) !== index){
            return null;    
        }

        return self.filter((other) => other.type === asset.type);
    }).filter(notNull);


    const existingAssets = grouped.reduce((filtered, groupedAssets) => {
        return [...filtered,
            groupedAssets.reduce((acc, currAsset) => {
                if (acc === null){
                    return {
                        ...currAsset,
                        label: getInvestmentType(currAsset.type).label,
                        type: currAsset.type,
                    }
                }

                return {
                    ...acc,
                    currentPercentage: acc.currentPercentage + currAsset.currentPercentage,
                    total: acc.total + currAsset.total,
                    percentageGoal: 0
                }
            }, null as unknown as Asset)
        ]
    }, [] as Asset[]);

    const investmentsNotFound = InvestmentTypes.filter(({ id }) => {
        return !existingAssets.some((asset) => asset.type === id)
    }).map((type) => ({ label: type.label, type: type.id, total: 0, currentPercentage: 0, percentageGoal: 0 }) as Asset);

    return existingAssets
        .concat(investmentsNotFound)
}