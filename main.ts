import * as $ from "jquery";
import { Table, Worker, Job } from "./tabel"
import fakeData = require('./fake_data/fake-data.json')

const myObj: {[index: string]:any} = fakeData

let sheetContainer = null;

$( document ).ready(function() {
    sheetContainer = $("#schedule-sheet-container");
    if (sheetContainer.length){
        let workers:Worker[] = [];
        let workerRowCounter = 1 // initial number has to be 1 as first row belongs to header

        for (let key in fakeData) {
            
            workerRowCounter += 1
            let newWorker = new Worker()
            newWorker.id = key
            newWorker.name = myObj[key].name
            for (let job in myObj[key].jobs) {
                let jobObj = myObj[key].jobs[job]
                let newJob = new Job(key, jobObj.start_time, jobObj.duration, jobObj.color, workerRowCounter)
                newWorker.jobs.push(newJob)
            }
            workers.push(newWorker)
            
        }
        let table = new Table(workers);
        console.log("Adddd")
        sheetContainer.append(table.get_element());
    }
});