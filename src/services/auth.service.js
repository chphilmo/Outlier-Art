import api from "./api2";
import TokenService from "./token.service";

class AuthService {
  login({ username, password }) {
    return api
      .post("/auth/signin", {
        username,
        password
      })
      .then((response) => {
        if (response.data.accessToken) {
          TokenService.setUser(response.data);
        }

        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
  }

  register({ username, email, password }) {
    return api.post("/auth/signup", {
      username,
      email,
      password
    });
  }
  getNonce({ address }) {
    return api.get("/auth/web3/nonce/" + address, {})
    .then((response) => {
      return response.data;
      })
      .catch((error) => console.log(error
          
      ))
  }
  isWeb3Registered({ address }) {
    return api.get("/auth/web3/" + address, {});
  }
  registerWeb3({ address }) {
    return api.post("/auth/web3", {
      address
    });
  }
  web3Login( { address, nonce } , signature) {
    return api
      .post("/auth/web3/login", {
        address,
        nonce,
        signature
      })
      .then((response) => {
        if (response.data.accessToken) {
          TokenService.setUser(response.data);
        }

        return response.data;
      });
  }

  editProfile(user) {
    return api
      .post("/auth/editprofile", {
        id: user.id,
        username: user.username,
        email: user.email,
        imageUrl: user.imageUrl,
        bio: user.bio,
        website: user.website,
        twitter: user.twitter,
      })
      .then(response => {

        let loadedUser = localStorage.getItem('user');

        loadedUser = loadedUser ? JSON.parse(loadedUser) : {};

        loadedUser['username'] = response.data.username;
        loadedUser['email'] = response.data.email;
        loadedUser['imageUrl'] = response.data.imageUrl;
        loadedUser['bio'] = response.data.bio;
        loadedUser['website'] = response.data.website;
        loadedUser['twitter'] = response.data.twitter;

        localStorage.setItem('user', JSON.stringify(loadedUser));

        console.log(response.data);
        return response.data;
      });
  }

  upload(matter) {
    let formData = new FormData();

    formData.append("file", matter);

    return api
      .post("/matter/img", formData, 
      {
        headers: {
          "Content-Type": "multipart/form-data" }

      })
      .then(response => {
        return response.data;
      });
  }

  verifyToken() {
    return api
      .get("/auth/verifytoken")
      .then((response) => {
       
        return response;
      });
  }

  sendVerify() {
    return api.post("/auth/verifymail", {})
      .then(response => {
        return response.data;
      });
      
  }

  deleteUserById(id) {
    return api
      .delete("/auth/delete/" + id, {})
      .then(response => {
        return response.data;
      });
  }

  fetchCreators() {
    return api.get("/auth/creators", {})
      .then(response => {
        return response.data;
      }
      );

  }

  deleteUser() {
    return api
      .delete("/auth/delete")
      .then(response => {
        TokenService.removeUser();
        return response.data;
      });
  }

}

export default new AuthService();