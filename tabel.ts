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
        )
        {
            if (color)
                this.divElement.css({"background-color": color})
            this.divElement.attr("id", id);
            let startPosition = this._convert_start_time_to_position(startTime)        
            this.divElement.css({"width": duration, "left": startPosition})
        }

    private _convert_start_time_to_position(startTime:string): number {
        let splitted = startTime.split(":", 2);
        let hours = parseInt(splitted[0]);
        let minutes = parseInt(splitted[1]);
        let position = Math.floor(hours*60)+minutes;
        return position
    }

    get_element() {
        return this.divElement
    }
}

export class Worker implements JqueryElm{
    id: string
    name: string
    jobs:Job[] = []
    private trElement = $("<tr>")
    private tdElement = $("<td class='one'>")

    constructor (){
        this.trElement.append(this.tdElement)
    }

    addJob(job: Job){
        this.jobs.push(job)
        this.tdElement.append(job.get_element())
    }

    get_element(){
        return this.trElement
    }
}

export class MarkupTable implements JqueryElm{
    tableElm = $("<table id='markup'>")
    tableHeaderRow = $('<tr id="table-header">');
    totalWorkingHours = 24;

    constructor(workersQuantity: Number) {
        this.tableElm.append(this.tableHeaderRow);
        this.create_header();
        this.create_workers_rows(workersQuantity);
    }

    private create_header() {
        let tdElementsCounter = 0;
        while (tdElementsCounter < this.totalWorkingHours) {
            this.tableHeaderRow.append($("<td>"+tdElementsCounter+":00</td>"))
            tdElementsCounter += 1
        }
    }

    private create_workers_rows(workersQuantity: Number) {
        let workerCounter = 1
        while (workerCounter <= workersQuantity) {
            let trElm = $('<tr class="schedule-row">')
            this.tableElm.append(trElm)

            let columnNumber = 0
            while (columnNumber < this.totalWorkingHours) {
                trElm.append("<td>")
                columnNumber += 1
            }
            workerCounter += 1
            
        }
    }

    get_element() {
        return this.tableElm
    }
}

export class SchedulesHolderTable implements JqueryElm {
    tableElm = $("<table id='schedules-holder'>")

    constructor(private workersArray: Worker[]) {
        this.addWorkerRows()
    }

    private addWorkerRows() {
        for (let worker in this.workersArray) {
            this.tableElm.append(this.workersArray[worker].get_element())            
        }
    }

    get_element() {
        return this.tableElm
    }
}