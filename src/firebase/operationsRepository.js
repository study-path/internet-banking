import { db } from './';

export const operationsRepository = {
  getOperations: async function () {
    const data = [];
    const tableRef = db.ref(`operations`);
    const dataSnapshot = await tableRef.once("value");
    dataSnapshot.forEach((itemSnapshot) => {
      const item = itemSnapshot.val();
      data.push(item);
    });
    return data;
  }, 
  createOperation: async function(operation) {   
    const operationRef = db.ref(`operations/${operation.id}`);  
    return operationRef.set(operation);
  },
  generateOperationId: async () => {
    const tableRef = db.ref(`operations`);
    const dataSnapshot = await tableRef.once("value");
    let operationId = 0;
    dataSnapshot.forEach(()=> {operationId++});
    return operationId + 1;
  },
  // getClient: async function(clientId){   
  //   const clientRef = db.ref(`clients/${clientId}`);
  //   var dataSnapshot = await clientRef.once('value');
  //   return await dataSnapshot.val();
  // },
  // updateClient: async function(client){
  //   const clientRef = db.ref(`clients/${client.id}`);
  //   await clientRef.update(client);
  // }  
};