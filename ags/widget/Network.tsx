import AstalNetwork from "gi://AstalNetwork?version=0.1"
import { Metric } from "./Metric"
import { createBinding, createEffect, createState } from "gnim"

export const NetworkStatus = () => {
  const network = AstalNetwork.get_default()
  const primary = createBinding(network, "primary")

  const [label, setLabel] = createState("")
  const [icon, setIcon] = createState("")
  createEffect(() => {
    switch (primary()) {
      case AstalNetwork.Primary.WIFI: {
        setLabel(network.wifi.ssid)
        setIcon(network.wifi.iconName)
        break;
      }
      case AstalNetwork.Primary.WIRED: {
        setLabel("")
        setIcon(network.wired.iconName)
        break;
      }
      case AstalNetwork.Primary.UNKNOWN: {
        setLabel("Unknown network")
        setIcon("network-wireless-no-route-symbolic")
        break;
      }
    }
  })

  return (
    <Metric
      className="network-metric"
      label={label}
      iconName={icon}
    />
  )
}


