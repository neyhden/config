return {
	"iamcco/markdown-preview.nvim",
	config = function()
		vim.fn["mkdp#util#install"]()
    vim.keymap.set('n', 'mp', ':MarkdownPreview<CR>', { desc = "Markdown Preview" })
	end,
}
