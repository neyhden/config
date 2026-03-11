import { Gtk } from "ags/gtk4"
import { Accessor } from "gnim"

interface props {
  iconName: string | Accessor<string> | undefined,
  label: string | Accessor<string> | undefined,
  onLeftClick: () => void | undefined,
  onRightClick: () => void | undefined,
  onMiddleClick: () => void | undefined,
  onScrollUp: () => void | undefined,
  onScrollDown: () => void | undefined,
}
export const Metric = (
  {
    iconName,
    label,
    onLeftClick,
    onRightClick,
    onMiddleClick,
    onScrollUp,
    onScrollDown,
  }: props
) => {
  return (
    <box orientation={Gtk.Orientation.HORIZONTAL}>
      <Gtk.EventControllerScroll
      />
      <Gtk.GestureClick // left click
        onPressed={onLeftClick}
        button={1}
      />
      <Gtk.GestureClick // middle click
        onPressed={onMiddleClick}
        button={2}
      />
      <Gtk.GestureClick // right click
        onPressed={onRightClick}
        button={3}
      />
      <image icon_name={iconName} />
      <label label={label} />
    </box>
  )
}
