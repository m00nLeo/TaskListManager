function paginate(data, currentPage, pagePerSheet) {
  // Count total page due to page size (paper per sheet)
  const totalPages = Math.ceil(data.length / pagePerSheet);

  // Start with next Index item
  const startIndex = (currentPage - 1) * pagePerSheet;

  // The last page
  const endIndex = Math.min(currentPage * pagePerSheet, data.length);

  // Order task by Order when drag and drop
  const sortedTasks = [...data].sort((a, b) => a.order - b.order);

  // Get the array of list data due to page size
  const currentPageData = sortedTasks.slice(startIndex, endIndex);

  return {
    data,
    result: currentPageData,
    page: currentPage,
    totalPages: totalPages,
  };
}

export default paginate;
