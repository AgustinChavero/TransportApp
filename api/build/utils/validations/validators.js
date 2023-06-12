"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isChauffeurIdValid = exports.isTravelStatusValid = exports.isDeletedValid = exports.isTravelTravelValid = exports.isProductTypeValid = exports.isStockValid = exports.isDescriptionValid = exports.isDestinationValid = exports.isPriceValid = exports.isNumberSeatValid = exports.isDurationValid = exports.isArrivalDateValid = exports.isArrivalTimeValid = exports.isDepartureTimeValid = exports.iCheckInValid = exports.isDepartureDateValid = exports.isDateValid = exports.areVehiclesIdValid = exports.isPassageIdValid = exports.isLocalIdValid = exports.isCompanyIdValid = exports.isProductIdValid = exports.isCommentValid = exports.isRatingValid = exports.isDistributorIdValid = exports.isUserIdValid = exports.arePaymentsValid = exports.isVehicleTypeValid = exports.isArrayImgValid = exports.isImgValid = exports.isTypeChauffeurValid = exports.isLicenseValid = exports.isPassportValid = exports.isBirthdayValid = exports.isNationalityValid = exports.isDisplayNameValid = exports.isGenderValid = exports.isCeValid = exports.isCcValid = exports.isPhoneValid = exports.isAddressValid = exports.isEmailValid = exports.isPasswordValid = exports.isFirstNameValid = exports.isNameValid = exports.validateNewRatingAndComment = exports.validateNewCompany = exports.validateNewPassage = exports.validateDataUpdatedUser = exports.validateDataNewUser = void 0;
exports.isPassengersDataValid = exports.isQuantityValid = exports.isValidNumberSeat = exports.isServiceValid = exports.isTypeVehicleValidByDealer = exports.isTypeVehicleValidByChauffeur = exports.isVehicleToChauffeurValid = exports.isYearValid = exports.isModelValid = exports.isBrandValid = exports.isPatentValid = exports.isVehiclesIdValid = exports.isOwnerIdValid = exports.isOcupationValid = exports.isOriginValid = exports.isDealerIdValid = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const joi_1 = __importDefault(require("joi"));
const messages = {
    "string.base": "El valor {#label} debe ser una cadena de texto",
    "string.email": "El correo electrónico no es válido",
    "string.max": "El valor de {#label} no puede tener más de {#limit} caracteres",
    "string.min": "El valor de {#label} no puede tener menos de {#limit} caracteres",
    "string.empty": "El valor de {#label} no puede estar vacío",
    "string.valid": "El valor de {#label} no es válido",
    "number.base": "El valor {#label} debe ser un numero",
    "number.min": "El valor de {#label} no puede ser menor a {#limit}",
    "number.max": "El valor de {#label} no puede ser mayor a {#limit}",
};
const validateDataNewUser = (data) => {
    const userSchema = joi_1.default.object({
        firstName: joi_1.default.string().required().max(1).messages(messages),
        lastName: joi_1.default.string().required().max(1).messages(messages),
        password: joi_1.default.string().required().messages(messages),
        email: joi_1.default.string().email().required().messages(messages),
    });
    return userSchema.validate(data);
};
exports.validateDataNewUser = validateDataNewUser;
const validateDataUpdatedUser = (data) => {
    const userSchema = joi_1.default.object({
        cc: joi_1.default.string().max(8).messages(messages),
        gender: joi_1.default.string().valid("masculino", "femenino", "prefiero no decir").messages(messages),
        address: joi_1.default.object({
            postalCode: joi_1.default.string().required().messages(messages),
            location: joi_1.default.string().required().messages(messages),
            state: joi_1.default.string().required().messages(messages),
            street: joi_1.default.string().required().messages(messages),
            number: joi_1.default.string().required().messages(messages),
            department: joi_1.default.string().required().messages(messages),
        })
            .required()
            .messages(messages),
        phone: joi_1.default.object({
            areaCode: joi_1.default.string().required().messages(messages),
            number: joi_1.default.string().required().messages(messages),
        }),
    });
    return userSchema.validate(data);
};
exports.validateDataUpdatedUser = validateDataUpdatedUser;
const validateNewPassage = (data) => {
    const passageSchema = joi_1.default.object({
        origin: joi_1.default.string().required().max(20).messages(messages),
        stock: joi_1.default.number().required().messages(messages),
        destination: joi_1.default.string().required().min(5).max(50).messages(messages),
        departureDate: joi_1.default.string().required().messages(messages),
        arrivalDate: joi_1.default.string().required().messages(messages),
        duration: joi_1.default.string().required().messages(messages),
        price: joi_1.default.number().required().messages(messages),
        departureTime: joi_1.default.string().required().messages(messages),
        arrivalTime: joi_1.default.string().required().messages(messages),
        companyId: joi_1.default.string().required().messages(messages),
        service: joi_1.default.string().valid("cama", "semi cama", "cama ejecutivo").messages(messages),
        numberSeat: joi_1.default.array().items(joi_1.default.string().min(1).max(2)).required().messages(messages),
    }).options({ abortEarly: false });
    return passageSchema.validate(data);
};
exports.validateNewPassage = validateNewPassage;
const validateNewCompany = (data) => {
    const companySchema = joi_1.default.object({
        name: joi_1.default.string().required().min(5).max(20).messages(messages),
    }).options({ abortEarly: false });
    return companySchema.validate(data);
};
exports.validateNewCompany = validateNewCompany;
const validateNewRatingAndComment = (data) => {
    const ratingAndCommentSchema = joi_1.default.object({
        rating: joi_1.default.number().min(1).max(5).required().messages(messages),
        comment: joi_1.default.string().min(5).max(50).messages(messages),
    }).options({ abortEarly: false });
    return ratingAndCommentSchema.validate(data);
};
exports.validateNewRatingAndComment = validateNewRatingAndComment;
const isNameValid = (req, res) => {
    const name = req.body.lastName;
    if (typeof name !== "string") {
        throw (0, http_errors_1.default)(400, "El nombre debe ser una cadena de texto");
    }
    if (name.length > 50) {
        throw (0, http_errors_1.default)(400, "El nombre no puede tener más de 50 caracteres");
    }
};
exports.isNameValid = isNameValid;
const isFirstNameValid = (req, res) => {
    const name = req.body.firstName;
    if (typeof name !== "string") {
        throw (0, http_errors_1.default)(400, "El nombre debe ser una cadena de texto");
    }
    if (name.length > 50) {
        throw (0, http_errors_1.default)(400, "El nombre no puede tener más de 50 caracteres");
    }
};
exports.isFirstNameValid = isFirstNameValid;
const isPasswordValid = (req, res) => {
    const password = req.body.password;
    if (typeof password !== "string") {
        throw (0, http_errors_1.default)(400, "La contraseña debe ser una cadena de texto");
    }
    if (password.length > 50) {
        throw (0, http_errors_1.default)(400, "La contraseña no puede tener más de 50 caracteres");
    }
};
exports.isPasswordValid = isPasswordValid;
const isEmailValid = (req, res) => {
    const email = req.body.email;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (typeof email !== "string") {
        throw (0, http_errors_1.default)(400, "El correo debe ser una cadena de texto");
    }
    if (!emailRegex.test(email)) {
        throw (0, http_errors_1.default)(400, "El correo no es válido");
    }
};
exports.isEmailValid = isEmailValid;
const isAddressValid = (req, res) => {
    const address = req.body.address;
    const allowProperties = ["postalCode", "location", "state", "street", "number", "department"];
    if (typeof address === "object" &&
        Object.keys(address).every((key) => allowProperties.includes(key)) &&
        Object.values(address).every((value) => typeof value === "string")) {
        return; // Sin errores
    }
    throw (0, http_errors_1.default)(400, "La dirección no es válida");
};
exports.isAddressValid = isAddressValid;
const isPhoneValid = (req, res) => {
    const phone = req.body.phone;
    const allowProperties = ["number", "areaCode"];
    if (typeof phone === "object" &&
        Object.keys(phone).every((key) => allowProperties.includes(key)) &&
        Object.values(phone).every((value) => typeof value === "string")) {
        return; // Sin errores
    }
    throw (0, http_errors_1.default)(400, "El teléfono no es válido");
};
exports.isPhoneValid = isPhoneValid;
const isCcValid = (req, res) => {
    const cc = req.body.cc;
    if (typeof cc !== "string") {
        throw (0, http_errors_1.default)(400, "El cc debe ser una cadena de texto");
    }
    if (cc.length > 8) {
        throw (0, http_errors_1.default)(400, "El cc no puede tener más de 8 caracteres");
    }
};
exports.isCcValid = isCcValid;
const isCeValid = (req, res) => {
    const ce = req.body.ce;
    if (typeof ce !== "string") {
        throw (0, http_errors_1.default)(400, "El ce debe ser una cadena de texto");
    }
    if (ce.length > 8) {
        throw (0, http_errors_1.default)(400, "El ce no puede tener más de 8 caracteres");
    }
};
exports.isCeValid = isCeValid;
const isGenderValid = (req, res) => {
    const gender = req.body.gender;
    if (gender !== "male" && gender !== "female") {
        throw (0, http_errors_1.default)(400, "El género debe ser 'male' o 'female'");
    }
};
exports.isGenderValid = isGenderValid;
const isDisplayNameValid = (displayName) => {
    if (typeof displayName === "string" && displayName.length <= 50)
        return null;
    return "El nombre de usuario no es válido";
};
exports.isDisplayNameValid = isDisplayNameValid;
const isNationalityValid = (req, res) => {
    const nationality = req.body.nationality;
    if (typeof nationality !== "string") {
        throw (0, http_errors_1.default)(400, "La nacionalidad debe ser una cadena de texto");
    }
    if (nationality.length > 50) {
        throw (0, http_errors_1.default)(400, "La nacionalidad no puede tener más de 50 caracteres");
    }
};
exports.isNationalityValid = isNationalityValid;
const isBirthdayValid = (req, res) => {
    const birthday = req.body.birthday;
    if (typeof birthday !== "object") {
        throw (0, http_errors_1.default)(400, "La fecha de nacimiento debe ser una fecha");
    }
    if (birthday.getFullYear() < 1900) {
        throw (0, http_errors_1.default)(400, "La fecha de nacimiento no puede ser anterior a 1900");
    }
};
exports.isBirthdayValid = isBirthdayValid;
const isPassportValid = (passport) => {
    if (typeof passport === "string" && passport.length <= 50)
        return null;
    return "El pasaporte no es válido";
};
exports.isPassportValid = isPassportValid;
// IMPORTANTE! comprobar el formato de las licencias de Colombia
//actualmente permite string entre 5 y 20 caracteres
const isLicenseValid = (license) => {
    if (typeof license === "string" && license.length >= 5 && license.length <= 20)
        return null;
    return "La licencia no es válida";
};
exports.isLicenseValid = isLicenseValid;
const isTypeChauffeurValid = (typeChauffeur) => {
    if (typeof typeChauffeur === "string" && typeChauffeur.length <= 50)
        return null;
    return "El tipo de chauffeur no es válido";
};
exports.isTypeChauffeurValid = isTypeChauffeurValid;
// string de entre 5 y 1000 caracteres (por si se usan links)
const isImgValid = (img) => {
    if (typeof img === "string" && img.length >= 5 && img.length <= 1000)
        return null;
    return "La imagen no es válida";
};
exports.isImgValid = isImgValid;
const isArrayImgValid = (imgs) => {
    if (imgs.every((i) => typeof i === "string"))
        return null;
    return "La imagen no es válida";
};
exports.isArrayImgValid = isArrayImgValid;
// string de entre 5 y 50 caracteres
const isVehicleTypeValid = (vehicleType) => {
    if (typeof vehicleType === "string" && vehicleType.length >= 5 && vehicleType.length <= 50)
        return null;
    return "El tipo de vehículo no es válido";
};
exports.isVehicleTypeValid = isVehicleTypeValid;
// IMPORTANTE! => por ahora solo verifica que es un objeto (falta definir el formato)
const arePaymentsValid = (payments) => {
    const allowProperties = ["cardNumber", "expirationDate", "securityCode"];
    if (typeof payments === "object" &&
        Object.keys(payments).every((key) => allowProperties.includes(key)) &&
        Object.values(payments).every((value) => typeof value === "string")) {
        return null;
    }
    return "Los pagos no son válidos";
};
exports.arePaymentsValid = arePaymentsValid;
const isUserIdValid = (req, res) => {
    const userId = req.body.userId;
    if (typeof userId !== "string") {
        throw (0, http_errors_1.default)(400, "El id del usuario no es válido");
    }
};
exports.isUserIdValid = isUserIdValid;
const isDistributorIdValid = (dealerId) => {
    if (typeof dealerId === "string")
        return null;
    return "El id del distribuidor no es válido";
};
exports.isDistributorIdValid = isDistributorIdValid;
const isRatingValid = (rating) => {
    if (typeof rating === "number" && rating >= 0 && rating <= 5)
        return null;
    return "El rating no es válido";
};
exports.isRatingValid = isRatingValid;
const isCommentValid = (comment) => {
    if (typeof comment === "string" && comment.length <= 200)
        return null;
    return "El comentario no es válido";
};
exports.isCommentValid = isCommentValid;
const isProductIdValid = (productId) => {
    if (typeof productId === "string")
        return null;
    return "El id del producto no es válido";
};
exports.isProductIdValid = isProductIdValid;
const isCompanyIdValid = (req, res) => {
    const companyId = req.body.companyId;
    if (typeof companyId !== "string") {
        throw (0, http_errors_1.default)(400, "El id de la compañía no es válido");
    }
};
exports.isCompanyIdValid = isCompanyIdValid;
const isLocalIdValid = (localId) => {
    if (typeof localId === "string")
        return null;
    return "El id del local no es válido";
};
exports.isLocalIdValid = isLocalIdValid;
const isPassageIdValid = (req, res) => {
    const passageId = req.body.passageId;
    if (typeof passageId !== "string") {
        throw (0, http_errors_1.default)(400, "El id del pasaje no es válido");
    }
};
exports.isPassageIdValid = isPassageIdValid;
const areVehiclesIdValid = (vehiclesId) => {
    if (vehiclesId.every((id) => typeof id === "string"))
        return null;
    return "El id del vehículo no es válido";
};
exports.areVehiclesIdValid = areVehiclesIdValid;
//IMPORTANTE: definir formato de fecha
const isDateValid = (date) => {
    if (typeof date === "string")
        return null;
    return "La fecha no es válida";
};
exports.isDateValid = isDateValid;
const isDepartureDateValid = (req, res) => {
    const departureDate = req.body.departureDate;
    if (typeof departureDate !== "string") {
        throw (0, http_errors_1.default)(400, "La fecha de salida no es válida");
    }
};
exports.isDepartureDateValid = isDepartureDateValid;
const iCheckInValid = (checkIn) => {
    if (typeof checkIn === "string")
        return null;
    return "El check in no es válido";
};
exports.iCheckInValid = iCheckInValid;
const isDepartureTimeValid = (req, res) => {
    const departureTime = req.body.departureTime;
    if (typeof departureTime !== "string") {
        throw (0, http_errors_1.default)(400, "La hora de salida no es válida");
    }
    return;
};
exports.isDepartureTimeValid = isDepartureTimeValid;
const isArrivalTimeValid = (req, res) => {
    const arrivalTime = req.body.arrivalTime;
    if (typeof arrivalTime !== "string") {
        throw (0, http_errors_1.default)(400, "La hora de llegada no es válida");
    }
};
exports.isArrivalTimeValid = isArrivalTimeValid;
const isArrivalDateValid = (req, res) => {
    const arrivalDate = req.body.arrivalDate;
    if (typeof arrivalDate !== "string") {
        throw (0, http_errors_1.default)(400, "La fecha de llegada no es válida");
    }
};
exports.isArrivalDateValid = isArrivalDateValid;
const isDurationValid = (req, res) => {
    const duration = req.body.duration;
    if (typeof duration !== "string") {
        throw (0, http_errors_1.default)(400, "La duración no es válida");
    }
};
exports.isDurationValid = isDurationValid;
const isNumberSeatValid = (req, res) => {
    const numberSeat = req.body.numberSeat;
    if (!Array.isArray(numberSeat)) {
        throw (0, http_errors_1.default)(400, "El nÚmero de asientos no es válido");
    }
};
exports.isNumberSeatValid = isNumberSeatValid;
const isPriceValid = (req, res) => {
    const price = req.body.price;
    if (typeof price !== "number") {
        throw (0, http_errors_1.default)(400, "El precio no es válido");
    }
};
exports.isPriceValid = isPriceValid;
const isDestinationValid = (req, res) => {
    const destination = req.body.destination;
    if (typeof destination !== "string") {
        throw (0, http_errors_1.default)(400, "La destino no es válido");
    }
    if (destination.length >= 5 && destination.length <= 50) {
        throw (0, http_errors_1.default)(400, "La destino no es válido");
    }
};
exports.isDestinationValid = isDestinationValid;
const isDescriptionValid = (description) => {
    if (typeof description === "string" && description.length >= 5 && description.length <= 1000)
        return null;
    return "La descripción no es válida";
};
exports.isDescriptionValid = isDescriptionValid;
const isStockValid = (req, res) => {
    const stock = req.body.stock;
    if (typeof stock !== "number")
        return;
    throw (0, http_errors_1.default)(400, "El stock no es válido");
};
exports.isStockValid = isStockValid;
//IMPORTANTE: verificar funcionamiento
const isProductTypeValid = (type) => {
    const allowProductTypes = ["food", "drink", "snack", "other", "all"];
    if (typeof type === "string" && allowProductTypes.includes(type))
        return null;
    return "El tipo de producto no es válido";
};
exports.isProductTypeValid = isProductTypeValid;
//IMPORTANTE: verificar funcionamiento
const isTravelTravelValid = (travel) => {
    const allowTravelTypes = ["food", "drink", "snack", "other", "all"];
    if (typeof travel === "string" && allowTravelTypes.includes(travel))
        return null;
    return "El tipo de viaje no es válido";
};
exports.isTravelTravelValid = isTravelTravelValid;
const isDeletedValid = (deleted) => {
    if (typeof deleted === "boolean")
        return null;
    return "El estado no es válido";
};
exports.isDeletedValid = isDeletedValid;
const isTravelStatusValid = (status) => {
    if (typeof status === "boolean")
        return null;
    return "El estado no es válido";
};
exports.isTravelStatusValid = isTravelStatusValid;
const isChauffeurIdValid = (req, res) => {
    const chauffeurId = req.body.chauffeurId;
    if (typeof chauffeurId !== "string") {
        throw (0, http_errors_1.default)(400, "El id del chofer no es válido");
    }
};
exports.isChauffeurIdValid = isChauffeurIdValid;
const isDealerIdValid = (chauffeurId) => {
    if (typeof chauffeurId === "string")
        return null;
    return "El id del chofer no es válido";
};
exports.isDealerIdValid = isDealerIdValid;
const isOriginValid = (req, res) => {
    const origin = req.body.origin;
    if (typeof origin === "string") {
        throw (0, http_errors_1.default)(400, "El origen debe ser una cadena de texto");
    }
    if (origin.length >= 5 && origin.length <= 50) {
        throw (0, http_errors_1.default)(400, "El origen debe tener entre 5 y 50 caracteres");
    }
};
exports.isOriginValid = isOriginValid;
const isOcupationValid = (ocupation) => {
    if (typeof ocupation === "string" && ocupation.length >= 5 && ocupation.length <= 50)
        return null;
    return "La ocupación no es válido";
};
exports.isOcupationValid = isOcupationValid;
const isOwnerIdValid = (ownerId) => {
    if (typeof ownerId === "string")
        return null;
    return "El id del propietario no es válido";
};
exports.isOwnerIdValid = isOwnerIdValid;
const isVehiclesIdValid = (vehiclesId) => {
    if (Array.isArray(vehiclesId))
        return null;
    return "Los id de los vehículos no son válidos";
};
exports.isVehiclesIdValid = isVehiclesIdValid;
const isPatentValid = (patent) => {
    if (typeof patent === "string" && patent.length >= 5 && patent.length <= 10)
        return null;
    return "El patente no es válido";
};
exports.isPatentValid = isPatentValid;
const isBrandValid = (brand) => {
    if (typeof brand === "string" && brand.length >= 5 && brand.length <= 50)
        return null;
    return "La marca no es válida";
};
exports.isBrandValid = isBrandValid;
const isModelValid = (model) => {
    if (typeof model === "string" && model.length >= 5 && model.length <= 50)
        return null;
    return "El modelo no es válido";
};
exports.isModelValid = isModelValid;
const isYearValid = (year) => {
    if (typeof year === "string" && year.length >= 2 && year.length <= 4)
        return null;
    return "El año no es válido";
};
exports.isYearValid = isYearValid;
const isVehicleToChauffeurValid = (vehicle) => {
    const allowProperties = ["vehicleId", "patent"];
    if (typeof vehicle === "object" &&
        Object.keys(vehicle).every((key) => allowProperties.includes(key)) &&
        Object.values(vehicle).every((value) => typeof value === "string"))
        return null;
    return "Los datos para el vehiculo no son correctos";
};
exports.isVehicleToChauffeurValid = isVehicleToChauffeurValid;
const isTypeVehicleValidByChauffeur = (value) => {
    const validTypes = ["motorcycle", "car", "bicycle"];
    if (validTypes.includes(value))
        return null;
    return "El tipo de vehiculo no es válido";
};
exports.isTypeVehicleValidByChauffeur = isTypeVehicleValidByChauffeur;
const isTypeVehicleValidByDealer = (value) => {
    const validTypes = ["motorcycle", "car", "bicycle", "van", "other"];
    if (validTypes.includes(value))
        return null;
    return "El tipo de vehiculo no es válido";
};
exports.isTypeVehicleValidByDealer = isTypeVehicleValidByDealer;
const isServiceValid = (req, res) => {
    const service = req.body.service;
    if (typeof service !== "string") {
        throw (0, http_errors_1.default)(400, "El servicio no es válido");
    }
    const validServices = ["semi cama", "cama", "cama ejecutivo"];
    if (!validServices.includes(service.toLowerCase())) {
        throw (0, http_errors_1.default)(400, "El servicio no es válido");
    }
};
exports.isServiceValid = isServiceValid;
const isValidNumberSeat = (numberSeat, stock) => {
    if (!Array.isArray(numberSeat)) {
        return "El número de asientos debe ser un array";
    }
    if (numberSeat.length !== stock) {
        return "La longitud del número de asientos debe ser igual al stock";
    }
    for (const seat of numberSeat) {
        if (typeof seat !== "string") {
            return "Cada valor del número de asientos debe ser una cadena de texto";
        }
    }
    return null; // El número de asientos es válido
};
exports.isValidNumberSeat = isValidNumberSeat;
const isQuantityValid = (req, res) => {
    const quantity = req.body.quantity;
    if (typeof quantity !== "number") {
        throw (0, http_errors_1.default)(400, "La cantidad no es válida");
    }
};
exports.isQuantityValid = isQuantityValid;
const isPassengersDataValid = (req, res) => {
    const passengersData = req.body.passengersData;
    for (const passenger of passengersData) {
        const { cc, ce } = passenger;
        (0, exports.isFirstNameValid)(req, res);
        (0, exports.isNameValid)(req, res);
        (0, exports.isNationalityValid)(req, res);
        if (cc) {
            (0, exports.isCcValid)(req, res);
        }
        if (ce) {
            (0, exports.isCeValid)(req, res);
        }
        (0, exports.isEmailValid)(req, res);
        (0, exports.isGenderValid)(req, res);
        (0, exports.isBirthdayValid)(req, res);
        (0, exports.isPhoneValid)(req, res);
    }
};
exports.isPassengersDataValid = isPassengersDataValid;
