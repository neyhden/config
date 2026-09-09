import AstalHyprland from "gi://AstalHyprland?version=0.1"
import { createBinding, With } from "gnim"


export const Window = () => {
	const hyprland = AstalHyprland.get_default()

	hyprland.focusedClient.title
	const client = createBinding(hyprland, "focusedClient")

	return (
		<With value={client}>
			{(c) =>
				c && <box spacing={5}>
					<image
						tooltipText={createBinding(c, 'initialClass')}
						iconName={createBinding(c, "initialClass").as(ic => {var ica = ic.split('.'); return ica[ica.length - 1].toLowerCase()})}
					/>
					<label label={createBinding(c, "initialTitle")} />
				</box>
			}
		</With>
	)
}
