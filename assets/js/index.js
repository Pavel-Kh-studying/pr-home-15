'use strict';

const cardContainer = document.getElementById('root');

const cardCollection = responseData.map((person) => createPersonCardElement(person));

cardContainer.append(...cardCollection);

function createPersonCardElement(person) {
  const { firstName, lastName, contacts: [...links] } = person;

  const h2 = createElement('h2', { classNames: ['personName'] }, [
    document.createTextNode(firstName.concat(' ', lastName)),
  ]);

  const p = createElement('p', { classNames: ['paragraph'] }, [
    document.createTextNode('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam volutpat, magna a commodo dictum, eros magna tincidunt augue, et convallis metus erat quis metus. Morbi vel metus consequat, iaculis enim at, tempus nibh. Proin ac varius lorem, sed dignissim nulla. Nulla non iaculis mi. Maecenas in consectetur nunc, a lobortis ante. Etiam vel urna maximus, pretium sem nec, rutrum sapien. Mauris pellentesque, dui sed sagittis pretium, libero'),
  ]);

  const div = createElement('div', { classNames: ['linksContainer'] }, []);


// ==========================================================================================

  const personContacts = new Map();

  for (let i = 0; i < links.length; i++) {
    let url = new URL(links[i]);
    personContacts.set(url.hostname, links[i]);
  }

  let i = 0;

  for (const iter of personContacts) {
    const a = createElement('a', { classNames: ['socialLink'] }, []);

    if (iter[0] === 'www.facebook.com') {
      createLink('./assets/images/facebook.svg', 'facebook', a)
    } else 
    if (iter[0] === 'www.instagram.com') {
      createLink('./assets/images/instagram.svg', 'instagram', a)
    } else
    if (iter[0] === 'twitter.com') {
      createLink('./assets/images/twitter.svg', 'twitter', a)
    } 

    i++;
  }

  function createLink(src, alt, a) {
    const img = createElement('img', { classNames: ['linkImg'] }, []);
    img.setAttribute('src', src);
    img.setAttribute('alt', alt);
    a.setAttribute('href', links[i]); 
    a.append(img);
    div.append(a);
  }

// ==========================================================================================


  const img = createPersonImage(person);

  const article = createElement('article', { classNames: ['cardContainer'] }, [
    img,
    h2,
    p,
    div,
  ]);

  const li = createElement('li', { classNames: ['cardWrapper'] }, [
    article,
  ]);

  return li;
}

function createElement(tagName, { classNames }, children) {
  const elem = document.createElement(tagName);
  elem.classList.add(...classNames);
  elem.append(...children);
  return elem;
}

function createPersonImage(person) {
  const { firstName, id } = person;

  const imageWrapper = document.createElement('div');
  imageWrapper.setAttribute('id', `wrapper${id}`); 
  imageWrapper.classList.add('imageWrapper');
  imageWrapper.style.backgroundColor = stringToColour(firstName);

  const initials = document.createElement('div');
  initials.classList.add('imagePlaceholder', 'imagePlacement');
  initials.append(document.createTextNode(firstName[0] || ''));
  

  createImage(person);

  imageWrapper.append(initials);
  return imageWrapper;
}

function createImage({ id, firstName, lastName, profilePicture }) {
  const img = document.createElement('img'); 
  img.setAttribute('src', profilePicture);
  img.setAttribute('alt', firstName.concat(' ', lastName));
  img.dataset.id = id;
  img.classList.add('personImage', 'imagePlacement');
  img.addEventListener('error', imageErrorHandler);
  img.addEventListener('load', imageLoadHandler);
}

function imageErrorHandler({ target }) {
  target.remove();
}

function imageLoadHandler({
  target: {
    dataset: { id },
  },
  target,
}) {
  document.getElementById(`wrapper${id}`).append(target);
}

// DONT TRUST THIS CODE. TAKEN FROM STACKOVERFLOW
function stringToColour(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}
