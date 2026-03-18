import AstalTray from "gi://AstalTray?version=0.1"
import { createBinding, createEffect, For } from "gnim"
import { Metric } from "./Metric"
import { Astal, Gdk, Gtk } from "ags/gtk4"
import app from "ags/gtk4/app"

export const SysTray = () => {
  const tray = AstalTray.get_default()
  const items = createBinding(tray, "items")

  return (
    <box orientation={Gtk.Orientation.HORIZONTAL} spacing={1}>
      <For each={items}>
        {(item) => {
          return <Metric
            iconName={item.iconName || "view-grid-symbolic"}
            tooltip={item.title || "Failed to get name"}
            onLeftClick={() => item.activate(0, 0)}
            onRightClick={() => item.secondary_activate(0, 0)}
          />
        }
        }
      </For>
    </box>
  )
}

