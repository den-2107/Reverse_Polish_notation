var $button = document.getElementById('button');
var $input = document.getElementById('input');
var $output = document.getElementById('output');

$button.addEventListener('click', function () {
    var value = ($input.value || '').toLowerCase();
    if (value) {
        value = parseString(value);
        console.log("value: ", value);

        var rpn = getReversePolishNotation(value);
        console.log(rpn);

        var result = calculate(rpn);
        console.log(result);
        alert(rpn);
    }
});

function calculate(rpn) {
    var v1, v2;
    var value = null;
    var values = [];

    for (var i = 0; i < rpn.length; i++) {
        value = rpn[i];
        switch (value) {
            case '+':
                v2 = values.pop();
                v1 = values.pop();
                values.push(v1 + v2);
                break;
            case '-':
                v2 = values.pop();
                v1 = values.pop();
                values.push(v1 - v2);
                break;
            case '*':
                v2 = values.pop();
                v1 = values.pop();
                values.push(v1 * v2);
                break;
            case '/':
                v2 = values.pop();
                v1 = values.pop();
                values.push(v1 / v2);
                break;
            default:
                values.push(parseFloat(value));
        }
    }
    return values[0];
}

function getReversePolishNotation(p) {

    var operator = null;
    var operators = [];
    var output = [];
    var value = null;

    for (var i = 0; i < p.length; i++) {
        value = p[i];
        switch (value) {
            case '+':
            case '-':
                if (operators.length) {
                    operator = operators.pop();
                    while (operator && operator !== '(') {
                        output.push(operator);
                        operator = operators.pop();
                    }
                    if (operator) {
                        operators.push(operator);
                    }
                }
                operators.push(value);
                break;
            case '*':
            case '/':
                if (operators.length) {
                    operator = operators.pop();
                    while (operator && operator !== '(' && operator !== '+' && operator !== '-') {
                        output.push(operator);
                        operator = operators.pop();
                    }
                    if (operator) {
                        operators.push(operator);
                    }
                }
                operators.push(value);
                break;
            case '(':
                operators.push(value);
                break;
            case ')':
                operator = operators.pop();
                while (operator !== '(') {
                    if (!operator) {
                        throw "Brackets are inconsistent";
                    }
                    output.push(operator);
                    operator = operators.pop();
                }
                break;
            default:
                output.push(value);
        }
    }
    while (operators.length) {
        output.push(operators.pop());
    }

    return output;
}

function parseString(s) {

    s = s.replace(/\s+/g, '');

    var part = '';
    var parts = [];
    var prev = '';
    var value = '';

    for (var i = 0; i < s.length; i++) {
        value = s[i];
        switch (value) {
            case '+':
            case '*':
            case '/':
            case '(':
            case ')':
                if (part) {
                    parts.push(part);
                    part = '';
                }
                parts.push(value);
                break;
            case '-':
                if (part) {
                    parts.push(part);
                    part = '';
                    parts.push(value);
                } else {
                    if (i === 0
                            || prev === '+'
                            || prev === '-'
                            || prev === '*'
                            || prev === '/'
                            || prev === '('
                            ) {
                        part = value;
                    } else {
                        parts.push(value);
                    }
                }
                break;
            default:
                part = part + value;
        }
        prev = value;
    }
    if (part) {
        parts.push(part);
    }
    return parts;
}