import AstalTray from "gi://AstalTray?version=0.1"
import { createBinding, For } from "gnim"
import { Metric } from "./Metric"
import { Gtk } from "ags/gtk4"

export const SysTray = () => {
  const tray = AstalTray.get_default()
  const items = createBinding(tray, "items")

  return (
    <box orientation={Gtk.Orientation.HORIZONTAL} spacing={1}>
      <For each={items}>
        {(item) => {
          return (
            <Metric
              gicon={createBinding(item, "gicon")}
              iconName={"d"}
              tooltip={item.title || "Failed to get name"}
              onLeftClick={() => item.activate(0, 0)}
              onRightClick={() => item.secondary_activate(0, 0)}
            />
          )
        }}
      </For>
    </box>
  )
}

