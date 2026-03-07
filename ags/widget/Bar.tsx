import app from "ags/gtk4/app"
import { Astal, Gdk, Gtk } from "ags/gtk4"
import Clock from "./Clock"
import Workspaces from "./Workspaces"


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
          <label label={"hi"} />
        </box>
        <box $type="center">
          <Workspaces />
        </box>
        <box $type="end">
          <Clock />
        </box>
      </centerbox>
    </window>
  )
}
