radio.onReceivedValue(function (name, value) {
    comment.comment("Sense: accelerometer on driver station")
    if (name == "y") {
        throttle = value
    } else if (name == "x") {
        turn = value
    }
})
let powerRight = 0
let powerLeft = 0
let turn = 0
let throttle = 0
comment.comment("same radio group as driver station")
radio.setGroup(0)
basic.showIcon(IconNames.Happy)
basic.forever(function () {
    comment.comment("Think: calculate drive power")
    powerLeft = throttle + turn
    powerRight = throttle - turn
    if (powerLeft > 0) {
        powerLeft = Math.map(powerLeft, 0, 40, 0, 255)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, powerLeft)
    } else if (powerLeft < 0) {
        powerLeft = Math.map(Math.abs(powerLeft), 0, 40, 0, 255)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, powerLeft)
    } else {
        maqueen.motorStop(maqueen.Motors.M1)
    }
    if (powerRight > 0) {
        powerRight = Math.map(powerRight, 0, 40, 0, 255)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, powerRight)
    } else if (powerRight < 0) {
        powerRight = Math.map(Math.abs(powerRight), 0, 40, 0, 255)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, powerRight)
    } else {
        maqueen.motorStop(maqueen.Motors.M2)
    }
})
