import { Gtk } from "ags/gtk4"

interface props {
  icon_name: string,
  label: string,
}
export const Metric = (
  {
    icon_name,
    label,
  }: props
) => {
  return (
    <box orientation={Gtk.Orientation.HORIZONTAL}>
      <Gtk.EventControllerScroll
      />
      <Gtk.GestureClick // left click
        button={1}
      />
      <Gtk.GestureClick // middle click
        button={2}
      />
      <Gtk.GestureClick // right click
        button={3}
      />
      <image icon_name={icon_name} />
      <label label={label} />
    </box>
  )
}
