---@diagnostic disable: undefined-global

hl.monitor({ output = "eDP-1", mode = "preferred", position = "0x0", scale = 1 })
hl.monitor({ output = "desc:Hewlett Packard HP E232 3CQ7392VCX", mode = "preferred", position = "-1920x0", scale = 1 })
hl.monitor({ output = "desc:Hewlett Packard HP E232 3CQ73926PP", mode = "preferred", position = "-3840x0", scale = 1 })
hl.monitor({ output = "_", mode = "preferred", position = "auto", scale = 1 })

hl.on("hyprland.start", function ()
	hl.exec_cmd("dbus-update-activation-environment")
	hl.exec_cmd("hyprpaper")
	hl.exec_cmd("ags run")
end)

local terminal = "kitty"
local fileManager = "kitty -e yazi"
local menu = "wofi"
local screenshot = "grimblast --freeze save area - | swappy -f -"
local screenshotall = "grim - | wl-copy"

hl.env("QT_QPA_PLATFORMTHEME", "qt5ct")
hl.env("AQ_DRM_DEVICES", "/dev/dri/card1")
hl.env("WLR_DRM_DEVICES", "/dev/dri/card1")

hl.env("XCURSOR_SIZE", "24")
hl.env("XCURSOR_THEME", "Bibata-Modern-Classic")
hl.env("HYPRCURSOR_THEME", "Bibata-Modern-Classic")
hl.env("HYPRCURSOR_SIZE", "24")

hl.config({
	general = {
		gaps_in = 2,
		gaps_out = 10,
		border_size = 3,
		col = {
			active_border = "rgba(ffffccff)",
			inactive_border = "rgba(555566ff)",
		},
		layout = "master",
		allow_tearing = false,
	},

	input = {
		kb_layout = "es",
		kb_variant = "",
		kb_model = "",
		-- options at /usr/share/X11/xkb/rules/base.lst
		kb_options = "caps:super",
		kb_rules = "",
		numlock_by_default = true,

		repeat_delay = 300,
		repeat_rate = 30,

		follow_mouse = 1,
		sensitivity = 0, -- -1.0 - 1.0, 0 means no modification.
		touchpad = {
			natural_scroll = true,
			disable_while_typing = true,
			scroll_factor = 0.1,
		},
		tablet = {
			left_handed = true,
			-- left_handed = false,
			-- active_area_size = 40 50,
			-- active_area_position = 0 40,
		},
	},

	master = {
		mfact = 0.50
	},

	dwindle = {
		force_split = 2,
		preserve_split = true,
	},

	cursor = {
		no_warps = false,
		no_hardware_cursors = 0,
	},

	misc = {
		disable_hyprland_logo = true,
		middle_click_paste = false,
	},

	decoration = {
		rounding = 10,
		blur = {
			enabled = false,
			size = 5,
			passes = 1,
		},

		shadow = {
			enabled = false,
		},

		dim_inactive = false,
		dim_strength = 0.05,
	},

})

hl.curve( "ease", { type = "bezier", points = {{0.22, 1},{0.36,1}} })
hl.curve( "zoink", { type = "bezier", points = {{0.13, 0.99},{0.29,1.1}} })

hl.animation({ leaf = "windows", enabled = true, speed = 5, bezier = "ease", style = "slide right" })
hl.animation({ leaf = "windowsOut", enabled = true, speed = 5, bezier = "ease", style = "popin" })
hl.animation({ leaf = "fade", enabled = true, speed = 5, bezier = "ease" })
hl.animation({ leaf = "workspaces", enabled = true, speed = 3, bezier = "ease", style = "slide" })
hl.animation({ leaf = "fadeLayers", enabled = false })

hl.device({ name = "cust0001:00-04f3:30fa-touchpad", enabled = false, sensitivity = 0.3, })
hl.device({ name = "2.4g-mouse", sensitivity = -0.7, })
hl.device({ name = "2.4g-mouse-1", sensitivity = -0.7, })

hl.bind("SUPER + RETURN", hl.dsp.exec_cmd(terminal))
hl.bind("SUPER +  C", hl.dsp.window.close())
hl.bind("SUPER + SHIFT + C", hl.dsp.window.kill())
hl.bind("SUPER + SHIFT + M", hl.dsp.exit())
hl.bind("SUPER + M", hl.dsp.exec_cmd("hyprlock"))
hl.bind("SUPER + E", hl.dsp.exec_cmd(fileManager))
hl.bind("SUPER + V", hl.dsp.window.float({ action = "toggle" }))
hl.bind("SUPER + F", hl.dsp.window.fullscreen({ action = "toggle" }))
hl.bind("SUPER + R", hl.dsp.exec_cmd(menu))
hl.bind("SUPER + SHIFT + S", hl.dsp.exec_cmd(screenshot))
hl.bind("Print", hl.dsp.exec_cmd(screenshotall))

hl.bind("SUPER + SHIFT + K", hl.dsp.window.swap({ direction = "u" }))
hl.bind("SUPER + SHIFT + H", hl.dsp.window.swap({ direction = "l" }))
hl.bind("SUPER + SHIFT + J", hl.dsp.window.swap({ direction = "d" }))
hl.bind("SUPER + SHIFT + L", hl.dsp.window.swap({ direction = "r" }))
hl.bind("SUPER + CTRL + K", hl.dsp.window.resize({ x =  10, y = 0, relative = true }), { repeating = true })
hl.bind("SUPER + CTRL + J", hl.dsp.window.resize({ x = -10, y = 0, relative = true }), { repeating = true })
hl.bind("SUPER + CTRL + H", hl.dsp.layout("mfact -0.05"), { repeating = true })
hl.bind("SUPER + CTRL + L", hl.dsp.layout("mfact +0.05"), { repeating = true })
hl.bind("SUPER + SHIFT + R", hl.dsp.layout("orientationcycle left top"))

-- Move focus with mainMod + arrow keys
hl.bind("SUPER + h", hl.dsp.focus({ direction = "l"}))
hl.bind("SUPER + l", hl.dsp.focus({ direction = "r"}))
hl.bind("SUPER + k", hl.dsp.focus({ direction = "u"}))
hl.bind("SUPER + j", hl.dsp.focus({ direction = "d"}))

-- Switch workspaces with mainMod + [0-9]
hl.bind("SUPER + 1", hl.dsp.focus({ workspace = 1 }))
hl.bind("SUPER + 2", hl.dsp.focus({ workspace = 2 }))
hl.bind("SUPER + 3", hl.dsp.focus({ workspace = 3 }))
hl.bind("SUPER + 4", hl.dsp.focus({ workspace = 4 }))
hl.bind("SUPER + 5", hl.dsp.focus({ workspace = 5 }))
hl.bind("SUPER + 6", hl.dsp.focus({ workspace = 6 }))
hl.bind("SUPER + 7", hl.dsp.focus({ workspace = 7 }))
hl.bind("SUPER + 8", hl.dsp.focus({ workspace = 8 }))
hl.bind("SUPER + 9", hl.dsp.focus({ workspace = 9 }))
hl.bind("SUPER + 0", hl.dsp.focus({ workspace = 10 }))

-- Move active window to a workspace with mainMod + SHIFT + [0-9]
hl.bind("SUPER + SHIFT + 1", hl.dsp.window.move({ workspace = 1 }))
hl.bind("SUPER + SHIFT + 2", hl.dsp.window.move({ workspace = 2 }))
hl.bind("SUPER + SHIFT + 3", hl.dsp.window.move({ workspace = 3 }))
hl.bind("SUPER + SHIFT + 4", hl.dsp.window.move({ workspace = 4 }))
hl.bind("SUPER + SHIFT + 5", hl.dsp.window.move({ workspace = 5 }))
hl.bind("SUPER + SHIFT + 6", hl.dsp.window.move({ workspace = 6 }))
hl.bind("SUPER + SHIFT + 7", hl.dsp.window.move({ workspace = 7 }))
hl.bind("SUPER + SHIFT + 8", hl.dsp.window.move({ workspace = 8 }))
hl.bind("SUPER + SHIFT + 9", hl.dsp.window.move({ workspace = 9 }))
hl.bind("SUPER + SHIFT + 0", hl.dsp.window.move({ workspace = 10 }))

-- Example special workspace (scratchpad)
-- hl.bind(SUPER, S, togglespecialworkspace, magic
-- hl.bind(SUPER SHIFT, S, movetoworkspace, special:magic
hl.bind("SUPER + P", hl.dsp.window.pin({ action = "toggle" }))

-- Scroll through existing workspaces with mainMod + scroll
hl.bind("SUPER + mouse_down", hl.dsp.focus({ workspace = "e+1" }))
hl.bind("SUPER + mouse_up"  , hl.dsp.focus({ workspace = "e-1" }))

-- Move/resize windows with mainMod + LMB/RMB and dragging
hl.bind("SUPER + mouse:272", hl.dsp.window.drag(), { mouse = true })
hl.bind("SUPER + mouse:273", hl.dsp.window.resize(), { mouse = true })

-- Audio
hl.bind("XF86AudioRaiseVolume", hl.dsp.exec_cmd("~/.config/hypr/volume.sh --up"), { locked = true, repeating = true })
hl.bind("XF86AudioLowerVolume", hl.dsp.exec_cmd("~/.config/hypr/volume.sh --down"), { locked = true, repeating = true })
hl.bind("XF86AudioMute", hl.dsp.exec_cmd("pactl set-sink-mute @DEFAULT_SINK@ toggle"), { locked = true })
hl.bind("XF86AudioNext", hl.dsp.exec_cmd("mpc next"), { locked = true, repeating = true })
hl.bind("XF86AudioPrev", hl.dsp.exec_cmd("mpc prev"), { locked = true, repeating = true })
hl.bind("XF86AudioPlay", hl.dsp.exec_cmd("mpc toggle"), { locked = true, repeating = true })
hl.bind("SUPER + space", hl.dsp.exec_cmd("playerctl play-pause"), { locked = true, repeating = true })
hl.bind("SUPER + right", hl.dsp.exec_cmd("playerctl next"), { locked = true, repeating = true })
hl.bind("SUPER + left", hl.dsp.exec_cmd("playerctl previous"), { locked = true, repeating = true })
hl.bind("SUPER + SHIFT + right", hl.dsp.exec_cmd("playerctl position 5+"), { locked = true, repeating = true })
hl.bind("SUPER + SHIFT + left", hl.dsp.exec_cmd("playerctl position 5-"), { locked = true, repeating = true })
hl.bind("CTRL + F3", hl.dsp.exec_cmd("~/.config/hypr/touchpad.sh"), { locked = true })

-- Brightness
hl.bind("XF86MonBrightnessUp", hl.dsp.exec_cmd("brightnessctl s 1%+"), { locked = true, repeating = true })
hl.bind("XF86MonBrightnessDown", hl.dsp.exec_cmd("brightnessctl s 1%-"), { locked = true, repeating = true })

-- window rules
hl.window_rule({ name = "krita hell window", match = { class = "krita", title = "krita", float = true }, no_initial_focus = true })
hl.window_rule({ name = "float mc", match = { class = "Minecraft Launcher" }, tile = true })
hl.window_rule({ name = "python ass", match = { class = "python3" }, float = true, center = true })

hl.window_rule({ name = "red pin", match = { pin = true }, border_color = "rgb(FF0000)" })
hl.window_rule({ name = "nodim fullscreen", match = { fullscreen = true }, no_dim = true })

-- layer rules
hl.layer_rule({ name = "", match = { namespace = "selection" }, no_anim = true })
hl.layer_rule({ name = "", match = { namespace = "hyprpicker" }, no_anim = true })
