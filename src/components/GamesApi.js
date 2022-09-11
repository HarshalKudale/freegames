import axios from "axios";
import cheerio from "cheerio";
export async function getEpicGames(countryCode) {
    function checkIfFree(game){
        if(game.price.totalPrice.discount>0)
        {
            return true;
        }
        else return false;
    }
        const response = await axios.get(`https://corsproxy.io/?https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?country=${countryCode}`);
        const games = response.data.data.Catalog.searchStore.elements;
        var freegames =[]
        //title,price,thumbnail,description,platform,enddate,type,url
        games.forEach(game => {checkIfFree(game) && freegames.push({thumbnail:game.keyImages[2].url,description:game.description,price:game.price.totalPrice.originalPrice,platform:"Epic",title:game.title,url:"https://store.epicgames.com/en-US/p/"+game.catalogNs.mappings[0].pageSlug,endDate:game.promotions.promotionalOffers[0].promotionalOffers[0].endDate,type:game.offerType})});
        return freegames
    
}

export async function getSteamGames() {
    const response = await axios.get(`https://api.codetabs.com/v1/proxy?quest=https://store.steampowered.com/search/?maxprice=free`);
    const $ = cheerio.load(response.data);
    const games = $('#search_resultsRows').children();

    const freegames = [];
    games.each((_, node) => {
      const name = node.children[3].children[1].children[1].children[0].data;
      const url = node.attribs.href;
      const thumbnail = node.children[1].children[0].attribs.src
      const price = node.children[3].children[7].children[3].children[0].data
      freegames.push({title:name,url:url,thumbnail:thumbnail,price:price,description:"No Found",platform:"Steam",endDate:"Unknown",type:"Unknown"})});
    return freegames;
}