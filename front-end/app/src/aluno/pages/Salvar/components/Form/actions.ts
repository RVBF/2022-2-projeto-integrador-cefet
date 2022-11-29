/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable array-callback-return */
import axios from 'axios';

export async function save(button: any, data: any, id?: string) {
  const payload = Object.assign(data);

  button.onclick = async () => {
    Object.keys(data).map((item: string) => {
      payload[item] = data[item].object.value;
    });

    try {
      // Enviar para o backend
      // Pegar o ID para formatar ao back
      // {console.log(id)}
      await axios.post('/url-backend', payload);

      alert('Criado');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      alert('Falha ao criar');
    }
  };
}

export async function remove(id: string) {
  try {
    await axios.delete(`/url-backend/${id}`);

    alert('Deletado');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    alert('Falha ao deletar');
  }
}
