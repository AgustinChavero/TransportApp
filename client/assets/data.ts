// Icons NavBar
import {
  HiMenuAlt1,
  HiUserCircle,
  HiOutlineHome,
  HiOutlineBell,
  HiOutlineAnnotation,
  HiOutlineClipboardCheck,
  HiShoppingBag,
  HiOutlineInbox,
} from "react-icons/hi";
import Image from "next/image";

// Icons Footer
import sos from "./icons/sos.png";
import escudo from "./icons/escudo.png";
import planet from "./icons/planet.png";
import contract from "./icons/contract.png";
import bus from "./icons/slider/bus.png";
import carpool from "./icons/slider/carpool.png";
import delivery from "./icons/slider/delivery.png";
import emergency from "./icons/slider/emergency.png";
import mercadopago from "./icons/slider/mercadopago.png";
import { SliderItem } from "@component/app/types/Slider";
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * E X P O R T S * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

//  NavBar para renderizar elementos
export const links = [
  {
    label: "home",
    route: "/home",
    icon: HiOutlineHome,
    id: "1",
  },
  {
    label: "perfil",
    route: "/perfil",
    icon: HiUserCircle,
    id: "2",
  },
  {
    label: "notificaciones",
    route: "/home/notificaciones",
    icon: HiOutlineBell,
    id: "3",
  },
  {
    label: "ayuda",
    route: "/home/ayuda",
    icon: HiOutlineAnnotation,
    id: "4",
  },
];

//  NavBar Mobile array para renderizar elementos
export const linksMobile = [
  {
    label: "Home",
    route: "/home",
    icon: HiOutlineHome,
    id: "1",
  },
  {
    label: "Perfil",
    route: "/perfil",
    icon: HiUserCircle,
    id: "2",
  },
  {
    label: "Notificaciones",
    route: "/home/notificaciones",
    icon: HiOutlineBell,
    id: "3",
  },
  {
    label: "Ayuda",
    route: "/home/ayuda",
    icon: HiOutlineAnnotation,
    id: "4",
  },
  {
    label: "Reserva",
    route: "/home/reserva",
    icon: HiOutlineClipboardCheck,
    id: "5",
  },
  {
    label: "Paqueteria",
    route: "/home/paqueteria",
    icon: HiOutlineInbox,
    id: "6",
  },
  {
    label: "Especiales",
    route: "/home/especiales",
    icon: HiShoppingBag,
    id: "7",
  },
  {
    label: "Gestion",
    route: "/home/gestion",
    icon: HiOutlineAnnotation,
    id: "8",
  },
];

// Icons Footer
export const iconsData = [
  {
    image: sos,
    alt: "sos",
    description:
      "Verificamos cuidadosamente la identidad y antecedentes de nuestros transportadores y usuarios",
  },
  {
    image: escudo,
    alt: "protected",
    description: "Nuestro botón de emergencia está disponible 24 horas",
  },
  {
    image: planet,
    alt: "planet",
    description: "Viajando con nuestros aliados contribuyes al cuidado del medio ambiente",
  },
  {
    image: contract,
    alt: "contract",
    description: "Nuestras políticas",
  },
];

//pestañas de historial de perfil
export const pestañasHistorialPerfil = [
  {
    name: "Viajes",
    id: 1,
  },
  {
    name: "Especiales",
    id: 2,
  },
  {
    name: "Taxis",
    id: 3,
  },
  {
    name: "Car-pool",
    id: 4,
  },
];

//array para mostrar el contenido de cada pestaña de historial de perfil
export const contenidoHistorialPerfil = [
  {
    name: "Viajes",
    title: "historial de viajes",
    p: "Historial de viajes",
    placeHolder: `aca van las cards del historial de viajes`,
    id: "1",
  },
  {
    name: "Especiales",
    title: "historial de pedidos especiales",
    p: "Historial de pedidos especiales",
    placeHolder: `aca van las cards del historial de pedidos`,
    id: "2",
  },
  {
    name: "Taxis",
    title: "historial de Taxis tomados",
    p: "Historial de viajes",
    placeHolder: `aca van las cards del historial de viajes en taxi`,
    id: "3",
  },
  {
    name: "Car-pool",
    title: "historial de viajes",
    p: "Historial de viajes en Car-pool",
    placeHolder: `aca van las cards del historial de viajes en car-pool`,
    id: "4",
  },
];

//array para lista en dashboard, son metricas que mas adelante deberan ser dinamicas obtenidas desde google analitycs
export const pageData = [
  { name: "/especiales", visits: "0", uniqueUsers: "0", bounceRate: "50", id: "1" },
  { name: "/gestion", visits: "0", uniqueUsers: "0", bounceRate: "-13", id: "2" },
  { name: "/paqueteria", visits: "0", uniqueUsers: "0", bounceRate: "22", id: "3" },
  { name: "/reserva", visits: "0", uniqueUsers: "0", bounceRate: "-35", id: "4" },
];

//esta funcion nos arma los array para generar los asientos del bus
const generarArraysPlantasBus = () => {
  const plantaBaja = [];
  const plantaAlta = [];

  // Generar array plantaBaja
  for (let i = 1; i <= 40; i++) {
    plantaBaja.push(`${i}`);
  }

  // Generar array plantaAlta
  for (let i = 41; i <= 80; i++) {
    plantaAlta.push(`${i}`);
  }

  return [plantaBaja, plantaAlta];
};

export const plantaBaja = generarArraysPlantasBus()[0];
export const plantaAlta = generarArraysPlantasBus()[1];


// infinite slider home section

export const slider: SliderItem[] = [
  // Replace these with your own logos or spans
  { id: "1", logo: bus  , description: "Buses intermunicipales" },
  { id: "2", logo: carpool  , description: "Comparte vehiculo" },
  { id: "3", logo: delivery , description: "Entrega de mercancias on demand" },
  { id: "4", logo: emergency , description: "Boton de emergencias" },
  { id: "5", logo: mercadopago , description: "Pago online" },
  // { id: 6, logo: 'Logo 6' },
];



// array de paises
export const countryOptions = [
  "Afganistán",
  "Albania",
  "Alemania",
  "Andorra",
  "Angola",
  "Antigua y Barbuda",
  "Arabia Saudita",
  "Argelia",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaiyán",
  "Bahamas",
  "Bangladés",
  "Barbados",
  "Baréin",
  "Bélgica",
  "Belice",
  "Benín",
  "Bielorrusia",
  "Birmania",
  "Bolivia",
  "Bosnia-Herzegovina",
  "Botsuana",
  "Brasil",
  "Brunéi",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Bután",
  "Cabo Verde",
  "Camboya",
  "Camerún",
  "Canadá",
  "Catar",
  "Chad",
  "Chile",
  "China",
  "Chipre",
  "Colombia",
  "Comoras",
  "Congo",
  "Corea del Norte",
  "Corea del Sur",
  "Costa de Marfil",
  "Costa Rica",
  "Croacia",
  "Cuba",
  "Dinamarca",
  "Dominica",
  "Ecuador",
  "Egipto",
  "El Salvador",
  "Emiratos Árabes Unidos",
  "Eritrea",
  "Eslovaquia",
  "Eslovenia",
  "España",
  "Estados Unidos",
  "Estonia",
  "Esuatini",
  "Etiopía",
  "Filipinas",
  "Finlandia",
  "Fiyi",
  "Francia",
  "Gabón",
  "Gambia",
  "Georgia",
  "Ghana",
  "Granada",
  "Grecia",
  "Guatemala",
  "Guinea",
  "Guinea Ecuatorial",
  "Guinea-Bisáu",
  "Guyana",
  "Haití",
  "Honduras",
  "Hungría",
  "India",
  "Indonesia",
  "Irak",
  "Irán",
  "Irlanda",
  "Islandia",
  "Islas Marshall",
  "Islas Salomón",
  "Israel",
  "Italia",
  "Jamaica",
  "Japón",
  "Jordania",
  "Kazajistán",
  "Kenia",
  "Kirguistán",
  "Kiribati",
  "Kosovo",
  "Kuwait",
  "Laos",
  "Lesoto",
  "Letonia",
  "Líbano",
  "Liberia",
  "Libia",
  "Liechtenstein",
  "Lituania",
  "Luxemburgo",
  "Macedonia del Norte",
  "Madagascar",
  "Malasia",
  "Malaui",
  "Maldivas",
  "Malí",
  "Malta",
  "Marruecos",
  "Mauricio",
  "Mauritania",
  "México",
  "Micronesia",
  "Moldavia",
  "Mónaco",
  "Mongolia",
  "Montenegro",
  "Mozambique",
  "Namibia",
  "Nauru",
  "Nepal",
  "Nicaragua",
  "Níger",
  "Nigeria",
  "Noruega",
  "Nueva Zelanda",
  "Omán",
  "Países Bajos",
  "Pakistán",
  "Palaos",
  "Palestina",
  "Panamá",
  "Papúa Nueva Guinea",
  "Paraguay",
  "Perú",
  "Polonia",
  "Portugal",
  "Reino Unido",
  "República Centroafricana",
  "República Checa",
  "República Democrática del Congo",
  "República Dominicana",
  "Ruanda",
  "Rumania",
  "Rusia",
  "Samoa",
  "San Cristóbal y Nieves",
  "San Marino",
  "San Vicente y las Granadinas",
  "Santa Lucía",
  "Santo Tomé y Príncipe",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leona",
  "Singapur",
  "Siria",
  "Somalia",
  "Sri Lanka",
  "Sudáfrica",
  "Sudán",
  "Sudán del Sur",
  "Suecia",
  "Suiza",
  "Surinam",
  "Tailandia",
  "Taiwán",
  "Tanzania",
  "Tayikistán",
  "Timor Oriental",
  "Togo",
  "Tonga",
  "Trinidad y Tobago",
  "Túnez",
  "Turkmenistán",
  "Turquía",
  "Tuvalu",
  "Ucrania",
  "Uganda",
  "Uruguay",
  "Uzbekistán",
  "Vanuatu",
  "Vaticano",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Yibuti",
  "Zambia",
  "Zimbabue"
];
