import { Astal, Gdk, Gtk } from "ags/gtk4"
import app from "ags/gtk4/app"
import { Accessor, createEffect, createState, For } from "gnim"
import { Metric } from "./Metric"
import GLib from "gi://GLib?version=2.0"
import { exec } from "ags/process"

const NOTES_DIR = '~/.local/share/ags';
const NOTES_DELIM = '|---|';
let notesWinVis = 0
let notesWinTimer: GLib.Source
const updateNotesWin = (delta: number, index: number) => {
	notesWinVis += delta
	if (notesWinVis > 0) {
		notesWinTimer && clearTimeout(notesWinTimer);
		app.get_window(`notes${index}`)!.visible = true;
	} else {
		notesWinTimer = setTimeout(() => {
			app.get_window(`notes${index}`)!.visible = false;
			writeNotes();
		}, 20)
	}
}

const [noteList, setNoteList] = createState([{ buffer: new Gtk.TextBuffer() }]);

try {
	const notesString = exec(`sh -c "cat ${NOTES_DIR}/notes.txt 2> /dev/null || echo ''"`);
	const notesTexts = notesString.split(NOTES_DELIM);
	const notes = [];
	for (const note of notesTexts) {
			if (!note) continue;
		const buf = new Gtk.TextBuffer();
		buf.text = note;
		notes.push({ buffer: buf });
	}
	setNoteList(notes);
} catch (e) {
	console.error(e);
}

const createNote = () => {
	const newNotes = noteList().slice();
	const newBuffer = new Gtk.TextBuffer();
	newBuffer.text = 'New note...';
	newNotes.push({ buffer: newBuffer });
	setNoteList(newNotes);
}

const deleteNote = (index: number) => {
	const newNotes = noteList().slice();
	newNotes.splice(index, 1);
	setNoteList(newNotes);
}

const writeNotes = () => {
	let outStr = '';
	for (const note of noteList()) {
		outStr += note.buffer.text + NOTES_DELIM;
	}
	exec(`sh -c "[ ! -d ${NOTES_DIR} ] && mkdir ${NOTES_DIR} || true"`);
	exec(`sh -c "echo '${outStr}' > ${NOTES_DIR}/notes.txt"`);
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
						writeNotes();
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
		<box orientation={Gtk.Orientation.VERTICAL} spacing={16}>
			<button onClicked={createNote}>+</button>
			<scrolledwindow maxContentHeight={800} min_content_height={800}>
				<box orientation={Gtk.Orientation.VERTICAL} spacing={8}>
					<For each={noteList}>
						{(note, index) => 
							<box orientation={Gtk.Orientation.VERTICAL} class={'note'}>
								<button onClicked={() => deleteNote(index())}>del</button>
								<Gtk.TextView
									hexpand={true}
									buffer={note.buffer}
								/>
							</box>
						}
					</For>
				</box>
			</scrolledwindow>
		</box>
	)
}

