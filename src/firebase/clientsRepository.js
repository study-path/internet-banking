import { db } from './';

export const clientsRepository = {
  getClients: async function () {
    const data = [];
    const tableRef = db.ref(`clients`);
    const dataSnapshot = await tableRef.once("value");
    dataSnapshot.forEach((itemSnapshot) => {
      const item = itemSnapshot.val();
      data.push(item);
    });
    return data;
  }, 
  addClient: async function(client) {
    const clientRef = db.ref(`clients/${client.id}`);
    return clientRef.set(client);
  },
  generateClientId: async () => {
    try {
      const tableRef = db.ref(`clients`);
      const dataSnapshot = await tableRef.once("value");
      let clientId = 0;
      dataSnapshot.forEach(()=> {clientId++});
      return clientId + 1;      
    } catch (error) {
     alert(error); 
    }
  },
  getClient: async function(clientId){   
    const clientRef = db.ref(`clients/${clientId}`);
    var dataSnapshot = await clientRef.once('value');
    return await dataSnapshot.val();
  },
  updateClient: async function(client){
    const clientRef = db.ref(`clients/${client.id}`);
    await clientRef.update(client);
  }  
};