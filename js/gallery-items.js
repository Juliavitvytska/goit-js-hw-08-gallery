const images =  [
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
      description: 'Hokkaido Flower',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
      description: 'Container Haulage Freight',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
      description: 'Aerial Beach View',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
      description: 'Flower Blooms',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
      description: 'Alpine Mountains',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
      description: 'Mountain Lake Sailing',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
      description: 'Alpine Spring Meadows',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
      description: 'Nature Landscape',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
      description: 'Lighthouse Coast Sea',
    },
  ];

const galleryList = document.querySelector('.js-gallery');
const closeModalButton = document.querySelector('[data-action="close-lightbox"]');
const image = document.querySelector(".lightbox__image");
const currentActiveImage = document.querySelector('.lightbox.is-open');
const overlay = document.querySelector(".lightbox__overlay");

const imagesList = createImagesList(images);
galleryList.insertAdjacentHTML('beforeend', imagesList);



function createImagesList(images){
  return images.map(({preview, original, description}) =>{
    return `
    <li class="gallery__item">
    <a
    class="gallery__link"
        href="${original}"
        >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
          />
      </a>
      </li>
      `;
    })
  .join('');
}


galleryList.addEventListener('click', onImageClick);

function onImageClick(event){
  event.preventDefault();
  const isLightboxImage = event.target.classList.contains('lightbox__image');
  
  if(!isLightboxImage){
    return;
  }
    
  if(currentActiveImage){
    currentActiveImage.classList.remowe('is-open');
  }
  
  const imageElement = event.target;
  
  image.classList.add('is-open');
  image.style.backgroundImage = imageElement.src;
}


const lightbox = document.querySelector('.lightbox');

function onModalClick(event){
  event.preventDefault();
  const clickOnImage = event.target.classList.contains("gallery__image");
  if(!clickOnImage) {
    return
  }
      lightbox.classList.add('is-open');
      lightbox.querySelector('.lightbox__image').src = event.target.dataset.source;
      lightbox.querySelector('.lightbox__image').alt = event.target.alt;
}

galleryList.addEventListener('click', onModalClick);


  function onCloseModal() {
  const openModal = document.querySelector(".js-lightbox.is-open");
    if(openModal) {
      lightbox.classList.remove('is-open');
    }
    lightbox.querySelector('.lightbox__image').src = "";
    lightbox.querySelector('.lightbox__image').alt = "";
    lightbox.querySelector('.lightbox__image').dataset.source = "";
  }
  
  closeModalButton.addEventListener('click', onCloseModal);


  function onOverlayClick(event){
    if(event.target === event.currentTarget){
      onCloseModal();
    };
  }

  overlay.addEventListener('click', onOverlayClick);
  
  
  function pressEscOnOpenModal(event) {
    if (event.key === "Escape") {
      onCloseModal();
    }
  }

  document.addEventListener('keydown', pressEscOnOpenModal);