import AstalNetwork from "gi://AstalNetwork?version=0.1"
import { Metric } from "./Metric"
import { createBinding, createEffect, createState } from "gnim"
import { exec } from "ags/process"

export const NetworkStatus = () => {
  const network = AstalNetwork.get_default()

  const primary = createBinding(network, "primary")
  const wireIcon = createBinding(network.wired, "iconName")
  const wifiIcon = createBinding(network.wifi, "iconName")

  const [label, setLabel] = createState<string>("")
  const [icon, setIcon] = createState("")
  const [showIp, setShowIp] = createState(false)
  createEffect(() => {
    switch (primary()) {
      case AstalNetwork.Primary.WIFI: {
        setLabel(showIp() ? exec("hostname -I").split(' ').join(" - ") : network.wifi.ssid)
        setIcon(wifiIcon())
        break;
      }
      case AstalNetwork.Primary.WIRED: {
        setLabel(showIp() ? exec("hostname -I").split(' ').join(" - ") : "")
        setIcon(wireIcon())
        break;
      }
      case AstalNetwork.Primary.UNKNOWN: {
        setLabel("No connection")
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
      onLeftClick={() => setShowIp(!showIp())}
    />
  )
}


