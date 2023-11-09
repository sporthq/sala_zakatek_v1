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
const allLinks = document.querySelectorAll('.nav-list-item');
const footerBox = document.querySelector('.footer-box');

//gallery
let imgIndex = 0;
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

		setTimeout(() => {
			lightbox.style.opacity = '1';
		}, 350);
	});
});

function handleChangeImage(e) {
	console.log(e);
	if (e.keyCode === 37 || e.target.classList.contains('arr-left')) imgIndex--;
	console.log(imgIndex);

	if (imgIndex < 0) {
		imgIndex = images.length - 1;
	}
	if (e.keyCode === 39 || e.target.classList.contains('arr-right')) imgIndex++;
	console.log(imgIndex);
	if (imgIndex >= images.length) {
		imgIndex = 0;
	}

	mainImg.style.opacity = '0';
	setTimeout(() => {
		mainImg.src = images[imgIndex].src;
		mainImg.style.opacity = '1';
	}, 350);
}

arrRight.addEventListener('click', (e) => handleChangeImage(e));
arrLeft.addEventListener('click', (e) => handleChangeImage(e));

document.addEventListener('keydown', (e) => handleChangeImage(e));

window.addEventListener('click', (e) => {
	if (e.target.classList.contains('lightbox')) {
		closeGallery();
	}
});

btnCloseGallery.addEventListener('click', closeGallery);

// menu-nav
btnMenuOpen.addEventListener('click', () => {
	header.classList.add('nav-open');
});
btnCloseNav.addEventListener('click', () => {
	header.classList.remove('nav-open');
});
document.addEventListener('scroll', () => {
	header.classList.remove('nav-open');
});

allLinks.forEach(function (link) {
	link.addEventListener('click', (e) => {
		header.classList.remove('nav-open');
	});
});

const curYear = new Date().getFullYear();
yearEl.textContent = curYear;

// menu-mobile-bottom
document.addEventListener('scroll', function () {
	if (scrollY > 20) {
		footerBox.classList.add('open-footer-nav');
	}
	if (scrollY < 20) {
		footerBox.classList.remove('open-footer-nav');
	}
	
});
