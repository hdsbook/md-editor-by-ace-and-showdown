var MarkdownIO = function(inputId, outputId) {
    this.editor = this._initEditor(inputId, outputId);
}

MarkdownIO.prototype._initEditor = function(inputId, outputId) {
    let _this = this;
    let editor = ace.edit(inputId);
    // editor.setReadOnly(true);                         // 是否唯讀
    editor.setTheme("ace/theme/dawn");                // 主題樣式
    editor.setShowPrintMargin(false);                 // 不要顯示右方 margin
    editor.setKeyboardHandler("ace/keyboard/vscode"); // 快捷鍵類型 (keybinding)
    editor.session.setMode("ace/mode/markdown");      // 內容語言類型
    editor.session.on('change', function(delta) {
        // delta.start, delta.end, delta.lines, delta.action
        var markdownText = editor.getValue();
        var html = _this._markdownToHtml(markdownText);
        $("#" + outputId).html(html);
    });
    return editor;
}

MarkdownIO.prototype._markdownToHtml = function(text) {
    var converter = new showdown.Converter();
    return converter.makeHtml(text);
}
