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
          let menu = Gtk.PopoverMenu.new_from_model(item.menuModel);

          return (
            <box>
              <Metric
                gicon={createBinding(item, "gicon")}
                tooltip={createBinding(item, "title") || "Failed to get name"}
                onLeftClick={() => item.activate(0, 0)}
                onRightClick={() => menu.show()}
              />
              { menu }
            </box>
          )
        }}
      </For>
    </box>
  )
}

