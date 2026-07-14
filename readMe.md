## Sistema de Control de Llamadas (CCP)

 
### Problema a resolver

Este proyecto es un sistema de consola desarrollado en TypeScript que simula el funcionamiento de un Controlador de Llamadas (CCP) para un Call Center. Utiliza patrones de diseño orientados a objetos para gestionar de manera eficiente la creación, validación y registro de llamadas.

### Estructura de clases
 

Patrones de Diseño: Implementación de Factory Method para determinar el origen de la llamada, Builder (Fluent Interface) para la construcción dinámica de formularios y arquitectura orientada a objetos.

Interacción en Consola: Flujo de trabajo interactivo que solicita datos al agente en tiempo real.

Validación Estricta: Verificación de formatos para códigos de facturación (billing) y validación de disposiciones (disposition) según el tipo de origen.

Automatización: Generación de números telefónicos aleatorios y ciclo continuo de atención de llamadas.


### Patrones de Diseño Implementados

La arquitectura del sistema se basa en cuatro pilares fundamentales:

### Singleton (CallManager):
 Centraliza el almacenamiento y la gestión de llamadas, garantizando que exista una única "fuente de la verdad" para el historial de registros en todo el ciclo de vida del programa.

### Facade (CallsFachada):
 Actúa como una interfaz simplificada para el cliente (main.ts), ocultando la complejidad de la orquestación entre el Builder y el Manager.

### Builder (CallBuilder):
 Permite la construcción paso a paso de formularios de llamadas complejos (CallForm), asegurando que solo se construyan objetos válidos mediante validaciones integradas.

### Factory (CallFactory):
 Centraliza la lógica de creación de objetos (Customer, Provider, Coworker), facilitando la expansión del sistema si se requieren nuevos tipos de llamadas en el futuro.


### Ejemplo de uso

 Al iniciar, el sistema generará automáticamente un tipo de llamada (Cliente o Proveedor) y mostrará el número telefónico asignado. El sistema te pedirá:

Disposition: Ingresa el motivo de la llamada según la lista mostrada.

Billing: Ingresa un código de 4 caracteres alfanuméricos.

El sistema validará los datos y, si son correctos, registrará la llamada en memoria, procediendo inmediatamente a generar la siguiente.
 

### Amauri M. Montejo