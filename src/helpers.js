export function darkSky(url, onRequestSuccess, onRequestFailure) {
  fetch(url)
    .then(res => {
      if (!res.ok) {
        console.log('error', res);
      }
      return res;
    }).catch(error => {
      throw error;
    })
    .then(res => {
      return res.json()
    })
    .then((json) => {
      onRequestSuccess(json);
    }).catch((error) => {
      const response = error.response;

      if (response === undefined) {
        onRequestFailure(error);
      } else {
        error.status = response.status;
        error.statusText = response.statusText;
        response.text().then(text => {
          try {
            const json = JSON.parse(text);
            error.message = json.message;
          } catch (ex) {
            error.message = text;
          }
            onRequestFailure(error);
        });
      }
    });
}

export function convertUnixToDate(time) {
  if (time) {
    const unixTime = time * 1000;
    const day = new Date(unixTime).toLocaleString('en-US', { weekday: 'short' });
    const monthDay = new Date(unixTime).toLocaleString('en-US', { month: 'short', day: 'numeric' });
    const date = [day, monthDay];

    return date;
  }
}
