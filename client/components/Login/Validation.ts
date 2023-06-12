export function setValidate(value: Object) {
  /* 
      Regex de password valida lo siguiente: 
        ^: Marca el inicio de la cadena.
        (?=.*[a-z]): Exige al menos una letra minúscula.
        (?=.*[A-Z]): Exige al menos una letra mayúscula.
        (?=.*\d): Exige al menos un dígito.
        (?=.*[@$!%*?&]): Exige al menos un carácter especial, que puede ser uno de los siguientes: @, $, !, %, *, ? o &.
        [A-Za-z\d@$!%*?&]{8,}: Exige que la contraseña tenga una longitud mínima de 8 caracteres y que esté compuesta solo por letras (mayúsculas y minúsculas), dígitos y los caracteres especiales mencionados anteriormente.
        $: Marca el final de la cadena.

      Regex de username valida lo siguiente:
        ^: Marca el inicio de la cadena.
        (?=.*[a-z]): Exige al menos una letra minúscula.
        (?=.*[A-Z]): Exige al menos una letra mayúscula.
        (?=.*\d): Exige al menos un dígito.
        (?=.*[@$!%*?&]): Exige al menos un carácter especial, que puede ser uno de los siguientes: @, $, !, %, *, ? o &.
        [A-Za-z\d@$!%*?&]{8,}: Exige que el nombre de usuario tenga una longitud mínima de 8 caracteres y que esté compuesto solo por letras (mayúsculas y minúsculas), dígitos y los caracteres especiales mencionados anteriormente.
        (?<!password|admin): Utiliza una negative lookbehind para asegurarse de que el nombre de usuario no contenga las palabras "password" o "admin".
        \S*$: Asegura que el nombre de usuario no termine con espacios en blanco.

      Regex de email valida lo siguiente: 
        ^: Marca el inicio de la cadena.
        [a-zA-Z0-9._%+-]+: Permite letras (mayúsculas y minúsculas), dígitos y algunos caracteres especiales comunes en la parte local del correo electrónico (antes del símbolo @). El signo más (+) al final indica que se espera al menos un carácter en esta parte.
        @: Se espera que exista el símbolo @.
        [a-zA-Z0-9.-]+: Permite letras (mayúsculas y minúsculas), dígitos y un guion (-) en el dominio del correo electrónico (después del símbolo @ y antes del punto final).
        \.: Se espera que exista un punto (.) que separa el dominio de la extensión del correo electrónico.
        [a-zA-Z]{2,}: Permite letras (mayúsculas y minúsculas) en la extensión del correo electrónico. La longitud mínima de la extensión es de 2 caracteres.
        $: Marca el final de la cadena.
  */
  const regexPassword: string = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
  const regexUsername: string = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}(?<!password|admin)\S*$'
  const regexEmail: string = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

 }