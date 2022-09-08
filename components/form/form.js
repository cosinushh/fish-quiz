const form = document.querySelector('[data-js="newcard-form"]');
const cardList = document.querySelector('[data-js="card-list"]');
const questionInput = document.querySelector('[data-js="your-question"]');
const questionCounter = document.querySelector('[data-js="counter-question"]');
const answerInput = document.querySelector('[data-js="your-answer"]');
const answerCounter = document.querySelector('[data-js="counter-answer"]');

function createNewCard(newCardData) {
  const newCard = document.createElement("li");
  newCard.className = "card-list__item";

  const newArticle = document.createElement("article");
  newArticle.classList.add("card");
  newCard.append(newArticle);

  const newHeadline = document.createElement("h2");
  newHeadline.classList.add("card__question");
  newHeadline.setAttribute("data-js", "card-question");
  newHeadline.textContent = newCardData.question;
  newArticle.append(newHeadline);

  const newP = document.createElement("p");
  newP.classList.add("card__answer");
  newP.setAttribute("data-js", "answer");
  newP.textContent = newCardData.answer;

  const newButton = document.createElement("button");
  newButton.classList.add("card__button-answer");
  newButton.setAttribute("type", "button");
  newButton.setAttribute("data-js", "answer-button");
  newButton.textContent = "Show answer";
  newButton.addEventListener("click", () => {
    newP.classList.toggle("card__answer--active");
    if (newP.classList.contains("card__answer--active")) {
      newButton.textContent = "Hide answer";
    } else {
      newButton.textContent = "Show answer";
    }
  });

  newArticle.append(newButton);
  newArticle.append(newP);

  const newUl = document.createElement("ul");
  newUl.classList.add("card__tag-list");
  newArticle.append(newUl);

  const newLi = document.createElement("li");
  newLi.classList.add("card__tag-list-item");
  newLi.setAttribute("data-js", "card-tag");
  newLi.textContent = newCardData.tag;
  newUl.append(newLi);

  const newBookmark = document.createElement("div");
  newBookmark.classList.add("card__button-bookmark");
  newBookmark.innerHTML = `
  <button
      class="bookmark"
      aria-label="bookmark"
      type="button"
      data-js="button-bookmark"
    >
      <svg
        class="bookmark__icon"
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewbox="0 0 24 24"
        width="24px"
        fill="#000000"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
          d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"
        />
      </svg>
    </button>
  `;
  const bookmarkButton = newBookmark.querySelector(
    '[data-js="button-bookmark"]'
  );

  bookmarkButton.addEventListener("click", () => {
    bookmarkButton.classList.toggle("bookmark--active");
  });

  newArticle.append(newBookmark);

  cardList.append(newCard);
}

function countAndShowLetters(input, counter) {
  if (input.value.length === 0) {
    counter.textContent = "";
  } else {
    const n = 150 - input.value.length;
    counter.textContent = `${n} characters left`;
  }
}

questionInput.addEventListener("input", () => {
  countAndShowLetters(questionInput, questionCounter);
});

answerInput.addEventListener("input", () => {
  countAndShowLetters(answerInput, answerCounter);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  createNewCard(data);
  form.reset();
  questionInput.focus();
  questionCounter.textContent = "";
  answerCounter.textContent = "";
});
