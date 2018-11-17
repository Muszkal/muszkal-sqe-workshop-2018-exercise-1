import $ from 'jquery';
import {parseCode} from './code-elif';

$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        removetbody();
        let codeToParse = $('#codePlaceholder').val();
        let nodeList = parseCode(codeToParse).sort(sortFunc);
        tableCreate(nodeList);
    });
});

function sortFunc(a, b) {
    if (a.line < b.line) 
        return -1;
    else if (a.line > b.line) 
        return 1;
    else 
        return 0;
}

function removetbody() {
    var Parent = document.getElementById('myTbody');
    while(Parent.hasChildNodes())
    {
        Parent.removeChild(Parent.firstChild);
    }
}

function tableCreate(nodeList) {
    var tbl = document.getElementById('myTable');
    var tblBody = document.getElementById('myTbody');
    for (var j = 0; j < nodeList.length; j++) {
        var row = document.createElement('tr');
        for (var x in nodeList[j]) {
            var cell = document.createElement('td');
            var cellText = document.createTextNode(String(nodeList[j][x]));
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    tbl.setAttribute('border', '2');
}
