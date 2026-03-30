import { exec, execAsync } from "ags/process"
import { Metric } from "./Metric"
import { createBinding, createState } from "gnim"
import { monitorFile } from "ags/file"

export const Brightness = () => {
  const [brightness, setBrightness] = createState(exec("brightnessctl get -P"))

  const device = exec("sh -c 'ls -w1 /sys/class/backlight | head -1'")
  monitorFile(`/sys/class/backlight/${device}/brightness`, () => {
    setBrightness(exec("brightnessctl get -P"))
  })

  return (
    <Metric
      className="brightness-metric"
      iconName={"display-brightness-symbolic"}
      label={brightness.as(b => `${b}%`)}
      onScrollUp={() => execAsync("brightnessctl set +5%")}
      onScrollDown={() => execAsync("brightnessctl set 5%-")}
    />
  )
}
