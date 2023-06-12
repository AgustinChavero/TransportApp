"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocations = exports.getPassageById = exports.getAllPassages = void 0;
const connection_1 = require("../../connection/connection");
const http_errors_1 = __importDefault(require("http-errors"));
/**
 * Funcion que traer los pasajes con opciones de filtrado por query
 * @query page: numero de pagina
 * @query pageSize: numero de pasajes por pagina
 * @query origin: origen del pasaje
 * @query destination: destino del pasaje
 *  @query departureDate: fecha de partida del pasaje
 * @query arrivalDate: fecha de llegada del pasaje
 *  */
const getAllPassages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.query, { page = 1, pageSize = 5 } = _a, filters = __rest(_a, ["page", "pageSize"]);
        const startIndex = (Number(page) - 1) * Number(pageSize);
        const endIndex = Number(page) * Number(pageSize);
        let passagesRef = connection_1.db.collection("passages");
        if (Object.keys(filters).length > 0) {
            Object.keys(filters).forEach((key) => {
                passagesRef = passagesRef.where(key, "==", filters[key]);
            });
        }
        passagesRef = passagesRef.where("deleted", "==", false);
        const totalPassagesSnapshot = yield passagesRef.get();
        if (totalPassagesSnapshot.empty) {
            throw (0, http_errors_1.default)(404, "No se encontraron pasajes");
        }
        const totalFilteredPassages = totalPassagesSnapshot.size;
        const totalPages = Math.ceil(totalFilteredPassages / Number(pageSize));
        const passagesData = yield Promise.all(totalPassagesSnapshot.docs.slice(startIndex, endIndex).map((doc) => __awaiter(void 0, void 0, void 0, function* () {
            const passageData = Object.assign({ id: doc.id }, doc.data());
            // Obtener información de la compañía
            const companyId = passageData.companyId;
            const companyDoc = yield connection_1.db.collection("companies").doc(companyId).get();
            const companyData = companyDoc.exists ? companyDoc.data() : null;
            return Object.assign(Object.assign({}, passageData), { companyId, companyData: companyData });
        })));
        res.json({ passages: passagesData, totalPages });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllPassages = getAllPassages;
const getPassageById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const passageDoc = yield connection_1.db.collection("passages").doc(id).get();
        if (!passageDoc.exists) {
            throw (0, http_errors_1.default)(404, "Pasaje no encontrado");
        }
        const passage = Object.assign({ id: passageDoc.id }, passageDoc.data());
        const passageSnapshot = passageDoc.data();
        const companyDoc = yield connection_1.db.collection("companies").doc(passageSnapshot.companyId).get();
        if (!companyDoc.exists) {
            throw (0, http_errors_1.default)(404, "Compañía no encontrada");
        }
        const companyData = companyDoc.data();
        const passageWithCompanyData = Object.assign(Object.assign({}, passage), { companyData });
        res.json(passageWithCompanyData);
    }
    catch (error) {
        next(error);
    }
});
exports.getPassageById = getPassageById;
const getLocations = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passagesRef = connection_1.db.collection("passages");
        const passagesSnapshot = yield passagesRef.get();
        const passagesData = passagesSnapshot.docs.map((doc) => doc.data());
        const destinationsSet = new Set();
        const originsSet = new Set();
        passagesData.forEach((passage) => {
            const destination = passage.destination;
            const origin = passage.origin;
            if (destination) {
                destinationsSet.add(destination);
            }
            if (origin) {
                originsSet.add(origin);
            }
        });
        const combinedSet = new Set([...destinationsSet, ...originsSet]);
        const locations = Array.from(combinedSet);
        if (locations.length === 0) {
            throw (0, http_errors_1.default)(404, "No se encontraron resultados...");
        }
        res.json({ locations: locations });
    }
    catch (error) {
        next(error);
    }
});
exports.getLocations = getLocations;
