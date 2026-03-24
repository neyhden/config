import { Gtk } from "ags/gtk4"
import Gio from "gi://Gio?version=2.0"
import { Accessor } from "gnim"

interface props {
  iconName?: string | Accessor<string>
  iconPath?: string | Accessor<string>
  gicon?: Gio.Icon | Accessor<Gio.Icon>
  label?: string | Accessor<string>
  className?: string | Accessor<string>
  tooltip?: string | Accessor<string>
  onLeftClick?: () => void
  onRightClick?: () => void
  onMiddleClick?: () => void
  onScrollUp?: () => void
  onScrollDown?: () => void
  onHoverEnter?: () => void
  onHoverExit?: () => void
  children?: JSX.Element | Array<JSX.Element>
}
export const Metric = (
  {
    iconName,
    iconPath,
    gicon,
    label,
    className,
    tooltip,
    onLeftClick,
    onRightClick,
    onMiddleClick,
    onScrollUp,
    onScrollDown,
    onHoverEnter,
    onHoverExit,
    children
  }: props
) => {
  return (
    <box
      orientation={Gtk.Orientation.HORIZONTAL}
      spacing={5}
      class={className + ' metric'}
      tooltipText={tooltip}
    >
      <Gtk.EventControllerMotion
        onEnter={onHoverEnter}
        onLeave={onHoverExit}
      />
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
      <image
        visible={ iconName != undefined || iconPath != undefined || gicon != undefined }
        icon_name={iconName}
        file={iconPath}
        gicon={gicon}
      />
      <label label={label} />
      { children }
    </box>
  )
}
