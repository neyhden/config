import { Gtk } from "ags/gtk4";
import AstalHyprland from "gi://AstalHyprland?version=0.1"
import GLib from "gi://GLib?version=2.0";
import { createState } from "gnim";

const layoutNameMap = new Map();
layoutNameMap.set('sp', 'es');

export const Keyboard = () => {
	const hyprland = AstalHyprland.get_default();
	const [currentLayout, setCurrentLayout] = createState(''); // hyprctl devices -j | jq -r '.keyboards[] | select(.main == true) | .active_keymap'
	const [revealbox, setRevealbox] = createState(false);
	let timer: GLib.Source;

	hyprland.connect('keyboard-layout', (_self, _kb, layout) => {
		var layoutName = layout.slice(0, 2).toLowerCase();
		layoutName = layoutNameMap.get(layoutName) ? layoutNameMap.get(layoutName) : layoutName;
		setCurrentLayout(layoutName);
		setRevealbox(true);
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			setRevealbox(false);
		}, 3000);
	});

	return (
		<revealer revealChild={revealbox} transitionDuration={200} transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT} class={'kbbox'}>
			<box spacing={4}>
				<image iconName={'input-keyboard-symbolic'} />
				<label label={currentLayout} />
			</box>
		</revealer>
	)
}
