import AstalTray from "gi://AstalTray?version=0.1"
import { createBinding, createEffect, For } from "gnim"
import { Metric } from "./Metric"
import { Gtk } from "ags/gtk4"

export const SysTray = () => {
  const tray = AstalTray.get_default()
  const items = createBinding(tray, "items")

  return (
    <box orientation={Gtk.Orientation.HORIZONTAL} spacing={1}>
      <For each={items}>
        {(item) =>
          <Metric
            iconName={item.iconName}
            label={item.tooltip.icon_name}
            tooltip={item.tooltip.title}
            onLeftClick={() => item.activate(0, 0)}
            onRightClick={() => item.secondary_activate(0, 0)}
          />
        }
      </For>
    </box>
  )
}

