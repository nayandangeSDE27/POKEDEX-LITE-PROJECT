export function getTotalPages(total, pageSize) {
  return Math.ceil(total / pageSize);
}

export function getPageItems(items, page, pageSize) {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

export function getPageRange(currentPage, totalPages, delta = 2) {
  const range = [];
  const left = Math.max(1, currentPage - delta);
  const right = Math.min(totalPages, currentPage + delta);

  if (left > 1) {
    range.push(1);
    if (left > 2) range.push('...');
  }

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  if (right < totalPages) {
    if (right < totalPages - 1) range.push('...');
    range.push(totalPages);
  }

  return range;
}
