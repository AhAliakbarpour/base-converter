
let convertBtn = document.getElementById("convertBtn");
// set Enter key as click convertBtn
document.getElementById("number").onkeydown = function (event) {
    if (event.key === "Enter"){
        event.preventDefault();
        convertBtn.click();
    }
};

convertBtn.onclick = function () {
    let number = document.getElementById("number").value.toUpperCase();
    let fromBase = document.getElementById("fromBase").value;
    let toBase = document.getElementById("toBase").value;
    let error = document.getElementById("error");
    let result = document.getElementById("result");
    let resultContainer = document.getElementById("resultContainer");

    let isNegative = false;
    if (number[0] === "-") {
        isNegative = true;
        number = number.replace("-", "");
    }

    // if there isn't any error, convert the number
    if (number === "") {
        error.style.display = "unset";
        error.innerText = "Empty!";
    }
    else if (!isValid(number, fromBase)) {
        error.style.display = "unset";
        error.innerText = "Invalid!";
    }
    else {
        error.style.display = "none";
        if (isNegative)
            result.innerText = "-"
        else
            result.innerText = "";
        result.innerText += convert(number, fromBase, toBase).toUpperCase();
        resultContainer.style.visibility = "visible";
    }
}

function isValid(number, fromBase) {
    if (number[number.length - 1] === ".")
        return false
    if (number[0] === ".")
        number = "0" + number;
    let dotCnt = 0;
    if (fromBase <= 10)
        for (const i in number) {
            let code = number.charCodeAt(i);
            if (code < 48 || code > 57 - (10 - fromBase))
                if (code === 46)
                    dotCnt++;
                else
                    return false;
        }
    else
        for (const i in number) {
            let code = number.charCodeAt(i);
            if ((code < 48 || code > 57) && (code < 65 || code > 90 - (36 - fromBase)))
                if (code === 46)
                    dotCnt++;
                else
                    return false;
        }
    return dotCnt <= 1;
}

function convert(number, fromBase, toBase) {
    number = number.toUpperCase();

    if (fromBase == toBase)
        return number;
    else if (fromBase == 10)
        return convertFromDecimalToBase(number, toBase);
    else if (toBase == 10)
        return convertFromBaseToDecimal(number, fromBase);
    else
        return convertFromDecimalToBase(convertFromBaseToDecimal(number, fromBase), toBase);

    // convert from other base to decimal
    function convertFromBaseToDecimal(number, fromBase) {
        // separate real part and fractional part
        let real, fractional;
        let numArr = number.split(".");
        real = numArr[0];
        if (numArr.length === 1)
            fractional = "";
        else
            fractional = numArr[1];

        let result = 0;
        // convert real part
        result += parseInt(real, fromBase);
        /*
        // convert real part manually
        for (const i in real)
            if (Number.isInteger(Number(real[i])))
                result += real[i] * (fromBase ** (real.length - i - 1));
            else
                result += (real.charCodeAt(i) - 55) * (fromBase ** (real.length - i - 1));
        */
        // convert fractional part
        // there isn't any built-in function to convert fractional part so I do this manually
        for (const i in fractional)
            if (Number.isInteger(Number(fractional[i])))
                result += fractional[i] * (fromBase ** (- i - 1));
            else
                result += (fractional.charCodeAt(i) - 55) * (fromBase ** (- i - 1));
        return String(result);
    }
    // convert from decimal to other base
    function convertFromDecimalToBase(number, toBase) {
        return  Number(number).toString(toBase);
    }
}
