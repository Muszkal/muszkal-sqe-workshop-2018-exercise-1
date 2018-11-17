import * as esprima from 'esprima';

const parseCode = (codeToParse) => {
    var parsed = esprima.parseScript(codeToParse, {
        loc: true
    }, function (node, meta) {
        doSomething(node, meta);

    });
    return [parsed, nodeList];
};

var nodeList = [];

/* <th>Line</th>
<th>Type</th>
<th>Name</th>
<th>Condition</th>
<th>Value</th> */
var knownTypes = [];
var toSkipTypes = [
    'AssignmentExpression',
    'VariableDeclaration',
    'Literal',
    'Program',
    'BlockStatement',
    'MemberExpression,',
    'UnaryExpression',
    'BinaryExpression'
];

function doSomething(node, meta) {
    if (toSkipTypes.includes(node.type)) {
        return;
    }

    if(node.type == 'ExpressionStatement'){
        console.log(node);
    }

    var line = node.loc.start.line;
    var type = node.type;
    var name = node['id'] == undefined
        ? node.name
        : node['id'].name;
    if (name == undefined) {
        name = '';
    }
    var cond = parseCond(node.test);
    //var value = parseValue();
    var value = '';

    nodeList.push({line: line, type: type, name: name, cond: cond, value: value});
}

function parseCond(test) {
    if (test == undefined) 
        return '';
    switch (test.type) {
    case 'Identifier':
        return test.name;
    case 'BinaryExpression':
        return parseCond(test.left) + test.operator + parseCond(test.right);
    case 'MemberExpression':
        return test.object.name + '[' + parseCond(test.property) + ']';
            //console.log(test);
    }
}

export {parseCode};
