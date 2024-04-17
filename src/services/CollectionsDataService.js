import http from "../http-common";

class CollectionsDataService {
  getAll() {
    return http.get("/collections");
  }

  get(id) {
    return http.get(`/collections/${id}`);
  }

  create(data) {
    return http.post("/collections", data);
  }

  update(id, data) {
    return http.put(`/collections/${id}`, data);
  }

  delete(id) {
    return http.delete(`/collections/${id}`);
  }

  deleteRecord(title) {
    console.log(title);
    return http.delete(`/collections/record?title=${title}`);
  }

  deleteAll() {
    return http.delete(`/collections`);
  }

  findByTitle(title) {
    return http.get(`/collections?title=${title}`);
  }
}

export default new CollectionsDataService();
