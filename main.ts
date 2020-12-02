function Dance () {
    comment.comment("when you shake the Drive Controller")
    comment.comment("blocks to use here: Maqueen:motor, Basic:pause, Loops:repeat  ")
    comment.comment("This is an simple example - replace the blocks with yours ")
    powerTemp = powerBand
    powerBand = 0
    for (let index = 0; index < 4; index++) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 255)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 255)
        basic.pause(500)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 255)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 255)
        basic.pause(500)
        maqueen.motorStop(maqueen.Motors.M1)
        maqueen.motorStop(maqueen.Motors.M2)
    }
    powerBand = powerTemp
}
function Horns () {
    comment.comment("when A+B is pressed on Drive Controller")
    comment.comment("blocks to use here: Music, Maqueen:Lights")
    comment.comment("Make sure buzzer switch is ON!!")
    comment.comment("This is an simple example - replace the blocks with yours ")
    music.playMelody("A C5 B F - - - - ", 120)
}
radio.onReceivedValue(function (name, value) {
    comment.comment("SENSE: read sensors on driver station")
    if (name == "y") {
        comment.comment("X-Y accelerometer values: -255 to 255; 0 = STOP")
        throttle = value
    } else if (name == "x") {
        turn = value
    } else if (name == "P") {
        comment.comment("Power values: 1, 2, 3; 0 = STOP")
        powerBand = value
        if (!(powerBand)) {
            maqueen.motorStop(maqueen.Motors.M1)
            maqueen.motorStop(maqueen.Motors.M2)
        }
    } else if (name == "AB") {
        comment.comment("both buttons pressed")
        basic.showIcon(IconNames.EigthNote)
        Horns()
    } else if (name == "S") {
        comment.comment("\"Shake\" driver controller")
        basic.showIcon(IconNames.StickFigure)
        Dance()
    }
})
function OLED () {
    comment.comment("pixels: x=127 (wide), y=63 (tall) ")
    OLED12864_I2C.rect(0, 0, 127, 63, 1)
    OLED12864_I2C.rect(3, 3, 124, 60, 1)
    comment.comment("characters: col=120 (wide), row=7 (tall) ")
    OLED12864_I2C.String("Hello!", 48, 1, 1)
    OLED12864_I2C.String("My Name Is", 34, 2, 1)
    OLED12864_I2C.hline(3, 30, 120, 1)
    OLED12864_I2C.String("Mr. McLuckie", 30, 5, 1)
}
let powerRight = 0
let powerLeft = 0
let turn = 0
let throttle = 0
let powerBand = 0
let powerTemp = 0
comment.comment("same radio group as driver station")
radio.setGroup(0)
basic.showIcon(IconNames.Happy)
OLED12864_I2C.init()
basic.forever(function () {
    comment.comment("THINK: calculate speed and direction for each motor")
    comment.comment("slow down turn without changing maximum drive speed")
    turn = turn / 3
    comment.comment("Arcade drive: difference between left and right motor speeds")
    powerLeft = throttle + turn
    powerRight = throttle - turn
    comment.comment("scale power for powerBand")
    powerLeft = powerLeft / powerBand
    powerRight = powerRight / powerBand
    comment.comment("keep calculated values within valid motor values")
    powerLeft = Math.constrain(powerLeft, -255, 255)
    powerRight = Math.constrain(powerRight, -255, 255)
    comment.comment("ACT: send speed and direction to motors ")
    if (powerBand) {
        if (powerLeft > 0) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, powerLeft)
        } else if (powerLeft < 0) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, Math.abs(powerLeft))
        } else {
            maqueen.motorStop(maqueen.Motors.M1)
        }
        if (powerRight > 0) {
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, powerRight)
        } else if (powerRight < 0) {
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, Math.abs(powerRight))
        } else {
            maqueen.motorStop(maqueen.Motors.M2)
        }
    }
})
