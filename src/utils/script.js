import axios from 'axios'
import { faker } from '@faker-js/faker'
import { clients } from './clients'

const URL_API_IA_ANALYSE = '127.0.0.1:8000'

export const generateDataSimulation = async ({ nbrTransaction = 1000, isTest = false }) => {
  return new Promise((resolve, reject) => {
    try {
      const data = []
      for (let index = 0; index < nbrTransaction; index++) {
        const client =  clients[parseInt(faker.number.bigInt({ max: clients.length - 1 }),10)];
        const request = {
          client_id: client?.id,
          montant: parseInt(faker.finance.amount({ min: 1, max: 1500, dec: 0 }), 10),
        }

        if(isTest){
          data.push({
            ...request,
            estValide:  parseInt(faker.number.bigInt({ max : 10000}),10) % 2 === 0,
            dateCreation: faker.date.between({ from: '2024-01-01', to: Date.now() }),
            client
          })
        }else{
          axios
            .post(`${URL_API_IA_ANALYSE}/predict`, request)
            .then(function (response) {
              data.push({
                ...request,
                estValide: response?.data?.resultat === 'Comportement normal.',
                dateCreation: faker.date.between({ from: '2024-01-01', to: Date.now() }),
              })
            })
            .catch(function (error) {
              console.log(error)
            })
        }

      }

      return resolve(data)
    } catch (error) {
      return reject(error)
    }
  })
}
