return {
	{
		"mason-org/mason.nvim",
		config = function()
			require("mason").setup()
		end,
	},
	{
		"mason-org/mason-lspconfig.nvim",
		config = function()
			require("mason-lspconfig").setup({
				ensure_installed = {
					"lua_ls",
					"ts_ls",
					"clangd",
          "cssls",
          "pyright",
          "html",
          "rust_analyzer",
          "somesass_ls",
          "jdtls",
				},
			})
		end,
	},
	{
		"neovim/nvim-lspconfig",
		config = function()
      vim.lsp.enable("lua_ls")
      vim.lsp.enable("ts_ls")
      vim.lsp.enable("clangd")
      vim.lsp.enable("cssls")
      vim.lsp.enable("pyright")
      vim.lsp.enable("html")
      vim.lsp.enable("rust_analyzer")
      vim.lsp.enable("somesass_ls")
      vim.lsp.enable("jdtls")

			vim.keymap.set("n", "K", vim.lsp.buf.hover, { desc = "Hover" })
			vim.keymap.set("n", "gd", vim.lsp.buf.definition, { desc = "Go to definition" })
			vim.keymap.set("n", "gD", vim.lsp.buf.declaration, { desc = "Go to declaration" })
      vim.keymap.set("n", "<F2>", vim.lsp.buf.rename, { desc = "Rename" })
      vim.keymap.set("n", "<leader>D", vim.diagnostic.open_float, { desc = "Line diagnostics" })
			vim.keymap.set({ "n", "v" }, "<leader>ca", vim.lsp.buf.code_action, { desc = "Code actions" })
		end,
	},
}
