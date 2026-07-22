import fs from 'node:fs';

class ElementNode {
  constructor(tag, attrs = {}) {
    this.tag = tag;
    this.attrs = attrs;
    this.children = [];
  }
}

function decodeEntities(value) {
  const named = {
    amp: '&',
    apos: "'",
    gt: '>',
    lt: '<',
    nbsp: ' ',
    quot: '"'
  };
  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (_, entity) => {
    if (entity[0] !== '#') return named[entity.toLowerCase()] ?? `&${entity};`;
    const hexadecimal = entity[1].toLowerCase() === 'x';
    const number = Number.parseInt(entity.slice(hexadecimal ? 2 : 1), hexadecimal ? 16 : 10);
    return Number.isNaN(number) ? `&${entity};` : String.fromCodePoint(number);
  });
}

function parseAttributes(source) {
  const attrs = {};
  for (const match of source.matchAll(/([:\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)) {
    attrs[match[1].toLowerCase()] = decodeEntities(match[2] ?? match[3] ?? match[4] ?? '');
  }
  return attrs;
}

function parseHtml(html) {
  const root = new ElementNode('root');
  const stack = [root];
  const voidTags = new Set(['br', 'hr', 'img', 'input', 'link', 'meta']);
  const tokens = html.match(/<!--[\s\S]*?-->|<![^>]*>|<[^>]+>|[^<]+/g) ?? [];

  for (const token of tokens) {
    if (token.startsWith('<!--') || token.startsWith('<!')) continue;
    if (!token.startsWith('<')) {
      stack.at(-1).children.push(decodeEntities(token));
      continue;
    }
    if (token.startsWith('</')) {
      const tag = token.slice(2).match(/^\s*([\w-]+)/)?.[1]?.toLowerCase();
      while (stack.length > 1) {
        const node = stack.pop();
        if (node.tag === tag) break;
      }
      continue;
    }

    const name = token.slice(1).match(/^\s*([\w-]+)/)?.[1]?.toLowerCase();
    if (!name) continue;
    const attrsSource = token.slice(token.indexOf(name) + name.length, token.lastIndexOf('>'));
    const node = new ElementNode(name, parseAttributes(attrsSource));
    stack.at(-1).children.push(node);
    if (!voidTags.has(name) && !token.endsWith('/>')) stack.push(node);
  }
  return root;
}

function hasClass(node, className) {
  return (node.attrs.class ?? '').split(/\s+/).includes(className);
}

function findNode(node, predicate) {
  if (node instanceof ElementNode && predicate(node)) return node;
  if (!(node instanceof ElementNode)) return null;
  for (const child of node.children) {
    const found = findNode(child, predicate);
    if (found) return found;
  }
  return null;
}

function cleanInline(value) {
  return value.replace(/[ \t\r\n]+/g, ' ').trim();
}

function inline(node) {
  if (typeof node === 'string') return node.replace(/[ \t\r\n]+/g, ' ');
  const content = node.children.map(inline).join('');
  if (node.tag === 'strong' || node.tag === 'b') return `**${cleanInline(content)}**`;
  if (node.tag === 'em' || node.tag === 'i') return `*${cleanInline(content)}*`;
  if (node.tag === 'code') return `\`${cleanInline(content)}\``;
  if (node.tag === 'a') return `[${cleanInline(content)}](${node.attrs.href})`;
  if (node.tag === 'br') return '  \n';
  return content;
}

function plainInline(node) {
  if (typeof node === 'string') return node.replace(/[ \t\r\n]+/g, ' ');
  return node.children.map(plainInline).join('');
}

function renderList(node, depth = 0) {
  const ordered = node.tag === 'ol';
  const lines = [];
  let number = 1;
  for (const item of node.children.filter(child => child instanceof ElementNode && child.tag === 'li')) {
    const nested = item.children.filter(child => child instanceof ElementNode && ['ul', 'ol'].includes(child.tag));
    const primary = item.children.filter(child => !nested.includes(child)).map(inline).join('');
    const marker = ordered ? `${number}.` : '-';
    lines.push(`${'  '.repeat(depth)}${marker} ${cleanInline(primary)}`);
    nested.forEach(list => lines.push(renderList(list, depth + 1).trimEnd()));
    number += 1;
  }
  return `${lines.join('\n')}\n\n`;
}

function renderTable(node) {
  const rows = [];
  const rowNodes = [];
  const collectRows = current => {
    if (!(current instanceof ElementNode)) return;
    if (current.tag === 'tr') rowNodes.push(current);
    else current.children.forEach(collectRows);
  };
  collectRows(node);

  for (const row of rowNodes) {
    const cells = row.children
      .filter(child => child instanceof ElementNode && ['th', 'td'].includes(child.tag))
      .map(cell => cleanInline(cell.children.map(inline).join('')).replaceAll('|', '\\|'));
    if (cells.length) rows.push(cells);
  }
  if (!rows.length) return '';

  const width = Math.max(...rows.map(row => row.length));
  const normalized = rows.map(row => [...row, ...Array(width - row.length).fill('')]);
  const header = normalized[0];
  const body = normalized.slice(1);
  const line = row => `| ${row.join(' | ')} |`;
  return `${line(header)}\n${line(Array(width).fill('---'))}\n${body.map(line).join('\n')}\n\n`;
}

function renderChildren(node) {
  return node.children.map(renderBlock).join('');
}

function renderSection(node) {
  let markdown = node.attrs.id ? `<a id="${node.attrs.id}"></a>\n\n` : '';
  for (const child of node.children) {
    if (child instanceof ElementNode && hasClass(child, 'chapter-head')) {
      const numberNode = findNode(child, candidate => hasClass(candidate, 'chapter-number'));
      const headingNode = findNode(child, candidate => candidate.tag === 'h2');
      const number = cleanInline(plainInline(numberNode));
      const title = cleanInline(plainInline(headingNode));
      markdown += `## ${number}. ${title}\n\n`;
    } else {
      markdown += renderBlock(child);
    }
  }
  return markdown;
}

function renderBlock(node) {
  if (typeof node === 'string') return node.trim() ? `${cleanInline(node)}\n\n` : '';
  if (node.tag === 'section') return renderSection(node);
  if (node.tag === 'h1') {
    const printTitle = findNode(node, candidate => hasClass(candidate, 'print-title'));
    return `# ${cleanInline(plainInline(printTitle ?? node))}\n\n`;
  }
  if (node.tag === 'h2') return `## ${cleanInline(plainInline(node))}\n\n`;
  if (node.tag === 'h3') return `### ${cleanInline(plainInline(node))}\n\n`;
  if (node.tag === 'h4') return `#### ${cleanInline(plainInline(node))}\n\n`;
  if (node.tag === 'p') return `${cleanInline(node.children.map(inline).join(''))}\n\n`;
  if (node.tag === 'ul' || node.tag === 'ol') return renderList(node);
  if (node.tag === 'table') return renderTable(node);
  if (node.tag === 'header' || node.tag === 'main') return renderChildren(node);
  if (node.tag === 'div') {
    if (hasClass(node, 'chapter-number') || hasClass(node, 'chapter-head')) return '';
    return renderChildren(node);
  }
  return renderChildren(node);
}

const source = fs.readFileSync('resumen.html', 'utf8');
const documentNode = parseHtml(source);
const main = findNode(documentNode, node => node.tag === 'main' && node.attrs.id === 'content');
if (!main) throw new Error('No se encontró el contenido principal de resumen.html');

const markdown = `${renderBlock(main).replace(/\n{3,}/g, '\n\n').trim()}\n`;
fs.writeFileSync('resumen.md', markdown);
console.log(`resumen.md generado, ${markdown.split(/\s+/).length} palabras`);
