import http from "../http-common";

class ProductDataService {
  getAll() {
    return http.get("/products");
  }

  get(id) {
    return http.get(`/products/${id}`);
  }

  create(data) {
    return http.post("/products", data);
  }

  update(id, data) {
    return http.put(`/products/${id}`, data);
  }

  delete(id) {
    return http.delete(`/products/${id}`);
  }

  deleteAll() {
    return http.delete(`/products`);
  }

  findByName(name) {
    return http.get(`/products?name=${name}`);
  }

  filterByPrice(price){
    // console.log(price);
    return http.get(`/products?price=${price}`);
  }

  filterByFriendly(friendliness){
    console.log(friendliness)
    return http.get(`/products?friendliness=${friendliness}`)
  }
}

export default new ProductDataService();