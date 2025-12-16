const kakaoLoginButton = document.querySelector("#kakao");
const naverLoginButton = document.querySelector("#naver");

const userImage = document.querySelector("img");
const userName = document.querySelector("#user_name");
const logoutButton = document.querySelector("#logout_btn");

function renderUserInfo(imgUrl, name) {
  userImage.src = imgUrl;
  userName.textContent = name;
}

const naverClientId = "OR7fQEIiv0rcinYZk8jC";
const naverClientSecret = "Aox_Lq6zxW";
const naverSecret = "oz_coding";
const redirectURI = "http://127.0.0.1:5500";
let naverAccessToken = "";

kakaoLoginButton.onclick = () => {
  location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${redirectURI}&response_type=code`;
};

logoutButton.onclick = () => {
  axios
    .delete("http://localhost:3000/naver/logout", {
      data: { naverAccessToken },
    })
    .then((res) => {
      renderUserInfo("", "");
    });
};

window.onload = () => {
  const url = new URL(location.href);
  const urlParams = url.searchParams;
  const authorizationCode = urlParams.get("code");
  const naverState = urlParams.get("state");

  if (authorizationCode) {
    if (naverState) {
      axios
        .post("http://localhost:3000/naver/login", {
          authorizationCode,
        })
        .then((res) => {
          naverAccessToken = res.data;
          return axios
            .post("http://localhost:3000/naver/userInfo", {
              naverAccessToken,
            })
            .then((res) => {
              console.log(res.data);
              renderUserInfo(res.data.profile_image, res.data.name);
            });
        });
    }
  }
};

naverLoginButton.onclick = () => {
  location.href = `https://nid.naver.com/oauth2.0/authorize?client_id=${naverClientId}&response_type=code&redirect_uri=${redirectURI}&state=${naverSecret}`;
};
