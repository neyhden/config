return {
	{
		"nvim-telescope/telescope.nvim",
		dependencies = { "nvim-lua/plenary.nvim" },
		config = function()
			local builtin = require("telescope.builtin")
			vim.keymap.set("n", "tf", builtin.find_files, {})
            vim.keymap.set("n", "tb", ":Telescope buffers<CR>", {})
            require('telescope').setup{
                defaults = {
                    mappings = {
                        n = {
                            ["q"] = "close",
                        }
                    }
                },
                pickers = {
                    buffers = {
                        mappings = {
                            n = {
                                ["d"] = "delete_buffer"
                            }
                        }
                    }
                }
            }
		end,
	},
	{
		"nvim-telescope/telescope-ui-select.nvim",
		config = function()
			require("telescope").setup({
				extensions = {
					["ui-select"] = {
						require("telescope.themes").get_dropdown({}),
					},
				},
			})
			require("telescope").load_extension("ui-select")
		end,
	},
}
