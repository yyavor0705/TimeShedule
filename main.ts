import * as $ from "jquery";
import { MarkupTable, Worker, Job, SchedulesHolderTable } from "./tabel"
import fakeData = require('./fake_data/fake-data.json')

const myObj: {[index: string]:any} = fakeData

let sheetContainer = null;

$( document ).ready(function() {
    sheetContainer = $("#schedule-sheet-container");
    if (sheetContainer.length){
        let workers:Worker[] = [];

        for (let key in fakeData) {
            let newWorker = new Worker()
            newWorker.id = key
            newWorker.name = myObj[key].name
            for (let job in myObj[key].jobs) {
                let jobObj = myObj[key].jobs[job]
                let newJob = new Job(job, jobObj.start_time, jobObj.duration, jobObj.color)
                newWorker.addJob(newJob)
            }
            workers.push(newWorker)
            
        }
        let markupTable = new MarkupTable(workers.length);
        sheetContainer.append(markupTable.get_element())
        let schedulesHolderTable = new SchedulesHolderTable(workers)
        sheetContainer.append(schedulesHolderTable.get_element())
    }
});