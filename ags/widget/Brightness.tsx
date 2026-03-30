import { exec, execAsync } from "ags/process"
import { Metric } from "./Metric"
import { createState } from "gnim"
import { monitorFile } from "ags/file"

export const Brightness = () => {
  const [brightness, setBrightness] = createState((Number(exec("brightnessctl get")) / Number(exec("brightnessctl max")) * 100).toFixed(0))

  const device = exec("sh -c 'ls -w1 /sys/class/backlight | head -1'")
  monitorFile(`/sys/class/backlight/${device}/brightness`, () => {
    setBrightness((Number(exec("brightnessctl get")) / Number(exec("brightnessctl max")) * 100).toFixed(0))
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
