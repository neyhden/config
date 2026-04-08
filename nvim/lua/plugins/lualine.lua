return {
	"nvim-lualine/lualine.nvim",
	config = function()
		require("lualine").setup({
			options = {
				theme = "dracula",
			},
      sections = {
        lualine_x = {
          function ()
            return require("auto-session.lib").current_session_name(true)
          end
        },
      },
		})
	end,
}
