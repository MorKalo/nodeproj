// emp-repo.js
const connectedKnex = require('./knex-connector');

function getAllReports() {
    return connectedKnex('reports').select('*');
}

function getReportsById(id) {
    return connectedKnex('reports').select('*').where('id', id).first();
}

function addReport(rep) {
    return connectedKnex("reports").insert(rep);
}

function updateReport(rep, id) {
    return connectedKnex("reports").where('id', id).update(rep);
}

function deleteReport(id) {
    return connectedKnex("reports").where('id', id).del()
}

module.exports = {
    getReportsById,
    getAllReports,
    addReport,
    updateReport,
    deleteReport
}