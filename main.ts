input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    Ultraschall_Sensor_Knopf_A = !(Ultraschall_Sensor_Knopf_A)
})
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    cb2.fahreStrecke(192, 31, 40)
    cb2.fahreStrecke(64, 31, 40)
    cb2.fahreStrecke(255, 16, 20)
    cb2.fahreStrecke(192, 2, 150)
    cb2.fahreStrecke(192, 30, 150)
    cb2.fahreStrecke(1, 16, 20)
})
cb2.onAbstandEvent(function (abstand_Sensor, abstand_Stop, cm) {
    cb2.event_Hindernis_ausweichen(
    Ultraschall_Sensor_Knopf_A && !(Spur_Sensor_Knopf_B),
    abstand_Stop,
    255,
    16,
    64,
    0,
    randint(5, 20)
    )
    if (abstand_Stop) {
        cb2.writecb2RgbLed(cb2.eRgbLed.lh, 0xff0000, true)
    } else {
        cb2.writecb2RgbLed(cb2.eRgbLed.lh, 0xffff00, abstand_Sensor)
    }
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    Spur_Sensor_Knopf_B = !(Spur_Sensor_Knopf_B)
    Ultraschall_Sensor_Knopf_A = Spur_Sensor_Knopf_B
})
cb2.onSpurEvent(function (links_hell, rechts_hell, abstand_Stop) {
    cb2.event_Spur_folgen(
    Spur_Sensor_Knopf_B,
    links_hell,
    rechts_hell,
    192,
    160,
    31,
    0,
    abstand_Stop,
    cb2.cb2_zehntelsekunden(btf.ePause.s1)
    )
})
let Spur_Sensor_Knopf_B = false
let Ultraschall_Sensor_Knopf_A = false
btf.comment(btf.btf_text("Erweiterung: calliope-net/fernsteuerung"))
cb2.writeReset()
btf.zeigeBIN(cb2.readVersionArray()[1], btf.ePlot.bin, 2)
btf.zeigeBIN(cb2.readSpannung(), btf.ePlot.bcd, 4)
basic.forever(function () {
    cb2.raiseAbstandEvent(Ultraschall_Sensor_Knopf_A, 30, 35)
    cb2.raiseSpurEvent(Spur_Sensor_Knopf_B)
})
