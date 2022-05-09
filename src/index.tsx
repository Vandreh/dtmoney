import React from 'react';
import ReactDOM from 'react-dom/client';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions:[
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'DEV',
          amount: 6000,
          createdAt: new Date('2022-05-07 23:00:00'),
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'CASA',
          amount: 1100,
          createdAt: new Date('2022-05-07 23:00:00'),
        },
      ],
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');  //[{id: 1,title: 'Transaction 1',amount: 400,type: 'deposit',category: 'food',createdAt: new Date()}]
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data);
    })
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);