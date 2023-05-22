import api from "./api2";

class ArticleService {
  create(article) {
    return api
      .post("/article", {
        title: article.title,
        section: article.section,
        category: article.category,
        imageUrl: article.imageUrl
      })
      .then(response => {
        console.log(response.data)
        return response.data;
      });
  }
  createSection(section) {
    return api
      .post("/article/section", {
        title: section.title,
        content: section.content,
        imageUrl: section.imageUrl
      })
      .then(response => {
        console.log(response);
        return response.data;
      });
  }
  upload(article) {
    let formData = new FormData();

    formData.append("file", article);

    return api
      .post("/aws/upload", formData, 
      {
        headers: { 
          "section-Type": "multipart/form-data" }

      })
      .then(response => {
        console.log(response);
        return response.data;
      });
  }
  loadArticle() {
    return api.get("/article")
      .then(response => {
     
        return response.data;
      })
  }
  loadCategory() {
    return api.get("/category")
      .then(response => {
        return response.data;
      })
  }
  comment(comment) {
    return api
      .post("/article/comment/" + comment.id, {
        section: comment.section
      })
      .then(response => {
        return response.data;
      });
  }
  like(id) {
    return api
      .post("/article/like/" + id, {})
      .then(response => {
        return response.data;
      });
  }

  edit(article) {
    return api
      .post("/article/edit/" + article.id, {
        title: article.title,
        section: article.section,
        category: article.category,
        imageUrl: article.imageUrl
      })
      .then(response => {
        return response.data;
      });
  }
  delete(id) {
    return api
      .delete("/article/" + id, {})
      .then(response => {
        return response.data;
      });
  }

  editSection(section) {
    return api
      .post("/article/section/edit/" + section.id, {
        title: section.title,
        content: section.content,
        imageUrl: section.imageUrl
      })
      .then(response => {
        console.log(response);
        return response;
      });
  }

}

export default new ArticleService();