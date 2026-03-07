import app from "ags/gtk4/app"
import style from "./style.scss"
import Bar from "./widget/Bar"
import { execAsync } from "ags/process"

execAsync([ "bash", "-c", "inotifywait -q -r -e CLOSE_WRITE . && (ags quit; ags run)" ])
  .catch(e => print(e))

app.start({
  instanceName: "ags",
  css: style,
  icons: "./icons/",
  main() {
    app.get_monitors().map(Bar)
  },
})
