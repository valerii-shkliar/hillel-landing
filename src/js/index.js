const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.advent-calendar-body .wrapper .modal-container');
const modalTitle = document.querySelector(
  '.advent-calendar-body .wrapper .modal-container .title-container .title'
);
const modalText = document.querySelector('.advent-calendar-body .wrapper .modal-container .text');
const modalImage = document.querySelector(
  '.advent-calendar-body .wrapper .modal-container .title-container .book-cover'
);
const houseContainer = document.querySelector('.advent-calendar-body .wrapper .house-container');
const cardItems = document.querySelectorAll(
  '.advent-calendar-body .wrapper .house-container .card-item'
);

const buyBookBtn = document.querySelector(
  '.advent-calendar-body .wrapper .modal-container .btn-container .buy-book-btn'
);
const ACTIVE_CLASS = 'active';
const CLICKED_CLASS = 'clicked';
const CARD_ITEM_CLASS = 'card-item';
const DISABLE_EVENTS_CLASS = 'disable-events';

buyBookBtn.addEventListener('click', onBuyBookBtnClick);
houseContainer.addEventListener('click', onHouseContainerClick);
overlay.addEventListener('click', onHouseOverlayClick);

function onBuyBookBtnClick() {
  overlay.classList.remove(ACTIVE_CLASS);
  modalContainer.classList.remove(ACTIVE_CLASS);
}

function onHouseContainerClick(e) {
  console.log(e.target);
  const cardItemClicked = e.target.closest('.' + CARD_ITEM_CLASS);

  if (cardItemClicked) {
    const itemNumber = cardItemClicked.getAttribute('data-item-number');
    const cardPicture = cardItemClicked.querySelector(
      '.advent-calendar-body .wrapper .house-container .card-item .card'
    );
    const book = findBookByAttr(itemNumber);

    fillModalWindow(book);
    cardItemClicked.classList.add(CLICKED_CLASS);
    cardItems.forEach((cardItem) => cardItem.classList.add(DISABLE_EVENTS_CLASS));
  }
}

function onHouseOverlayClick(e) {
  console.log(e.target);

  closeModal();
  cardItems.forEach((cardItem) => cardItem.classList.remove(DISABLE_EVENTS_CLASS));
}

function findBookByAttr(itemNumber) {
  return booksList.find((book) => book.id === itemNumber);
}

function fillModalWindow(book) {
  const titleStr = book.author + ' “' + book.title + '”';
  const bookPath = `./dist/images/books-covers/book-${book.id}.png`;

  modalText.innerHTML = book.text;
  modalTitle.innerHTML = titleStr;
  modalImage.src = bookPath;
  buyBookBtn.href = book.link;

  openModal();
}

function openModal() {
  modalContainer.classList.add(ACTIVE_CLASS);
  overlay.classList.add(ACTIVE_CLASS);
}

function closeModal() {
  modalContainer.classList.remove(ACTIVE_CLASS);
  overlay.classList.remove(ACTIVE_CLASS);
}

new Snow({
  showSnowBalls: false,
  showSnowBallsIsMobile: false,
  iconColor: '#fff6e3',
  iconSize: '30px',
});
