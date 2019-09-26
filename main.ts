import * as $ from "jquery";
import { TableHeader } from "./tabel"

let sheetContainer = null;
let a = null;

let mock_jsone_response = {}

$( document ).ready(function() {
    sheetContainer = $("#schedule-sheet-container");
    if (sheetContainer.length){
        var tabel = new TableHeader();
        //tabel.createTable(sheetContainer);
    }
});