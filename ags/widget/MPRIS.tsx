import { Astal, Gdk, Gtk } from "ags/gtk4"
import app from "ags/gtk4/app"
import AstalMpris from "gi://AstalMpris?version=0.1"
import { createBinding, For } from "gnim"
import { Metric } from "./Metric"
import GLib from "gi://GLib?version=2.0"

let mprisWinVis = 0
let mprisWinTimer: GLib.Source
const updateMprisWin = (delta: number, index: number) => {
  mprisWinVis += delta
  if (mprisWinVis > 0) {
    mprisWinTimer && clearTimeout(mprisWinTimer)
    app.get_window(`mpris${index}`)!.visible = true
  } else {
    mprisWinTimer = setTimeout(() => {
      app.get_window(`mpris${index}`)!.visible = false
    }, 20)
  }
}

export const MprisWindow = ({ gdkmonitor }:{ gdkmonitor: Gdk.Monitor }) => {
  const { TOP, RIGHT } = Astal.WindowAnchor
  const monIndex = app.monitors.indexOf(gdkmonitor)

  return (
    <window
      name={`mpris${monIndex}`}
      class={"mpris"}
      keymode={Astal.Keymode.ON_DEMAND}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.IGNORE}
      anchor={ TOP | RIGHT }
      application={app}
      marginTop={32}
      marginRight={230}
    >
      <Gtk.EventControllerMotion
        onEnter={() => updateMprisWin(1, monIndex)}
        onLeave={() => updateMprisWin(-1, monIndex)}
      />
      <Mpris />
    </window>
  )
}

export const MprisToggle = ({ monIndex }:{ monIndex: number }) => {
  return (
    <Metric
      iconName={"multimedia-player-symbolic"}
      onHoverEnter={() => updateMprisWin(1, monIndex)}
      onHoverExit={() => updateMprisWin(-1, monIndex)}
    />
  )
}

export const Mpris = () => {
  const mpris = AstalMpris.get_default()
  const players = createBinding(mpris, "players")
  const v = Gtk.Orientation.VERTICAL
  const c = Gtk.Align.CENTER
  const formatSeconds = (ss: number) => {
    let mm: number = ss / 60
    ss = ss % 60
    let mmstr = ""
    let ssstr = ""
    if (mm < 10) mmstr = "0" + mm.toFixed(0)
    else mmstr = mm.toFixed(0)
    if (ss < 10) ssstr = "0" + ss.toFixed(0)
    else ssstr = ss.toFixed(0)
    return `${mmstr}:${ssstr}`
  }

  return (
    <box orientation={v}>
      <For each={players}>
        {player =>
          <box orientation={v}>
            <box spacing={16}>
              <image file={createBinding(player, "coverArt")} pixelSize={128} />
              <box orientation={v} valign={c} spacing={8}>
                <label label={createBinding(player, "title")} />
                <label label={createBinding(player, "artist")} />
              </box>
            </box>
            <box orientation={v} spacing={8}>
              <box spacing={16} halign={c}>
                <button
                  class={"mpris-button"}
                  iconName={"media-skip-backward-symbolic"}
                  onClicked={() => player.previous()}
                  sensitive={createBinding(player, "canGoPrevious")}
                />
                <button
                  class={"mpris-button"}
                  iconName={createBinding(player, "playbackStatus").as(s => {
                  return s == AstalMpris.PlaybackStatus.PAUSED
                      ? "media-playback-start-symbolic"
                      : "media-playback-pause-symbolic"
                  })}
                  onClicked={() => player.play_pause()}
                />
                <button
                  class={"mpris-button"}
                  iconName={"media-skip-forward-symbolic"}
                  onClicked={() => player.next()}
                  sensitive={createBinding(player, "canGoNext")}
                />
              </box>
              <box halign={c} spacing={16}>
                <label label={createBinding(player, "position").as(formatSeconds)} />
                <slider
                  value={createBinding(player, "position").as(p => p / player.length)}
                  onChangeValue={(source, scrollType, value) => {
                    console.log(scrollType)
                    console.log(value)
                    player.position = source.value
                  }}
                  min={0}
                  max={1}
                />
                <label label={createBinding(player, "length").as(formatSeconds)} />
              </box>
            </box>
          </box>
        }
      </For>
    </box>
  )
}

