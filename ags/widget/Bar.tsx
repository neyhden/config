import app from "ags/gtk4/app"
import { Astal, Gdk } from "ags/gtk4"
import { Clock } from "./Clock"
import { Workspaces } from "./Workspaces"
import { MicVolume, SpeakerVolume } from "./Volume"
import { BatteryLevel } from "./Battery"


export default (gdkmonitor: Gdk.Monitor) => {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

  return (
    <window
      visible
      name="bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT }
      application={app}
    >
      <centerbox>
        <box $type="start">
          <BatteryLevel />
        </box>
        <box $type="center">
          <Workspaces />
        </box>
        <box $type="end">
          <SpeakerVolume />
          <MicVolume />
          <Clock />
        </box>
      </centerbox>
    </window>
  )
}
