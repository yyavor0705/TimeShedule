import * as $ from "jquery";

export class TableHeader {
    table = $('<table id="table-header">');

    createTable(sheetContainer: JQuery) {
        sheetContainer.append(this.table);
    }
}