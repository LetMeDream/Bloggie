export const summDjangoError = (errorCompleto: string) => {
    /**
     * Analiza un error verboso de IntegrityError de Django y devuelve un resumen.
     * Se enfoca en errores de "duplicate key" y extrae el campo problemático.
     * Si se mencionan múltiples constraints, se basará en el primer detalle encontrado.
     */

    if (typeof errorCompleto !== 'string') {
        return "Invalid input: Expected a string.";
    }

    // 1. Buscar el mensaje principal del IntegrityError y el detalle de la clave duplicada
    // Patrón para la línea DETAIL, que es la más informativa
    // Ejemplo: DETAIL:  Key (username)=() already exists.
    // Ejemplo: DETAIL:  Key (email)=(test@example.com) already exists.
    let matchDetail = /DETAIL:  Key \(([a-zA-Z0-9_]+)\)=\(.*\)\s+already exists\./.exec(errorCompleto);

    if (matchDetail && matchDetail[1]) {
        let fieldName = matchDetail[1];
        // Formatear el nombre del campo para que sea más legible
        // e.g., "username" -> "Username", "email_address" -> "Email address"
        let tempFieldName = fieldName.replace(/_/g, ' '); // Reemplaza todos los guiones bajos
        let formattedFieldName = tempFieldName.charAt(0).toUpperCase() + tempFieldName.slice(1);
        return `${formattedFieldName} already exists.`;
    }

    // 2. Como fallback, si el patrón DETAIL no se encuentra exactamente así,
    //    intentar extraer el campo del nombre de la constraint.
    //    Ejemplo: duplicate key value violates unique constraint "api_user_username_key"
    //    Esto es un poco más frágil porque depende de la convención de nombres de las constraints.
    let matchConstraint = /violates unique constraint "api_user_([a-zA-Z0-9_]+)_key"/.exec(errorCompleto);
    // El prefijo "api_user_" es específico de tu ejemplo. Podrías hacerlo más genérico si es necesario:
    // let matchConstraint = /violates unique constraint "[a-zA-Z0-9_]*?([a-zA-Z0-9_]+)_key"/.exec(errorCompleto);


    if (matchConstraint && matchConstraint[1]) {
        let fieldName = matchConstraint[1];
        let tempFieldName = fieldName.replace(/_/g, ' ');
        let formattedFieldName = tempFieldName.charAt(0).toUpperCase() + tempFieldName.slice(1);
        return `${formattedFieldName} already exists.`;
    }

    // 3. Si ninguno de los patrones anteriores coincide, pero es un IntegrityError por clave duplicada
    if (errorCompleto.includes("IntegrityError") && errorCompleto.includes("duplicate key value violates unique constraint")) {
        return "A unique constraint was violated, but the specific field could not be identified from the log.";
    }
    
    if (errorCompleto.includes("IntegrityError")) {
        return "A database integrity error occurred.";
    }

    return "Could not parse the error information.";
}

export const handleAPIError = (error: any) => {
    // Check if the error is a string
    if (typeof error === 'string') {
        return summDjangoError(error); // Return the error string directly
    }

    // Check if the error is an object and has a message property
    if (Array.isArray(error)) {
      return error[0] || "An unknown error occurred.";
    }

    if (error && typeof error === 'object') { 
      return Object.values(error)[0]?.toString() || "An unknown error occurred.";
    }

    // Fallback for any other type of error
    return "An unknown error occurred.";
}
