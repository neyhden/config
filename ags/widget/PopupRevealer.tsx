import { createState } from "ags"
import { Gtk } from "ags/gtk4"
import { timeout, Timer } from "ags/time"

type Props = {
	children: Array<JSX.Element>,
}

export default (p: Props) => {
	const [visible, setVisible] = createState(false)
	const [reveal, setReveal] = createState(false)
	let popref: Gtk.Popover | null = null
	let hideTimeout: Timer

	const show = () => {
		if (hideTimeout) hideTimeout.cancel()
		setVisible(true)
		setReveal(true)
	}
	
	const hide = () => {
		hideTimeout = timeout(200, () => setReveal(false))
	}

	return (
		<box>
			<Gtk.EventControllerMotion
				onEnter={show}
				onLeave={hide}
			/>
			{ p.children[0] }
			<popover
				visible={visible}
				hasArrow={false}
				autohide={false}
				onShow={() => {
					setVisible(true)
				}}
				onHide={() => {
					setVisible(false)
				}}
				$={self => {
					Object.assign(self, {popup: show, popdown: hide})
					popref = self
				}}
			>
				<Gtk.EventControllerMotion
					onEnter={show}
					onLeave={hide}
				/>
				<revealer
					transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
					transitionDuration={200}
					revealChild={reveal}
					onNotifyChildRevealed={self => {
						setVisible(self.childRevealed)
					}}
				>
					{ p.children[1] }
				</revealer>
			</popover>
		</box>
	)
}
