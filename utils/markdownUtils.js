import * as yamlFront from 'yaml-front-matter'

export function cleanMarkdown (content, hideH1 = true, hideHeader = false) {
  const meta = yamlFront.loadFront(content)
  content = meta.__content || ''

  // remove all quote as it's comment
  content = content
    .split('\n')
    .filter(line => !line.startsWith('>'))
    .join('\n')

  if (hideH1) {
    content = content
      // remove atx format H1, aka `# This is H1`
      .replace(/\n# [^\n]+\n/g, '\n')
      // remove Setext format H1, aka `This is H1\n======`
      .replace(/\n[^\n]+\n=+\n/g, '\n')
  }

  if (hideHeader) {
    content = content
      // remove atx format H*, aka `## This is H2`
      .replace(/\n#+ [^\n]+\n/g, '\n')
  }

  return content
}
