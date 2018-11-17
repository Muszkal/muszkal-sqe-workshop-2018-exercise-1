import * as esprima from 'esprima';
import * as codegen from 'escodegen';

var nodeList = [];
export const parseCode = (codeToParse) => {
    nodeList = [];
    var parsed = esprima.parseScript(codeToParse, {loc: true});
    something(parsed, false);
    return nodeList;
};

export function something(parsed, cameFromIf) {
    var myMap = {
        'Program': (node)=> {for (var x in node.body) something(node.body[x], false);},
        'BlockStatement': (node) => {for (var x in node.body) something(node.body[x], false);},
        'VariableDeclaration': (node) => {for (var x in node.declarations) something(node.declarations[x], false);},
        'ExpressionStatement': (node) => something(node.expression, false),
        'ReturnStatement': (node) => nodeList.push({line: node.loc.start.line, type: node.type, name: '', cond: '', value: parseCond(node.argument)}),
        'AssignmentExpression': (node) => nodeList.push({line: node.loc.start.line, type: node.type, name: parseCond(node.left), cond: '', value: parseCond(node.right)}),
        'VariableDeclarator': (node) => nodeList.push({line: node.loc.start.line, type: node.type, name: parseCond(node.id), cond: '', value: ''}),
        'FunctionDeclaration': parseFunctionDecNode,
        'WhileStatement': parseWhileStat,
        'IfStatement': parseIfStat,
        'ForStatement': parseForStat,
        'UpdateExpression': parseUpdateExpression,
        'CallExpression': parseCallExpression,
    };
    return myMap[parsed.type](parsed, cameFromIf);
}
export function parseCallExpression(node){
    var value = '(';
    for(var arg=0; arg < node.arguments.length; arg++){
        value += parseCond(node.arguments[arg]);
        if(arg!=node.arguments.length-1)
            value+= ', ';
    }
    value += ')';
    nodeList.push({line: node.loc.start.line, type: node.type, name: parseCond(node.callee), cond: '', value: value});
}
export function parseFunctionDecNode(node){
    nodeList.push({line: node.loc.start.line, type: node.type, name: node.id.name, cond: '', value: ''});
    for (var x in node.params)
        nodeList.push({line: node.params[x].loc.start.line, type: 'Variable Declaration', name: parseCond(node.params[x]), cond: '', value: ''});
    something(node.body, false);
}
export function parseWhileStat(node){
    nodeList.push({line: node.loc.start.line, type: node.type, name: '', cond: parseCond(node.test), value: ''});
    something(node.body, false);
}
export function parseIfStat(node, cameFromIf){
    var cond = parseCond(node.test);
    var type = cameFromIf ? 'ElseIfStatement' : node.type;
    nodeList.push({line: node.loc.start.line, type: type, name: '', cond: cond, value: ''});
    if(node.alternate != null)
        something(node.alternate, true);
    something(node.consequent, false);
}
export function parseForStat(node){
    var cond = parseCond(node.test);
    nodeList.push({line: node.loc.start.line, type: node.type, name: '', cond: cond, value: ''});
    something(node.init, false);
    something(node.update, false);
    something(node.body);
}
export function parseUpdateExpression(node){
    var value = parseCond(node.argument) + node.operator;
    nodeList.push({line: node.loc.start.line, type: node.type, name: '', cond: '', value: value});
}
export function parseCond(test) {
    return codegen.generate(test);        
}
