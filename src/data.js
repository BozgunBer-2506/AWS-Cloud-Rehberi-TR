const markdownFiles = import.meta.glob('../docs/**/*.md', {
  query: '?raw',
  eager: true
});

export const allSections = Object.keys(markdownFiles)
  .map((path) => {
    const module = markdownFiles[path];
    const content = typeof module === 'string' ? module : module.default || '';
    const pathParts = path.split('/');
    const folderName = pathParts[pathParts.length - 2] || "General";
    const fileName = pathParts[pathParts.length - 1]?.replace('.md', '') || '';
    const idMatch = folderName.match(/^\d+/);
    const numericId = idMatch ? parseInt(idMatch[0], 10) : 999;
    const baseTitleFromFolder = folderName.replace(/^\d+-/, '').replace(/-/g, ' ').trim().toUpperCase();
    const finalTitle = fileName && fileName.toUpperCase() !== 'README' && fileName.toUpperCase() !== 'INDEX'
      ? `${baseTitleFromFolder} - ${fileName.replace(/-/g, ' ').toUpperCase()}`
      : baseTitleFromFolder;
    return {
      id: path,
      sortOrder: numericId,
      title: finalTitle,
      content: content.trim()
    };
  })
  .filter(section => section.content.length > 0)
  .sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    return a.title.localeCompare(b.title, 'tr');
  });
