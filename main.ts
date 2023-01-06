input.onGesture(Gesture.ScreenDown, function () {
    running = 0
    Kitronik_Move_Motor.stop()
    basic.showLeds(`
        . # # # .
        # # . . #
        # . # . #
        # . . # #
        . # # # .
        `)
    basic.pause(1000)
    Kitronik_Move_Motor.stop()
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    running = 1
})
let difference = 0
let rightSens = 0
let leftSens = 0
let running = 0
let speed = 0
Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Tight)
basic.showLeds(`
    . # # # .
    # # . . #
    # . # . #
    # . . # #
    . # # # .
    `)
basic.forever(function () {
    if (running) {
        leftSens = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
        rightSens = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
        serial.writeValue("left", leftSens)
        serial.writeValue("right", rightSens)
        difference = Math.abs(leftSens - rightSens)
        serial.writeValue("diff", difference)
        if (difference > 10) {
            if (leftSens < rightSens) {
                Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Left, speed)
                basic.showLeds(`
                    . . # . .
                    . . . # .
                    . . . . #
                    . . . # .
                    . . # . .
                    `)
            } else {
                Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, speed)
                basic.showLeds(`
                    . . # . .
                    . # . . .
                    # . . . .
                    . # . . .
                    . . # . .
                    `)
            }
        } else {
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, speed)
            basic.showLeds(`
                . . # . .
                . # . # .
                # . . . #
                . . . . .
                . . . . .
                `)
        }
    }
})
