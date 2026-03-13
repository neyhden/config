import { Gtk } from "ags/gtk4"
import { Accessor, createBinding } from "gnim"

interface props {
  iconName?: string | Accessor<string>
  label?: string | Accessor<string>
  className?: string
  onLeftClick?: () => void
  onRightClick?: () => void
  onMiddleClick?: () => void
  onScrollUp?: () => void
  onScrollDown?: () => void
}
export const Metric = (
  {
    iconName,
    label,
    className,
    onLeftClick,
    onRightClick,
    onMiddleClick,
    onScrollUp,
    onScrollDown,
  }: props
) => {
  return (
    <box
      orientation={Gtk.Orientation.HORIZONTAL}
      spacing={5}
      class={className + ' metric'}
    >
      <Gtk.EventControllerScroll
        flags={Gtk.EventControllerScrollFlags.VERTICAL}
        onScroll={(_source, _h, v) => v < 0 ? onScrollUp && onScrollUp() : onScrollDown && onScrollDown()}
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
      <image visible={iconName != undefined} icon_name={iconName} />
      <label label={label} />
    </box>
  )
}
