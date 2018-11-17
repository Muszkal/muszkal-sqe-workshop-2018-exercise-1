import assert from 'assert';
import * as code from '../src/js/code-elif';

describe('The javascript parser', () => {
    it('test1', () => {
        var res = JSON.stringify([
            {
                "line": 1,
                "type": "FunctionDeclaration",
                "name": "binarySearch",
                "cond": "",
                "value": ""
            }, {
                "line": 1,
                "type": "Variable Declaration",
                "name": "X",
                "cond": "",
                "value": ""
            }, {
                "line": 1,
                "type": "Variable Declaration",
                "name": "V",
                "cond": "",
                "value": ""
            }, {
                "line": 1,
                "type": "Variable Declaration",
                "name": "n",
                "cond": "",
                "value": ""
            }, {
                "line": 1,
                "type": "VariableDeclarator",
                "name": "low",
                "cond": "",
                "value": ""
            }, {
                "line": 1,
                "type": "VariableDeclarator",
                "name": "high",
                "cond": "",
                "value": ""
            }, {
                "line": 1,
                "type": "VariableDeclarator",
                "name": "mid",
                "cond": "",
                "value": ""
            }, {
                "line": 1,
                "type": "AssignmentExpression",
                "name": "low",
                "cond": "",
                "value": "0"
            }, {
                "line": 1,
                "type": "AssignmentExpression",
                "name": "high",
                "cond": "",
                "value": "n - 1"
            }, {
                "line": 1,
                "type": "WhileStatement",
                "name": "",
                "cond": "low <= high",
                "value": ""
            }, {
                "line": 1,
                "type": "AssignmentExpression",
                "name": "mid",
                "cond": "",
                "value": "(low + high) / 2"
            }, {
                "line": 1,
                "type": "IfStatement",
                "name": "",
                "cond": "X < V[mid]",
                "value": ""
            }, {
                "line": 1,
                "type": "ElseIfStatement",
                "name": "",
                "cond": "X > V[mid]",
                "value": ""
            }, {
                "line": 1,
                "type": "ReturnStatement",
                "name": "",
                "cond": "",
                "value": "mid"
            }, {
                "line": 1,
                "type": "AssignmentExpression",
                "name": "low",
                "cond": "",
                "value": "mid + 1"
            }, {
                "line": 1,
                "type": "AssignmentExpression",
                "name": "high",
                "cond": "",
                "value": "mid - 1"
            }, {
                "line": 1,
                "type": "ReturnStatement",
                "name": "",
                "cond": "",
                "value": "-1"
            }
        ]);
        assert.equal(JSON.stringify(code.parseCode('function binarySearch(X, V, n){ let low, high, mid; low = 0;high = n - 1;while (' +
                'low <= high) {mid = (low + high)/2;if (X < V[mid])high = mid - 1;else if (X > V[' +
                'mid])low = mid + 1;else return mid;}return -1; }')), res);
    });

    it('test2', () => {
        var x = JSON.stringify([{"line": 1,"type": "UpdateExpression","name": "","cond": "","value": "i++"}]);
    assert.equal(JSON.stringify(code.parseCode('i++')), x);
    });

    it('test3', () => {
        var x = JSON.stringify([
            {
              "line": 1,
              "type": "CallExpression",
              "name": "something",
              "cond": "",
              "value": "(x)"
            }
          ]);
    assert.equal(JSON.stringify(code.parseCode('something(x);')), x);
    });

    it('test4', () => {
        var x = JSON.stringify([
            {
              "line": 1,
              "type": "CallExpression",
              "name": "something",
              "cond": "",
              "value": "(x, y)"
            }
          ]);
    assert.equal(JSON.stringify(code.parseCode('something(x,y);')), x);
    });
    
    it('test5', () => {
        var x = JSON.stringify([
            {
              "line": 1,
              "type": "ForStatement",
              "name": "",
              "cond": "x < 5",
              "value": ""
            },
            {
              "line": 1,
              "type": "VariableDeclarator",
              "name": "x",
              "cond": "",
              "value": ""
            },
            {
              "line": 1,
              "type": "UpdateExpression",
              "name": "",
              "cond": "",
              "value": "x++"
            },
            {
              "line": 1,
              "type": "AssignmentExpression",
              "name": "x",
              "cond": "",
              "value": "x + 1"
            }
          ]);
    assert.equal(JSON.stringify(code.parseCode('for(var x=0;x<5;x++){ x = x+1;}')), x);
    });
    
    it('test6', () => {
        var x = JSON.stringify([
            {
              "line": 1,
              "type": "IfStatement",
              "name": "",
              "cond": "x > 3",
              "value": ""
            }
          ]);
    assert.equal(JSON.stringify(code.parseCode('if(x>3){}')), x);
    });

    it('test7', () => {
        var x = JSON.stringify([
            {
              "line": 1,
              "type": "IfStatement",
              "name": "",
              "cond": "x > 3",
              "value": ""
            },
            {
              "line": 1,
              "type": "ElseIfStatement",
              "name": "",
              "cond": "x < 3",
              "value": ""
            }
          ]);
    assert.equal(JSON.stringify(code.parseCode('if(x>3){}else if(x<3){}')), x);
    });

    it('test8', () => {
        var x = JSON.stringify([
            {
              "line": 1,
              "type": "CallExpression",
              "name": "call",
              "cond": "",
              "value": "(x + 3, y--)"
            }
          ]);
    assert.equal(JSON.stringify(code.parseCode('call(x+3, y--);')), x);
    });

    it('test9', () => {
        var x = JSON.stringify([
            {
              "line": 1,
              "type": "WhileStatement",
              "name": "",
              "cond": "x < 3",
              "value": ""
            },
            {
              "line": 1,
              "type": "UpdateExpression",
              "name": "",
              "cond": "",
              "value": "x++"
            }
          ]);
    assert.equal(JSON.stringify(code.parseCode('while(x<3){x++;}')), x);
    });

    it('test10', () => {
        var x = JSON.stringify([]);
    assert.equal(JSON.stringify(code.parseCode('')), x);
    });
});
