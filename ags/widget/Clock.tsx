import { createPoll } from "ags/time"
import { Metric } from "./Metric"
import { createComputed, createState } from "gnim"
import { Astal, Gdk, Gtk } from "ags/gtk4"
import app from "ags/gtk4/app"
import GLib from "gi://GLib?version=2.0"

let winVis = 0
let winTimer: GLib.Source
const updateCalendarWin = (delta: number, index: number) => {
  winVis += delta
  if (winVis > 0) {
    winTimer && clearTimeout(winTimer)
    app.get_window(`calendar${index}`)!.visible = true
  } else {
    winTimer = setTimeout(() => {
      app.get_window(`calendar${index}`)!.visible = false
    }, 20)
  }
}


export const Clock = ({ monIndex }:{ monIndex: number }) => {
  const time = createPoll("00:00:00", 1000, "date +'%H:%M:%S %d/%m/%Y'")
  const [currentClock, setCurrentClock] = createState(0)

  const switchClock = () => {
    if (currentClock() == 0) setCurrentClock(1)
    else setCurrentClock(0)
  }

  const clock = createComputed(() => {
    return time().split(' ')[currentClock()]
  })

  return (
    <Metric
      className="clock-metric"
      onLeftClick={switchClock}
      label={clock}
      onHoverEnter={() => updateCalendarWin(1, monIndex)}
      onHoverExit={() => updateCalendarWin(-1, monIndex)}
    />
  )
}

export const Calendar = ({ gdkmonitor }:{ gdkmonitor: Gdk.Monitor }) => {
  const monIndex = app.monitors.indexOf(gdkmonitor)
  const { TOP, RIGHT } = Astal.WindowAnchor

  return (
    <window
      name={`calendar${monIndex}`}
      class={"calendar"}
      keymode={Astal.Keymode.ON_DEMAND}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.IGNORE}
      anchor={ TOP | RIGHT }
      application={app}
      marginTop={32}
      marginRight={0}
      defaultWidth={300}
      defaultHeight={320}
    >
      <Gtk.EventControllerMotion
        onEnter={() => updateCalendarWin(1, monIndex)}
        onLeave={() => updateCalendarWin(-1, monIndex)}
      />
      <Gtk.EventControllerKey
        onKeyPressed={({ widget }, keyval: number) => {
          if (keyval === Gdk.KEY_Escape) {
            widget.hide()
          }
        }}
      />
      <Gtk.Calendar
      />
    </window>
  )
}
