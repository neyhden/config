import { Gtk } from "ags/gtk4"
import AstalHyprland from "gi://AstalHyprland?version=0.1"
import { createBinding } from "gnim"


export const Workspaces = () => {
  const hyprland = AstalHyprland.get_default()

  const Workspace = ({ id }: {id: number}) => {
    return (
      <button
        visible={createBinding(hyprland, "workspaces").as(w => hyprland.get_workspace(id) != null)}
        class={"workspace"}
        onClicked={() => hyprland.dispatch("workspace", id.toString())}
      >
        <label label={id.toString()} />
      </button>
    )
  }

  const scroll = (_source: Gtk.EventControllerScroll, _dx: number, dy: number) => {
    const sign: String = dy < 0 ? "+" : "-"
    hyprland.dispatch("workspace", `e${sign}1`)
  }

  return (
    <box>
      <Gtk.EventControllerScroll
        flags={Gtk.EventControllerScrollFlags.VERTICAL}
        onScroll={scroll}
      />
      <Gtk.EventControllerMotion onEnter={() => print("hi")} onLeave={() => print("bye")} />
      {
        [1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => <Workspace id={id} />)
      }
    </box>
  )
}
