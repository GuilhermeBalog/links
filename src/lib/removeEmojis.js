function removeEmojis(text) {
  if (!text) {
    return '';
  }

  const emojiRegex = /[\uD800-\uDBFF]|[\u2702-\u27B0]|[\uF680-\uF6C0]|[\u24C2-\uF251]/g;
  return text.replace(emojiRegex, '');
}

module.exports = { removeEmojis }
