const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-14',
    headers: {
        authorization: 'b7b7957f-394b-49b0-b80c-2ff9edca68da',
        'Content-Type': 'application/json'
    }
}

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
      .then(res => {
        if (res.ok) return res.json();
        
        return Promise.reject(`Ошибка: ${res.status}`);
      });
} 

//get profile info
export const getProfileInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(res => {
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}


export const deleteCardRequest = (card) => {
    return fetch(`${config.baseUrl}/cards/${card._id}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(res => {
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const likePutRequest = (card) => {
    return fetch(`${config.baseUrl}/cards/likes/${card._id}`, {
        method: 'PUT',
        headers: config.headers
      })
      .then(res => {
          if (res.ok) return res.json();
          return Promise.reject(`Ошибка: ${res.status}`);
      })
}

export const likeDeleteRequest = (card) => {
    return fetch(`${config.baseUrl}/cards/likes/${card._id}`, {
        method: 'DELETE',
        headers: config.headers
      })
      .then(res => {
          if (res.ok) return res.json();
          return Promise.reject(`Ошибка: ${res.status}`);
      })
}

export const addCardRequest = (cardName, cardUrl) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: cardName.value,
            link: cardUrl.value
        })
    })
    .then(res => {
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const editProfileRequest = (popupName, popupDescription) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: popupName.value,
            about: popupDescription.value
        })
    })
    .then(res => {
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const editAvatarRequest = (popupUrl) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: popupUrl.value
        })
    })
    .then(res => {
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}
