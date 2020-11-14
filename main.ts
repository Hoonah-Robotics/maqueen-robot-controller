radio.onReceivedValue(function (name, value) {
    if (name == "y") {
        throttle = value
    } else if (name == "x") {
        turn = value
    }
})
let scalarRight = 0
let scalarLeft = 0
let vectorRight = 0
let vectorLeft = 0
let turn = 0
let throttle = 0
radio.setGroup(0)
basic.showIcon(IconNames.Happy)
basic.forever(function () {
    turn = turn / 3
    vectorLeft = throttle + turn
    vectorRight = throttle - turn
    scalarLeft = Math.map(Math.abs(vectorLeft), 0, 40, 0, 255)
    scalarRight = Math.map(Math.abs(vectorRight), 0, 40, 0, 255)
    if (vectorLeft > 0) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, scalarLeft)
    } else if (vectorLeft < 0) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, scalarLeft)
    } else {
        maqueen.motorStop(maqueen.Motors.M1)
    }
    if (vectorRight > 0) {
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, scalarRight)
    } else if (vectorRight < 0) {
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, scalarRight)
    } else {
        maqueen.motorStop(maqueen.Motors.M2)
    }
})
