
var display = document.getElementsByClassName("display")[0];
var input = ["0"];
var reOperator = /[\/\*\-\+]/;
var reNum = /\d/;

function lastInput () {
    return { val: input[input.length - 1],
            indx: input.length - 1
    }
}

function changeLastInput (key) {
    if (key === "." && !/\./.test(lastInput().val)) {
        console.log("if 1");
        input[input.length-1] += key;
    } else if (key === "." && /\./.test(lastInput().val)) {
    } else if (lastInput().val === "0") {
        console.log("if 2");
        input[input.length-1] = key;
    } else if (/^\d+\.?\d*$/.test(lastInput().val)) {
        console.log("if 3");
        input[input.length-1] += key.toString();
    }
}

function insertOperator(key) {
    if (reNum.test(lastInput().val)) {
        input.push(key);
        console.log(`pushed ${key}`);
    }
    else if (lastInput().val !== key) {
        console.log(`lastInput.val is ${lastInput().val}`)
        console.log(`lastInput.indx is ${lastInput().indx}`);
        input[lastInput().indx] = key;
        // input.splice(lastInput().index, 1, key.toString());
        console.log(`last input is ${input[lastInput.indx]}`);
    }
    console.log(`input after insertOperator is ${input}`);
}

function allClear () {
    input = ["0"];
}

function displayInput () {
    if (reNum.test(lastInput().val)) {
        display.innerHTML = lastInput().val;
    }
}

function buttonClick(key) {
    console.log(key);

    if (key == "AC") {
        allClear();
    }

    else if (reNum.test(key) || key == ".") {
        console.log(reNum.test(lastInput().val));

        if (reNum.test(lastInput().val)) {
            changeLastInput(key);
        }
    }

    else if (reOperator.test(key)) {
        insertOperator(key);
    }
    console.log(input);
    displayInput();
}
