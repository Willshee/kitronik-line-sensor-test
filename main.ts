let rightSens = 0
let leftSens = 0
let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
moveMotorZIP.setColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.White))
basic.forever(function () {
    leftSens = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
    rightSens = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    serial.writeValue("left", leftSens)
    serial.writeValue("right", rightSens)
    leftSens = pins.map(
    leftSens,
    150,
    220,
    0,
    255
    )
    rightSens = pins.map(
    rightSens,
    120,
    200,
    0,
    255
    )
    moveMotorZIP.setZipLedColor(0, Kitronik_Move_Motor.rgb(leftSens, leftSens, leftSens))
    moveMotorZIP.setZipLedColor(1, Kitronik_Move_Motor.rgb(rightSens, rightSens, rightSens))
    moveMotorZIP.show()
})
