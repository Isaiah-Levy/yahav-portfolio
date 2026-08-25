const gallery = document.getElementById('gallery');
const detailView = document.getElementById('detail-view');
const detailImg = document.getElementById('detail-img');
const detailControls = document.getElementById('detail-controls');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const btnThumbnails = document.getElementById('btn-thumbnails');
const navPaintings = document.getElementById('nav-paintings');

let paintings = [];
let current = 0;

async function init() {
  const res = await fetch('/api/paintings');
  paintings = await res.json();

  paintings.forEach((file, i) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';

    const img = document.createElement('img');
    img.src = `/paintings/${encodeURIComponent(file)}`;
    img.alt = `Painting ${i + 1}`;
    img.loading = 'lazy';

    item.appendChild(img);
    item.addEventListener('click', () => {
      if (window.innerWidth <= 700) return;
      openDetail(i);
    });
    gallery.appendChild(item);
  });
}

function openDetail(index) {
  current = index;
  detailImg.src = `/paintings/${encodeURIComponent(paintings[current])}`;
  detailImg.alt = `Painting ${current + 1}`;

  gallery.classList.add('hidden');
  detailView.classList.add('visible');
  detailControls.classList.add('visible');
  navPaintings.classList.remove('active');
}

function showGallery() {
  gallery.classList.remove('hidden');
  detailView.classList.remove('visible');
  detailControls.classList.remove('visible');
  navPaintings.classList.add('active');
  detailImg.src = '';
}

function navigate(dir) {
  current = (current + dir + paintings.length) % paintings.length;
  detailImg.src = `/paintings/${encodeURIComponent(paintings[current])}`;
  detailImg.alt = `Painting ${current + 1}`;
}

btnPrev.addEventListener('click', (e) => { e.preventDefault(); navigate(-1); });
btnNext.addEventListener('click', (e) => { e.preventDefault(); navigate(1); });
btnThumbnails.addEventListener('click', (e) => { e.preventDefault(); showGallery(); });
navPaintings.addEventListener('click', (e) => { e.preventDefault(); showGallery(); });

document.addEventListener('keydown', (e) => {
  if (!detailView.classList.contains('visible')) return;
  if (e.key === 'Escape') showGallery();
  if (e.key === 'ArrowLeft') navigate(-1);
  if (e.key === 'ArrowRight') navigate(1);
});

init();
