import axios from 'axios';
export async function Epic ()
{
    return axios.get('https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions')
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        throw error;
      });
      
}
export default Epic;