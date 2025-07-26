document.addEventListener('DOMContentLoaded', async () => {
  const brandList = document.getElementById('brand-list');
  try {
    const response = await fetch('/dist/api/index.json');
    const brands = await response.json();

    brandList.innerHTML = ''; // Clear loading message

    brands.forEach(brand => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = `/${brand}`;
      link.textContent = brand;
      listItem.appendChild(link);
      brandList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error fetching brands:', error);
    brandList.innerHTML = '<li>Error loading brands.</li>';
  }
});