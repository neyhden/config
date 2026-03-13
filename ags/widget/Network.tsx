import AstalNetwork from "gi://AstalNetwork?version=0.1"
import { Metric } from "./Metric"
import { createBinding } from "gnim"

export const NetworkStatus = () => {
  const network = AstalNetwork.get_default().wifi

  return (
    <Metric
      className="network-metric"
      label={createBinding(network, "ssid")}
      iconName={createBinding(network, "iconName")}
    />
  )
}


