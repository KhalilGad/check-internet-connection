let popup = document.querySelector(".popup");
let wifiIcon = document.querySelector(".icon .custom");
let popupTitle = document.querySelector(".popup .title");
let popupDesc = document.querySelector(".desc");
let btn = document.querySelector(".reconnect");
let isOnline = true,
  intervalid,
  timer = 10;
const checkConnection = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    // console.log(response);
    isOnline = response.status >= 200 && response.status < 300;
  } catch (error) {
    isOnline = false;
  }
  timer = 10;
  clearInterval(intervalid);
  handelPopup(isOnline);
};
const handelPopup = (status) => {
  if (status) {
    popupTitle.innerHTML = "Restored Connection";
    popupDesc.innerHTML =
      "Your device is now successfully connected to the internet.";
    popup.classList.add("online");
    return setTimeout(() => popup.classList.remove("show", "online"), 2000);
  } else {
    popupTitle.innerHTML = "Lost Connection";
    popupDesc.innerHTML =
      "You network is unavailable. We Wil attempt to reconnect you in <b>10</b> Seconds.";
    popup.classList.add("show");
  }
  intervalid = setInterval(() => {
    timer--;
    if (timer === 0) {
      checkConnection();
    }
    document.querySelector(".desc b").innerHTML = timer;
  }, 1000);
};

setInterval(() => isOnline && checkConnection(), 3000);
btn.addEventListener("click", checkConnection);
