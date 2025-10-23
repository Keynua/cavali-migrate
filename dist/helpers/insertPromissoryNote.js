"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertPromissoryNote = void 0;
const insertPromissoryNote = async (host, apiKey, authorization, batchId, contractId, promissoryNote) => {
    let result;
    while (!result) {
        const response = await fetch(`https://${host}/cavali/v1/promissory-note`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey,
                Authorization: authorization,
            },
            body: JSON.stringify({ batchId, contractId, promissoryNote }),
        });
        const body = (await response.json());
        if (body.message !== "Endpoint request timed out") {
            result = body;
        }
    }
    return result;
};
exports.insertPromissoryNote = insertPromissoryNote;
//# sourceMappingURL=insertPromissoryNote.js.map