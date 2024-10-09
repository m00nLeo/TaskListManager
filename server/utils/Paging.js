const PAGE_SIZE = 3; // Kích thước trang mặc định

function paginate(data, currentPage) {
  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = Math.min(currentPage * PAGE_SIZE, data.length);
  const currentPageData = data.slice(startIndex, endIndex);

  return {
    data,
    result: currentPageData,
    page: currentPage,
    totalPages: totalPages,
  };
}

export default paginate;
