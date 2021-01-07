import http from "../http-common";

class blogservice {
    getAll() {
        return http.get("/read");
    }
    get(id) {
        return http.get(`/read/${id}`);
    }
    findByTitle(title) {
        return http.get(`/read?title=${title}`);
    }
    create(data) {
        return http.post("/blog", data);
    }
    update(id, data) {
        return http.put(`/read/${id}`, data);
    }
    delete(id) {
        return http.delete(`/read/${id}`);
    }
}
export default new blogservice();