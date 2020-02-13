import * as $ from "jquery";

interface JqueryElm {
    get_element(): JQuery 
}

export class Job implements JqueryElm{
    divElement = $('<div class="job">')

    constructor(id:string,
        startTime:string,
        duration:number,
        color:string,
        startRow: number,
        )
        {
            if (color)
                this.divElement.css({"background-color": color})
            this.divElement.attr("id", id);
            let startColumn = this._convert_start_time_to_position(startTime)
            let endColumn = startColumn+duration
            let endRow = startRow+1            
            this.divElement.css({"grid-area": startRow+"/"+startColumn+"/"+endRow+"/"+endColumn})
        }

    private _convert_start_time_to_position(startTime:string): number {
        let position_correction = 1
        let splitted = startTime.split(":", 2);
        let hours = parseInt(splitted[0]);
        let minutes = parseInt(splitted[1]);
        let position = Math.floor(hours*60)+minutes+position_correction;
        return position
    }

    get_element() {
        return this.divElement
    }
}

export class Worker {
    id: string
    name: string
    jobs:Job[] = []
}

export class Table implements JqueryElm{
    tableElm = $("<table>")
    tableHeaderRow = $('<tr id="table-header">');
    totalWorkingHours = 24;

    constructor(workers: Worker[]) {
        this.tableElm.append(this.tableHeaderRow)
        this.create_header();
        this.create_workers_rows(workers);
    }

    private create_header() {
        let tdElementsCounter = 0;
        while (tdElementsCounter <= this.totalWorkingHours) {
            this.tableHeaderRow.append($("<td>"+tdElementsCounter+":00</td>"))
            tdElementsCounter += 1
        }
    }

    private create_workers_rows(workers: Worker[]) {
        let workerRowCounter = 1
        for (let worker in workers) {
            let trElm = $('<tr class="schedule-row">')
            this.tableElm.append(trElm)

            let columnNumber = 0
            while (columnNumber <= this.totalWorkingHours) {
                trElm.append("<td>")
                columnNumber += 1
            }
            
        }
    }

    get_element() {
        return this.tableElm
    }
}