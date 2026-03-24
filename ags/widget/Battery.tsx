import AstalBattery from "gi://AstalBattery?version=0.1"
import { Metric } from "./Metric"
import { createBinding } from "gnim"

export const BatteryLevel = () => {
  const battery = AstalBattery.get_default()

  return (
    <Metric
      className="battery-metric"
      label={createBinding(battery, "percentage").as(v => `${(v*100).toFixed(0)}%`)}
      iconName={createBinding(battery, "batteryIconName")}
    />
  )
}

