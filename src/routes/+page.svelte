<script lang="ts">
    import { parseCSV } from "$lib/csv/parseCSV";
    import { CSVOptions, type CSVResult, CSVType, type Asset } from "$lib/enums";
    import { numberFormatter } from "$lib/utils/number";
    import { calculateDeposit } from "$lib/utils/assets";

    let isHidden = true;
    let files: FileList;
    let selectedCsv: CSVType;
    let result: CSVResult;
    let calculated: Asset[];
    let totalToInvest: number = 0;

    async function OnImport(e: SubmitEvent){
        e.preventDefault();

        if (files){
            if (files.length > 0){
                const file = files.item(0);

                if (file){
                    result = await parseCSV(file, selectedCsv);
                }
            }
        }
    }

    function onCalculate(){
        calculated = calculateDeposit(result.summarize, totalToInvest);
    }

    function renderHiddenable(value: string){
        if (isHidden){
            return value.replace(/[0-9]/g, "*");
        }

        return value;
    }
</script>

<header>
    <fieldset class="no-border">
        <input id="toggle-hidden" type="checkbox" bind:checked={isHidden}/>
        <label for="toggle-hidden">Ocultar</label>
    </fieldset>
</header>


<h1>Calculadora de Investmentos</h1>
<main class="main-content">
<form class="import-investments" on:submit={OnImport}>
    <h4>Importe seus investimentos</h4>
    <fieldset class="no-border csv-import-type">
        <label for="csv-import-type">Selecione sua corretora ou banco:</label>
        <select id="csv-import-type" bind:value={selectedCsv}>
            <option disabled selected value={null}>
                Selecione
            </option>
            {#each CSVOptions as csv}
                <option value={csv.type}>
                    {csv.label}
                </option>
            {/each}
        </select>
    </fieldset>

    {#if selectedCsv != null}
        <fieldset class="csv-import-file">
            <input bind:files type="file"/>
        </fieldset>
        <button class="import-btn">Importar</button>
    {/if}
</form>

{#if result != null}
    <div class="import-result">
        <ul class="import-result-list">
            <li class="import-result-item">
                <span class="import-result-value">Tipo de Ativo</span>
                <span class="import-result-value">Valor</span>
                <span class="import-result-value">Total %</span>
                <span class="import-result-value">Pretendido %</span>
            </li>
            {#each result.summarize as type}
                <li class="import-result-item">
                    <span class="import-result-value">{type.label}</span>
                    {#key isHidden}
                        <span class="import-result-value">{renderHiddenable(numberFormatter.currency(type.total))}</span>
                    {/key}
                    <span class="import-result-value">{numberFormatter.percentage(type.currentPercentage)}</span>
                    <fieldset class="percentage-goal no-border">
                        <input class="percentage-goal-range" bind:value={type.percentageGoal} type="range" min={0} max={100}/>
                        <input class="percentage-goal-value" bind:value={type.percentageGoal} type="number" min={0} max={100}>
                    </fieldset>
                </li>
            {/each}
        </ul>

        <div class="calculate-container">
            <fieldset class="total-to-invest no-border">
                <label for="total-to-invest">Total para Investir:</label>
                <input id="total-to-invest" type="number" bind:value={totalToInvest} min="0"/>
            </fieldset>
            <button type="button" class="calculate" on:click={onCalculate}>Calcular Distribuição</button>
        </div>
    </div>
{/if}

</main>

<style>
    @import "../lib/css/globals.css";
    header {
        padding: .5rem;
        display: flex;
        justify-content: flex-end;
    }

    .main-content {
        display: grid;
        grid-template-columns: 1fr 3fr 1fr;
    }

    .import-investments {
        display: flex;
        flex-direction: column;
        width: fit-content;
        border: 0;
        margin: 1rem;
        padding: 1rem;

        background: var(--primary5);
        border-radius: var(--border05);
    }

    .csv-import-type {
        margin-top: .5rem;
    }

    .import-btn {
        background-color: var(--primary50);

        border: 0;
        outline: 0;

        margin-top: 1rem;
        padding: .5rem .25rem;
        color: var(--text);
        border-radius: var(--border05);

        transition: background .2s ease;
    }

    .import-btn:hover {
        background: var(--primary);
    }

    .import-result {
        width: 80%;
        max-width: 50vw;
        place-self: center;
        background: var(--primary5);
        padding: 2rem;
    }

    .import-result-list {
        display: flex;
        flex-direction: column;
        list-style: none;
    }

    .import-result-item {
        display: grid;
        grid-template-columns: repeat(3, 1fr) 2fr;
    }

    .import-result-item:first-child {
        margin-bottom: 1rem;
    }

    .import-result-item:first-child .import-result-value {
        text-align: center;
    }

    .import-result-value {
        text-align: start;
    }

    .percentage-goal {
        display: flex;
        gap: 2rem;
    }

    .percentage-goal-range {
        flex: 1;
    }

    .percentage-goal-value {
        background-color: transparent;
        border: 0;
        outline: 0;
        color: var(--text);
        width: 2rem;
    }

    .calculate-container {
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding-top: .5rem;
    }

    .calculate {
        border: 0;
        outline: 0;

        padding: .5rem 1rem;
        color: var(--text);
        background: var(--secondary);
        border-radius: var(--border05);

        transition: all .2s ease;
    }

    .calculate:hover {
        background: var(--secondary50);
    }
    
    .total-to-invest input {
        outline: 0;
        border: 0;

        background: var(--accent);

        text-align: right;
        color: var(--text);
    
        padding: .25rem;
        border-radius: var(--border05);
    }
</style>