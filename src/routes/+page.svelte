<script lang="ts">
    import { parseCSV } from "$lib/csv/parseCSV";
    import { CSVOptions } from "$lib/enums";
    
    let files: FileList;
    let selectedCsv = CSVOptions[0].type;

    function OnImport(e: SubmitEvent){
        e.preventDefault();

        if (files){
            if (files.length > 0){
                const file = files.item(0);

                if (file){
                    parseCSV(file, selectedCsv);
                }
            }
        }
    }
</script>

<form on:submit={OnImport}>
    <select bind:value={selectedCsv}>
        {#each CSVOptions as csv}
            <option value={csv.type}>
                {csv.label}
            </option>
        {/each}
    </select>
    
    <input bind:files type="file"/>
    
    <button>Importar</button>
</form>