import AstalNetwork from "gi://AstalNetwork?version=0.1"
import { Metric } from "./Metric"
import { Accessor, createBinding, With } from "gnim"
import { exec } from "ags/process";

export const NetworkStatus = () => {
	const network = AstalNetwork.get_default();
	const primary = createBinding(network, 'primary');

	return (
		<With value={primary}>
			{ primary => {
				var label: Accessor<string> | string | undefined;
				var icon: Accessor<string> | string | undefined;

				if (primary == AstalNetwork.Primary.WIFI) {
					label = createBinding(network.wifi, 'ssid');
					icon = createBinding(network.wifi, 'iconName');
				} else if (primary == AstalNetwork.Primary.WIRED) {
					label = '';
					icon = createBinding(network.wired, 'iconName');
				} else {
				}

				return <Metric
					className="network-metric"
					label={label}
					iconName={icon}
					tooltip={exec('hostname -i')}
				/>
			}}
		</With>
	)
}


