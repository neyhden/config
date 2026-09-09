import app from "ags/gtk4/app"
import { Astal, Gdk, Gtk } from "ags/gtk4"
import { Clock } from "./Clock"
import { Workspaces } from "./Workspaces"
import { MicVolume, SpeakerVolume } from "./Volume"
import { BatteryLevel } from "./Battery"
import { NetworkStatus } from "./Network"
import { SysTray } from "./SysTray"
import { Mpris, MprisToggle } from "./MPRIS"
import { Brightness } from "./Brightness"
import { Window } from "./Window"


export const Bar = ({ gdkmonitor }:{ gdkmonitor: Gdk.Monitor }) => {
	const { TOP, LEFT, RIGHT } = Astal.WindowAnchor
	const monIndex = app.monitors.indexOf(gdkmonitor)

	return (
		<window
			visible
			name="bar"
			gdkmonitor={gdkmonitor}
			exclusivity={Astal.Exclusivity.EXCLUSIVE}
			anchor={TOP | LEFT | RIGHT }
			application={app}
		>
			<centerbox>
				<box $type="start" spacing={10}>
					<NetworkStatus />
					<BatteryLevel />
					<SysTray />
				</box>
				<box $type="center">
					<Workspaces />
				</box>
				<centerbox $type="end" hexpand marginStart={20}>
					<box $type="start">
						<Window />
					</box>
					<box $type="end" halign={Gtk.Align.END} spacing={10}>
						<MprisToggle monIndex={monIndex} />
						<SpeakerVolume />
						<MicVolume />
						<Brightness />
						<Clock monIndex={monIndex} />
					</box>
				</centerbox>
			</centerbox>
		</window>
	)
}
