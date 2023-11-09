const images = document.querySelectorAll('.gallery-image');
const lightbox = document.querySelector('.lightbox');
const mainImg = document.querySelector('.lightbox img');
const arrLeft = document.querySelector('.arrow-left');
const arrRight = document.querySelector('.arrow-right');
const btnCloseGallery = document.querySelector('.close-lightbox');
const yearEl = document.querySelector('.year');
const header = document.querySelector('.header');
const btnCloseNav = document.querySelector('.btn-menu-close');
const btnMenuOpen = document.querySelector('.btn-menu-open');
let imgIndex = 0;
const allLinks = document.querySelectorAll('.nav-list-item');
console.log(allLinks);
// menu-nav
btnMenuOpen.addEventListener('click', () => {
	header.classList.add('nav-open');
});
btnCloseNav.addEventListener('click', () => {
	header.classList.remove('nav-open');
});

allLinks.forEach(function (link) {
	link.addEventListener('click', (e) => {
		header.classList.remove('nav-open');
	});
});
//gallery
function closeGallery() {
	lightbox.style.opacity = 0;
	setTimeout(() => {
		lightbox.style.display = 'none';
	}, 350);
}
images.forEach((img) => {
	img.addEventListener('click', (e) => {
		mainImg.src = e.target.src;
		imgIndex = [...images].indexOf(img);

		lightbox.style.display = 'flex';

		// document.body.style.overflowY = 'hidden'
		// document.body.style.marginRight = '20px'
		// document.body.classList.add('no-scroll');

		setTimeout(() => {
			lightbox.style.opacity = '1';
			// document.body.style.overflowY = 'hidden'
		}, 350);
	});
});

arrLeft.addEventListener('click', () => {
	imgIndex--;

	if (imgIndex < 0) {
		imgIndex = images.length - 1;
	}

	mainImg.style.opacity = '0';
	setTimeout(() => {
		mainImg.src = images[imgIndex].src;
		mainImg.style.opacity = '1';
	}, 350);
});

arrRight.addEventListener('click', () => {
	imgIndex++;

	if (imgIndex > images.length - 1) {
		imgIndex = 0;
	}

	mainImg.style.opacity = '0';
	setTimeout(() => {
		mainImg.src = images[imgIndex].src;
		mainImg.style.opacity = '1';
	}, 350);
});

window.addEventListener('click', (e) => {
	if (e.target.classList.contains('lightbox')) {
		closeGallery();
	}
});

btnCloseGallery.addEventListener('click', closeGallery);

const curYear = new Date().getFullYear();
yearEl.textContent = curYear;
