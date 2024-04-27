# Jest -  anotaciones de practica



#### Package.json: 
```json
  "scripts": {
    "test": "jest"
  },
```

## Test Methods

### Test
Usado semanticamente para realizar test unitarios

### Describe
Usado para agrupar test relacionados

### It
Usado intercambiablemente con "test", pero semanticamente mas usado en contexto de la agrupacion de tests con "describe"

## Sintaxis

```javascript
  test("add 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
})
```


## Matchers
Jest es un marco de pruebas de JavaScript que viene con un conjunto de "matchers" que te permiten validar diferentes cosas en tus pruebas. Aquí te presento algunos de los matchers más comunes que puedes usar con Jest:

El `not.` se puede usar para negar los matchers. ej:
```javascript
expect(sum(1, 2)).not.toBeLessThan(3);
```


Matchers de Igualdad
* <i>toBe(value)</i>: Comprueba la igualdad estricta (===).
* <i>toEqual(value)</i>: Comprueba la igualdad de los valores de un objeto o array.

Matchers de Verdad
* <i>toBeNull()</i>: Comprueba que algo es null.
* <i>toBeUndefined()</i>: Comprueba que algo es undefined.
* <i>toBeDefined()</i>: Lo opuesto a toBeUndefined.
* <i>toBeTruthy()</i>: Comprueba que algo es verdadero en un contexto booleano.
* <i>toBeFalsy()</i>: Comprueba que algo es falso en un contexto booleano.

Matchers de Números
* <i>toBeGreaterThan(number)</i>: Comprueba que un número es mayor que otro.
* <i>toBeGreaterThanOrEqual(number)</i>: Comprueba que un número es mayor o igual que otro.
* <i>toBeLessThan(number)</i>: Comprueba que un número es menor que otro.
* <i>toBeLessThanOrEqual(number)</i>: Comprueba que un número es menor o igual que otro.
* <i>toBeCloseTo(number, numDigits)</i>: Comprueba que un número es cercano a * otro, útil para la precisión de los flotantes.

Matchers de Strings
* <i>toMatch(regexpOrString)</i>: Comprueba que un string coincide con una expresión regular o string.

Matchers de Arrays
* <i>toContain(item)</i>: Comprueba que un array contiene un elemento específico.
* <i>toContainEqual(item)</i>: Comprueba que un array contiene un elemento que es igual (en valor) a un objeto específico.

Matchers de Excepciones
* <i>toThrow(error?)</i>: Comprueba que una función lanza un error.
* <i>toThrowErrorMatchingSnapshot()</i>: Comprueba que un error lanzado por una función coincide con un snapshot previamente almacenado.

Matchers de Snapshots
* <i>toMatchSnapshot()</i>: Comprueba que un "snapshot" del estado actual del DOM, objeto, o cualquier otro dato, coincide con un snapshot previo.
* <i>toMatchInlineSnapshot()</i>: Similar a toMatchSnapshot, pero el snapshot se escribe como argumento de la función.

Matchers Asíncrono
* <i>resolves</i>: Se usa para desempaquetar el valor de una promesa que se espera que se resuelva.
* <i>rejects</i>: Se usa para desempaquetar el valor de una promesa que se espera que sea rechazada.

### Ejemplo de uso de resolve y reject con **promesas y con async/await**

```javascript
// archivo de la funcion
function fetchData() {
  return new Promise(resolve => setTimeout(() => resolve("data"), 1000));
}
// archivo de testing
test('la promesa se resuelve con "data"', () => {
  return expect(fetchData()).resolves.toBe("data");
});
```
#### con Async/Await
```javascript
test('la promesa se resuelve con "data" usando async/await', async () => {
  await expect(fetchData()).resolves.toBe("data");
});

test('la promesa se rechaza con un error usando async/await', async () => {
  await expect(fetchError()).rejects.toThrow("error");
});
```


### Ejemplo de uso de toThrowErrorMatchingSnapshot

```javascript
function fetchData() {
  throw new Error('Error al obtener los datos');
}	
```


Ejemplo de uso básico en Jest:
```javascript
test('dos más dos es igual a cuatro', () => {
  expect(2 + 2).toBe(4);
});

test('el objeto tiene la propiedad esperada', () => {
  expect({name: 'John', age: 30}).toHaveProperty('name');
});

test('la lista contiene el elemento esperado', () => {
  expect(['apple', 'banana', 'mango']).toContain('banana');
});
```

$$$$

Estos son solo algunos de los matchers que Jest ofrece para hacer tus pruebas más expresivas y fáciles de entender. Puedes consultar la documentación oficial de Jest para obtener una lista completa y detalles adicionales.


## Matchers Específicos para React con Jest
Cuando se trabaja con React, a menudo se utiliza la biblioteca adicional `@testing-library/react` para renderizar componentes en un entorno de pruebas. Aquí algunos ejemplos de cómo podrías usar matchers en este contexto:

<i>toBeInTheDocument:</i> Verifica que un elemento está en el documento.
```jsx
import { render, screen, cleanup } from '@testing-library/react';
import App from './App';

afterEach(()=> {
  cleanup(); // para limpiar despuesde cada
});

test('renders learn react link', () => {
  render(<App  />);
  const linkElement = screen.getByText(/learn react/i);
  //or 
  const linkElement = screen.getByTestId("item-1"); //este id esta dinameicamente incorporado en cada elemento con `data-item-${id}`
  expect(linkElement).toBeInTheDocument();
});
```

<i>toHaveTextContent:</i> Verifica que un elemento tiene contenido de texto específico.
```jsx
expect(element).toHaveTextContent('contenido');
```

<i>toBeVisible:</i> Verifica que un elemento es visible para el usuario.
```jsx
expect(element).toBeVisible();.
```

<i>toHaveClass:</i> Comprueba que un elemento tiene ciertas clases CSS.
```jsx
expect(element).toHaveClass('my-class');
```
<i>toHaveAttribute:</i> Comprueba que un elemento tiene un atributo específico con un valor específico.
```jsx
expect(element).toHaveAttribute('type', 'button');
```
<i>toHaveStyle:</i> Comprueba que un elemento tiene ciertos estilos aplicados.
```jsx
expect(element).toHaveStyle('color: red');
```

Estos son solo algunos ejemplos de los matchers que puedes usar con Jest en tus pruebas de React. Jest tiene una amplia gama de matchers que puedes explorar para hacer tus pruebas más expresivas y fáciles de entender.


## Escribir una prueba con Snapshot
Supongamos que tienes un componente de React llamado UserProfile. Aquí está cómo podrías escribir una prueba para hacer un snapshot de este componente:

```jsx
import React from 'react';
import renderer from 'react-test-renderer'; // agregar
import UserProfile from './UserProfile';

test('UserProfile renders correctly', () => {
  const component = renderer.create(<UserProfile />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
```


### Actualizar Snapshots

Si en algún momento realizas cambios intencionales en tus componentes que afecten los snapshots, necesitarás actualizar los archivos de snapshot para reflejar estos cambios. Puedes hacerlo con:

```bash
npm test -- -u
```
o presionando 'u' segun te lo indique la consola para realizar el update




## MOCKS y SPIES

### Matchers

<i>toBeCalled() / toHaveBeenCalled():</i> Verifica si la función mock o spy fue llamada al menos una vez.
```javascript
expect(mockFunction).toHaveBeenCalled();
```
<i>toBeCalledTimes() / toHaveBeenCalledTimes():</i> Verifica si la función mock o spy fue llamada un número específico de veces.
```javascript
expect(mockFunction).toHaveBeenCalledTimes(3);
```
<i>toBeCalledWith() / toHaveBeenCalledWith():</i> Verifica si la función mock o spy fue llamada con argumentos específicos al menos una vez.
```javascript
expect(mockFunction).toHaveBeenCalledWith(arg1, arg2);
```
<i>lastCalledWith() / toHaveBeenLastCalledWith():</i> Verifica si la última llamada a la función mock o spy fue realizada con argumentos específicos.
```javascript
expect(mockFunction).toHaveBeenLastCalledWith(arg1, arg2);
```
<i>nthCalledWith() / toHaveBeenNthCalledWith():</i> Verifica si la enésima llamada a la función mock o spy fue realizada con argumentos específicos.
```javascript
expect(mockFunction).toHaveBeenNthCalledWith(2, arg1, arg2);
```
<i>toReturn() / toHaveReturned():</i> Verifica si la función mock o spy ha retornado al menos una vez.
```javascript
expect(mockFunction).toHaveReturned();
```
<i>toReturnTimes() / toHaveReturnedTimes():</i> Verifica si la función mock o spy ha retornado un número específico de veces.
```javascript
expect(mockFunction).toHaveReturnedTimes(2);
```
<i>toReturnWith() / toHaveReturnedWith():</i> Verifica si la función mock o spy ha retornado un valor específico al menos una vez.
```javascript
expect(mockFunction).toHaveReturnedWith(value);
```
<i>lastReturnedWith() / toHaveLastReturnedWith():</i> Verifica si el último valor retornado por la función mock o spy es específico.
```javascript
expect(mockFunction).toHaveLastReturnedWith(value);
```
<i>nthReturnedWith() / toHaveNthReturnedWith():</i> Verifica si el enésimo retorno de la función mock o spy es un valor específico.
```javascript
expect(mockFunction).toHaveNthReturnedWith(3, value);
```

#### Mocks
Los "mocks" (simulacros) son objetos o funciones que simulan el comportamiento de componentes reales de manera controlada. Se utilizan para aislar las pruebas de otras partes del sistema que pueden ser impredecibles, lentas o difíciles de configurar. Con los mocks, puedes simular respuestas específicas, verificar que se llamen ciertas funciones con los argumentos correctos, y controlar el comportamiento de las dependencias durante las pruebas.

En Jest, puedes crear mocks de varias maneras, incluyendo:

<i>jest.fn():</i> Crea una función mock que puede ser utilizada para espiar llamadas, retornos y excepciones.
<i>jest.mock():</i> Automáticamente reemplaza módulos con una versión mock, permitiendo simular comportamientos completos de módulos.
Ejemplo de uso de un mock en Jest:
```javascript
// Importamos la función que queremos mockear
import { fetchData } from './api';

// Mockeamos el módulo completo
jest.mock('./api');

test('should fetch data', async () => {
  // Configuramos el mock para retornar un valor específico
  fetchData.mockResolvedValue({ data: 'some data' });

  const data = await fetchData();
  expect(data).toEqual({ data: 'some data' });
});
```

#### Spies
Los "spies" (espías) son similares a los mocks pero se utilizan principalmente para espiar las llamadas a funciones existentes sin alterar su comportamiento. Esto es útil cuando quieres asegurarte de que ciertas funciones se llamen con los argumentos correctos, o un número específico de veces, pero sin cambiar su implementación.

En Jest, los spies se pueden crear con <i>jest.spyOn()</i>, que permite espiar métodos de un objeto.

Ejemplo de uso de un spy en Jest:
```javascript
import * as api from './api'; // Importamos todo desde el módulo 'api' como 'api'
import { processData } from './processor';

jest.spyOn(api, 'fetchData'); // Espiamos el método 'fetchData' del objeto 'api'

test('should call fetchData', async () => {
  await processData();
  expect(api.fetchData).toHaveBeenCalled();
});
```
En este ejemplo, processData debería llamar a fetchData. Usamos jest.spyOn() para asegurarnos de que se haga esta llamada sin modificar la función original fetchData.


### Métodos y funciones 
Métodos y funciones importantes que se utilizan en conjunto con mocks y spies.

#### Mock Functions (Funciones Mock)
Las funciones mock en Jest son utilizadas para espiar, capturar llamadas, y definir valores de retorno específicos, entre otras cosas. Aquí algunos métodos útiles:

<i>jest.fn():</i> Crea una función mock.

<i>mockFn.mock.calls: </i>Un array que registra todas las llamadas que se han hecho a la función mock, incluyendo los argumentos con los que fue llamada cada vez.
```javascript
const mockFunction = jest.fn();
mockFunction();
mockFunction('hello');

console.log(mockFunction.mock.calls); // [[], ['hello']]
```

<i>mockFn.mock.results: </i>Un array que contiene los resultados de todas las llamadas a la función mock.

<i>mockFn.mockReturnValue(value):</i> Configura un valor específico a retornar cuando la función mock es llamada.
```javascript
const mockFunction = jest.fn();
mockFunction.mockReturnValue('default value');

console.log(mockFunction()); // 'default value'
```

<i>mockFn.mockResolvedValue(value):</i> Configura un valor que será retornado como una promesa resuelta cuando la función mock es llamada.
```javascript
const mockFunction = jest.fn();
mockFunction.mockResolvedValue('resolved value');

mockFunction().then(value => console.log(value)); // 'resolved value'
```

<i>mockFn.mockRejectedValue(error):</i> Configura un error que será retornado como una promesa rechazada cuando la función mock es llamada.
```javascript
const mockFunction = jest.fn();
mockFunction.mockRejectedValue(new Error('error'));

mockFunction().catch(error => console.log(error.message)); // 'error'
```

#### Spies
Los spies son una forma de crear mocks para funciones existentes. Permiten espiar el comportamiento de la función sin alterar su implementación original.

<i>jest.spyOn(object, methodName):</i> Crea un mock de una función específica de un objeto, permitiendo espiar llamadas a esta función.
```javascript
const video = {
  play() {
    return true;
  }
};

const spy = jest.spyOn(video, 'play');
video.play();

console.log(spy.mock.calls.length); // 1
spy.mockRestore(); // Restore original function
```

Mock Modules
Jest también permite hacer mock de módulos completos, lo cual es útil para aislar partes de tu código de dependencias externas durante las pruebas.

<i>jest.mock('modulePath'):</i> Hace mock de un módulo específico. Puedes proporcionar una fábrica que retorne el mock deseado.
```javascript
// Assuming we have a module `math.js` that exports a function `add`
jest.mock('./math', () => ({
  add: jest.fn(() => 42)
}));

const math = require('./math');
console.log(math.add(1, 2)); // 42
```

<i>jest.requireActual('modulePath'):</i> Permite requerir la versión real de un módulo que ha sido mockeado.
Lifecycle Methods
Estos métodos son útiles para configurar condiciones antes y después de tus pruebas, lo cual es especialmente útil cuando trabajas con mocks y spies.

<i>beforeEach():</i> Ejecuta una función antes de cada prueba.
```javascript
let count = 0;

beforeEach(() => {
  count += 1;
});

test('increment count', () => {
  expect(count).toBe(1);
});

test('increment count again', () => {
  expect(count).toBe(2);
});
```

<i>afterEach():</i> Ejecuta una función después de cada prueba.
```javascript
let count = 0;

afterEach(() => {
  count = 0; // Reset count after each test
});

test('modify count', () => {
  count = 5;
  expect(count).toBe(5);
});

test('count is reset', () => {
  expect(count).toBe(0);
});
```

<i>beforeAll():</i> Ejecuta una función una sola vez antes de todas las pruebas.
```javascript
let count;

beforeAll(() => {
  count = 1;
});

test('count initialized', () => {
  expect(count).toBe(1);
  count += 1;
});

test('count persists', () => {
  expect(count).toBe(2);
});
```

<i>afterAll():</i> Ejecuta una función una sola vez después de todas las pruebas.
```javascript
let resource;

beforeAll(() => {
  resource = openResource();
});

afterAll(() => {
  closeResource(resource);
});

test('use resource', () => {
  expect(resource).not.toBeNull();
});
```

Estos métodos y funciones te ayudarán a controlar y verificar el comportamiento de tu código en un entorno de pruebas, permitiéndote simular y aislar comportamientos para asegurar que tus unidades de código funcionan como se espera.

<style>
  body{
    max-width: 800px;
    margin: auto;
  }
  i{
      color: #53bda6;
      background-color: #373737;
      padding: 2px;
      border-radius: 3px;
  }
  li{
    margin-bottom:10px
  }
</style>


