interface ValidationFunctions {
    (value: string): setErrores;
  }
  
  interface Validations {
    [key: string]: ValidationFunctions;
  }
  interface setErrores {
    messageEmail?: string;
    messagePassword?: string;
  }
  export default function setValidate(values: { [key: string]: string }): Object{
    const key = Object.keys(values)[0]
    const value = Object.values(values)[0]
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_:.-])[A-Za-z\d@$!%*?&_:.-]{8,}$/;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  
      const validations: Validations = {
        password: (value: string):  setErrores=>{
          if(!regexPassword.test(value) && value != ""){
            return {messagePassword: "La contraseña no es correcta"}
          }
          return {messagePassword: ""}
        },
        email:  (value: string):  setErrores => {
          if(!regexEmail.test(value) && value != ""){
            return {messageEmail: "El email no es correcto"}
          }
          return {messageEmail: ""}
        }
      }
    
      return validations[key](value)
  
  }