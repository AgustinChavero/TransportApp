"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const connection_1 = require("../../../connection/connection");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
const { FRONT_URL } = process.env;
passport_1.default.use(
  new passport_google_oauth20_1.Strategy(
    {
      clientID: "413100398306-qhc30n7vdf81seedk3o8bckqrlisu86d.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: `https://api-urban.onrender.com/login/auth/google`,
    },
    (accessToken, refreshToken, profile, done) =>
      __awaiter(void 0, void 0, void 0, function* () {
        try {
          let user = yield connection_1.db.collection("users").doc(profile.id).get();
          if (!user.exists) {
            user = yield connection_1.db
              .collection("users")
              .doc(profile.id)
              .set({
                email: profile.emails[0].value,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                name: profile.displayName,
                img: profile.photos[0].value,
                payments: {
                  cardNumber: "",
                  expirationDate: "",
                  securityCode: "",
                },
                history: {
                  orders: [],
                  travels: [],
                },
                cc: "",
                address: {
                  number: "",
                  street: "",
                  postalCode: "",
                  location: "",
                  state: "",
                  department: "",
                },
                nationality: "",
                phone: {
                  number: "",
                  areaCode: "",
                  displayPhone: "",
                },
                deleted: false,
              });
          }
          const payload = {
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            name: profile.displayName,
            img: profile.photos[0].value,
            id: profile.id,
          };
          done(null, payload);
        } catch (error) {
          console.log(error);
          done(error);
        }
      })
  )
);
router.get("/", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
router.get("/", (req, res) => {
  const { user } = req;
  const token = jsonwebtoken_1.default.sign(user, "clavemegasecreta");
  // res.redirect(`http://localhost:3001/home?token=${token}`);
  res.redirect(`https://urban-movi.vercel.app/home?token=${token}`);
});
exports.default = router;
