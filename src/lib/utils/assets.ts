import type { Asset } from "$lib/enums";

export function addPercentage(assets: Asset[]): Asset[] {
    const total = assets.reduce((prev, curr) => prev + curr.total, 0);

    return assets.map((asset) => ({
        ...asset,
        currentPercentage: (asset.total * 100) / total
    }))
}

export function summarizeByType(assets: Asset[]): Asset[] {
    return assets.reduce((filtered, currAsset) => {
        const exists = filtered.some((asset: Asset) => asset.type === currAsset.type);

        if (exists){
            return [...filtered, currAsset]
        }
    }, [] as Asset[]);
}