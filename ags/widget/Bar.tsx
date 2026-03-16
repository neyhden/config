import app from "ags/gtk4/app"
import { Astal, Gdk } from "ags/gtk4"
import { Clock } from "./Clock"
import { Workspaces } from "./Workspaces"
import { MicVolume, SpeakerVolume } from "./Volume"
import { BatteryLevel } from "./Battery"
import { NetworkStatus } from "./Network"
import { SysTray } from "./SysTray"
import { Mpris, MprisToggle } from "./MPRIS"


export const Bar = ({ gdkmonitor }:{ gdkmonitor: Gdk.Monitor }) => {
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
        <box $type="start" spacing={10}>
          <NetworkStatus />
          <BatteryLevel />
          <SysTray />
        </box>
        <box $type="center">
          <Workspaces />
        </box>
        <box $type="end" spacing={10}>
          <MprisToggle />
          <SpeakerVolume />
          <MicVolume />
          <Clock />
        </box>
      </centerbox>
    </window>
  )
}
