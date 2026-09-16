import { Astal, Gdk, Gtk } from "ags/gtk4"
import app from "ags/gtk4/app"
import { Accessor, createState, For } from "gnim"
import { Metric } from "./Metric"
import GLib from "gi://GLib?version=2.0"
import { readFile, readFileAsync } from "ags/file"

let notesWinVis = 0
let notesWinTimer: GLib.Source
const updateNotesWin = (delta: number, index: number) => {
	notesWinVis += delta
	if (notesWinVis > 0) {
		notesWinTimer && clearTimeout(notesWinTimer)
		app.get_window(`notes${index}`)!.visible = true
	} else {
		notesWinTimer = setTimeout(() => {
			app.get_window(`notes${index}`)!.visible = false
		}, 20)
	}
}

const [noteList, setNoteList] = createState([{text: "First note"}]);
try {
	let notesString = readFile("~/.local/share/ags/notes.txt");
	setNoteList(JSON.parse(notesString));
} catch (e) {
	console.error(e);
}

export const NotesWindow = ({ gdkmonitor }:{ gdkmonitor: Gdk.Monitor }) => {
	const { TOP, RIGHT } = Astal.WindowAnchor
	const monIndex = app.monitors.indexOf(gdkmonitor)

	return (
		<window
			name={`notes${monIndex}`}
			class={"notes"}
			keymode={Astal.Keymode.ON_DEMAND}
			gdkmonitor={gdkmonitor}
			exclusivity={Astal.Exclusivity.IGNORE}
			anchor={ TOP | RIGHT }
			application={app}
			marginTop={32}
			marginRight={150}
			defaultWidth={400}
		>
			<Gtk.EventControllerMotion
				onEnter={() => updateNotesWin(1, monIndex)}
				onLeave={() => updateNotesWin(-1, monIndex)}
			/>
			<Gtk.EventControllerKey
				onKeyPressed={({ widget }, keyval: number) => {
					if (keyval === Gdk.KEY_Escape) {
						widget.hide()
					}
				}}
			/>
			<Notes />
		</window>
	)
}

export const NotesToggle = ({ monIndex }:{ monIndex: number }) => {
	return (
		<Metric
			iconName={"view-paged-symbolic"}
			className={"notes-toggle"}
			onHoverEnter={() => updateNotesWin(1, monIndex)}
			onHoverExit={() => updateNotesWin(-1, monIndex)}
		/>
	)
}

export const Notes = () => {
	return (
		<box orientation={Gtk.Orientation.VERTICAL}>
			<For each={noteList}>
				{ note =>
					<label label={note.text} />
				}
			</For>
		</box>
	)
}

