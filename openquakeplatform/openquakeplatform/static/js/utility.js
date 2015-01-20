function escapeHtml(text) {
  var map = {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
    '\r': '<br>'
  };

  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}