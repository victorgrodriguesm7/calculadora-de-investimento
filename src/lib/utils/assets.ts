import { InvestmentTypes, type Asset, type AssetWithDeposit } from "$lib/enums";
import { notNull } from "./guards";
import { getInvestmentType } from "./investments";

export function calculatePercent(value: number, total: number): number {
    return (value * 100) / total
}

export function addPercentage(assets: Asset[]): Asset[] {
    const total = assets.reduce((prev, curr) => prev + curr.total, 0);

    return assets.map((asset) => ({
        ...asset,
        currentPercentage: calculatePercent(asset.total,total)
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

export function calculateDeposit(assets: Asset[], deposit: number): AssetWithDeposit[] {
    const total = assets.reduce((acc, curr) => curr.total + acc, 0) + deposit;
    assets = assets
        .map((asset) => ({ ...asset, currentPercentage: calculatePercent(asset.total, total)}))
    
    const existing = assets.filter((curr) => (curr.percentageGoal !== 0) || (curr.total > 0));

    const assetsAlreadyWithGoal = existing.filter((assets) => assets.currentPercentage > assets.percentageGoal);
    const assetsToDeposit = existing.filter((assets) => assets.currentPercentage < assets.percentageGoal);
    const over = assetsAlreadyWithGoal.reduce<number>((acc: number, curr: Asset) => acc + curr.percentageGoal, 0);


    return assetsToDeposit
        .map((asset) => ({ ...asset, percentageGoal: asset.percentageGoal + (over / assetsToDeposit.length )}))
        .map<AssetWithDeposit>((asset) => ({ ...asset, toDeposit: (asset.percentageGoal / 100) * deposit, newPercentage: 0}))
        .concat(assetsAlreadyWithGoal.map<AssetWithDeposit>((asset) => ({ ...asset, toDeposit: 0, percentageGoal: 0, newPercentage: 0})))
        .map((asset) => ({ ...asset, newPercentage: calculatePercent(asset.total + asset.toDeposit, total)}))
}