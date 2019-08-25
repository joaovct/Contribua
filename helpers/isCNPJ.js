
function isCNPJ(cnpj) {

    let base = cnpj.substr(0, 12).split("")
    let dvs = cnpj.substr(12, 14).split("")
    let weights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    let baseMultiplied = []
    let baseSum
    let dv1
    let dv2

    if(cnpj === "00000000000000" || cnpj === "11111111111111" ||
    cnpj === "22222222222222" || cnpj === "33333333333333" ||
    cnpj === "44444444444444" || cnpj === "55555555555555" ||
    cnpj === "66666666666666" || cnpj === "77777777777777" ||
    cnpj === "88888888888888" || cnpj === "99999999999999" ||
    cnpj.length != 14){
        return false
    }

    //dv1
    baseMultiplied = base.map((elem, i) => {
        return weights[i] * parseInt(base[i])
    })

    baseSum = baseMultiplied.reduce((prevVal, elem) => {
        return prevVal + elem
    }, 0)

    dv1 = (baseSum%11)
    if(dv1 < 11){
        dv1 = 11-dv1
    }else{
        dv1 = dv1-11
    }

    base.push(dv1.toString())
    weights.unshift(6)

    //dv2
    baseMultiplied = base.map((elem, i) => {
        return weights[i] * parseInt(base[i])
    })

    baseSum = baseMultiplied.reduce((prevVal, elem) => {
        return prevVal + elem
    }, 0)

    dv2 = (baseSum%11)
    if(dv2 < 11){
        dv2 = 11 - dv2
    }else{
        dv2 = dv2 - 11
    }

    //verify dvs
    if(dv1.toString() != dvs[0]){
        return false
    }

    if(dv2.toString() != dvs[1]){
        return false
    }

    return true
}

module.exports = isCNPJ