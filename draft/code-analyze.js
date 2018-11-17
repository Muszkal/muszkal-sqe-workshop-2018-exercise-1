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
var knownTypes = [
    'FunctionDeclaration',
    'VariableDeclarator',
    'AssignmentExpression',
    'IfStatement',
    'WhileStatement',
    'ReturnStatement'
];
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
    if (!knownTypes.includes(node.type)) {
        return;
    }
    var line = node.loc.start.line;
    var type = node.type;
    var name = getNodeName(node);
    var cond = parseCond(node.test);
    var value = parseValue(node);

    nodeList.push({line: line, type: type, name: name, cond: cond, value: value});
}

function getNodeName(node) {
    var name = ''
    switch (node.type) {
        case 'FunctionDeclaration':
        case 'VariableDeclarator':
            name = node['id'].name;
            break;
        case 'AssignmentExpression':
            name = parseCond(node.left);
            break;
    }
    return name;
}

function parseValue(node) {
    var value = ''
    switch (node.type) {
        case 'FunctionDeclaration':
            break;
        case 'VariableDeclarator':
            break;
        case 'AssignmentExpression':
            value = parseCond(node.right);
            break;
        case 'IfStatement':
            break;
        case 'WhileStatement':
            break;
        case 'ReturnStatement':
            value = parseCond(node.argument);
            break;
    }
    return value;
}

function parseCond(test) {
    if (test == undefined) 
        return '';
    switch (test.type) {
        case 'Literal':
            return test.value;
        case 'Identifier':
            return test.name;
        case 'BinaryExpression':
            return parseCond(test.left) + test.operator + parseCond(test.right);
        case 'MemberExpression':
            return test.object.name + '[' + parseCond(test.property) + ']';
        case 'UnaryExpression':
            return test.operator + parseCond(test.argument);
        default:
    }
}

export {parseCode};
