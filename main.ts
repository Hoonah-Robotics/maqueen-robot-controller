radio.onReceivedValue(function (name, value) {
    comment.comment("SENSE: read accelerometer on driver station")
    comment.comment("range of values: -255 to 255; 0 = STOP")
    if (name == "y") {
        throttle = value
    } else if (name == "x") {
        turn = value
    }
})
let vectorRight = 0
let vectorLeft = 0
let turn = 0
let throttle = 0
comment.comment("same radio group as driver station")
radio.setGroup(0)
basic.showIcon(IconNames.Happy)
basic.forever(function () {
    let scalarRight = 0
    comment.comment("THINK: calculate speed and direction for each motor")
    comment.comment("slow down turn without changing maximum drive speed")
    turn = turn / 3
    comment.comment("difference between left and right motor speeds")
    vectorLeft = throttle + turn
    vectorRight = throttle - turn
    comment.comment("ACT: send speed and direction to motors ")
    if (vectorLeft > 0) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, Math.abs(vectorLeft))
    } else if (vectorLeft < 0) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, Math.abs(vectorRight))
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
