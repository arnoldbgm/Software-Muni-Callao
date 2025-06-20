function createStore(initialStore = []) {
   // Vamos a crear el estado principal de mi Store
   let state = initialStore;
   // Observers => Funciones que se encargaran de los cambios
   const listeners = [];

   // Vamos a usar un metodo para mostrar el valor del state
   function getState() {
      return state;
   }

   // Esta funcion se va encargar de manipular el nuevo estado
   function setState(newState) {
      state = newState;
      listeners.forEach(function (listener) {
         listener(state);
      });
   }

   function addComedor(newTemplate) {
      // Insertar este nuevo elemento en el array state
      const newState = [...state, newTemplate]
      setState(newState)
   }

   function getComedorByName(nombre) {
      return state.find((c) => c.nombre == nombre);
   }

   function clearStorage() {
      setState([]);
   }

   function suscribe(listener) {
      listeners.push(listener);

      return () => {
         const index = listeners.indexOf(listener);
         if (index > -1) {
            listeners.splice(index, 1);
         }
      }
   }

   function updateComedor(index, nuevosDatos) {
      const newState = [...state];
      newState[index] = { ...newState[index], ...nuevosDatos };
      setState(newState);
   }


   function deleteComedor(index) {
      const newState = [...state];
      newState.splice(index, 1);
      setState(newState);
   }


   return {
      getState,
      addComedor,
      setState,
      getComedorByName,
      suscribe,
      clearStorage,
      deleteComedor,
      updateComedor,
   }
}


const comedorStore = createStore(getPersistanceData());

// Para crear una variable de manera global en todos mis archivos
window.comedorStore = comedorStore;