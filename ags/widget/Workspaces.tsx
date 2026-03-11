import { Gtk } from "ags/gtk4"
import AstalHyprland from "gi://AstalHyprland?version=0.1"
import { createBinding, createState } from "gnim"


export const Workspaces = () => {
  const hyprland = AstalHyprland.get_default()

  const Workspace = ({ id }: {id: number}) => {

    const isVisible = createBinding(hyprland, "workspaces").as(_w => hyprland.get_workspace(id) != null)
    const isFocused = createBinding(hyprland, "focused_workspace").as(w => w ? (w.id == id) : false )
    const [isUrgent, setIsUrgent] = createState<boolean>(false)

    hyprland.connect("urgent", (_source, client) => {
      if (client.workspace.id == id) {
        setIsUrgent(true)
      }
    })


    return (
      <button
        visible={isVisible}
        class={isFocused.as(f => f ? "workspace focused" : "workspace")}
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
        onScroll={scroll} />
      {
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => <Workspace id={id} />)
      }
    </box>
  )
}
