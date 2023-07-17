const multipleBugsTitleKeywords = [
  "bugs",
  "glitches"
];
const multipleThingsKeywords = [
  "\n",
  ",",
  " and "
];

/*
true if vague, false if not
Returns {
  description: true,
  attachments: true,
  title: true
}
*/
module.exports.getBugReportVagueness = (message, title) => {
  const content = (message.content ?? "").toLowerCase();
  const words = content.split(" ");
  return {
    description: words.length < 5 || content.length <= 10,
    attachments: !message.attachments?.size,
    title: getBugReportTitleVagueness(title) > 0
  }
}

module.exports.hasMultipleBugs = (message, title) => {
  return hasMultipleThings(multipleBugsTitleKeywords, message, title);
}

/*
Returns max 3
*/
function getBugReportTitleVagueness(title) {
  title = title.toLowerCase();
  const words = title.split(" ");
  let vagueness = 0;
  if (["bug","bugs"].some(s => title.endsWith(s)) && words.length < 4) vagueness++;
  if (title.length < 10) vagueness++;
  if (words.length < 3) vagueness++;
  return vagueness;
}

function hasMultipleThings(titleKeywords, message, title) {
  const content = (message.content ?? "").toLowerCase();
  title = title.toLowerCase();
  const titleWords = title.split(" ");
  const titleMatches = titleWords.length < 5 && titleKeywords.some(k => titleWords.includes(k));
  const contentMatches = multipleThingsKeywords.some(k => content.includes(k));
  return titleMatches && contentMatches;
}