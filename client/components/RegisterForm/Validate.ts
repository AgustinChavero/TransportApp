interface ValidationFunctions {
  (value: string): setErrores;
}

interface Validations {
  [key: string]: ValidationFunctions;
}
interface setErrores {
  messageName?: string;
  messageLastName?: string;
  messageEmail?: string;
  messagePassword?: string;

}
export default function setValidate(values: { [key: string]: string }): Object{
  const key = Object.keys(values)[0]
  const value = Object.values(values)[0]

  const regexString = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_:.-])[A-Za-z\d@$!%*?&_:.-]{8,}$/;
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  const validations: Validations = {
    name: (value: string): setErrores => {
      console.log(regexString.test(value))
      if (!regexString.test(value) && value != "") {
        console.log("entro")
        return {messageName: "Solo se permiten letras"}
      }
      return {messageName: ""}
    },
    lastName: (value: string): setErrores => {
      if(!regexString.test(value) && value != ""){
        return {messageLastName: "Solo se permiten letras"}
      }
      return {messageLastName: ""}
    },
    email:  (value: string):  setErrores => {
      if(!regexEmail.test(value) && value != ""){
        return {messageEmail: "El email es incorrecto"}
      }
      return {messageEmail: ""}
    },
      password: (value: string):  setErrores=>{
        if(!regexPassword.test(value) && value != ""){
          return {messagePassword: "La contraseña es incorrecta"}
        }
        return {messagePassword: ""}
    },
    
    }
  
    return validations[key](value)

}