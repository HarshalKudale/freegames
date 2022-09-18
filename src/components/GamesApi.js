import axios from "axios";
import cheerio from "cheerio";
import prime from '../static/images/prime.jpg';
export async function getEpicGames(countryCode) {
    console.log("getEpicGames");
    function checkIfFree(game){
        if(game.price.totalPrice.discount>0)
        {
            return true;
        }
        else return false;
    }
        const response = await axios.get(`https://corsproxy.io/?https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?country=${countryCode}`);
        const games = response.data.data.Catalog.searchStore.elements;
        const freegames =[]
        //title,price,thumbnail,description,platform,enddate,type,url
        games.forEach(game => {checkIfFree(game) && freegames.push({thumbnail:game.keyImages[2].url,description:game.description,price:game.price.totalPrice.originalPrice,platform:"Epic Games",title:game.title,url:"https://store.epicgames.com/en-US/p/"+game.catalogNs.mappings[0].pageSlug,endDate:game.promotions.promotionalOffers[0].promotionalOffers[0].endDate,type:game.offerType})});
        return freegames
    
}

export async function getSteamGames() {
    const response = await axios.get(`https://api.codetabs.com/v1/proxy?quest=https://store.steampowered.com/search/?maxprice=free&specials=1`);
    const $ = cheerio.load(response.data);
    const games = $('#search_resultsRows').children();
    const freegames = [];
    games.each((_, node) => {
      const name = node.children[3].children[1].children[1].children[0].data;
      const url = node.attribs.href;
      const thumbnail = node.children[1].children[0].attribs.src
      const price = node.children[3].children[7].children[3].children[0].data
      freegames.push({title:name,url:url,thumbnail:thumbnail,price:price.trim()?price.trim():"Not Found",description:"Not Found",platform:"Steam",endDate:"Unknown",type:"Unknown"})});
    return freegames;
}
export async function getAmazonGames() {

        const response = await axios.get(`https://api.codetabs.com/v1/proxy?quest=https://gg.deals/subscription-news/free-games-with-prime-september-2022/`);
        const parser = new DOMParser();
        const doc = parser.parseFromString(response.data, "text/html");
        const list = doc.getElementsByTagName("ul");
        const games = list[14].getElementsByTagName("li");
        const  freegames =[]
        for(var game of games)
        {
            if(game.getElementsByTagName("a").length === 2)
            {
                freegames.push({title:game.getElementsByTagName("a")[0].innerHTML,url:game.getElementsByTagName("a")[1].href,description:"Not Found",platform:"Prime Gaming(Amazon)",endDate:"Unknown",type:"Game",thumbnail:prime,price: "Unknown"})
            }
            else{
                freegames.push({title:game.getElementsByTagName("a")[0].innerHTML,url:"https://gaming.amazon.com/home",description:"Not Found",platform:"Prime Gaming(Amazon)",endDate:"Unknown",type:"Game",thumbnail:prime,price: "Unknown"})
            }
        }
        return freegames
}
export async function getUbisoftGames() {
    const config = {
        headers:{
            "ubi-appid": "314d4fef-e568-454a-ae06-43e3bece12a6",
            "ubi-localecode": "en-US"
        }
      };
    const freeGames= [];
    function addGame(game){
        freeGames.push({title:game.title,url:game.links.param,description:"Not Found",platform:"Ubisoft",endDate:game.expirationDate,type:"Game",thumbnail:game.mediaURL,price: "Unknown"})
    }
    const response = await axios.get(`https://corsproxy.io/?https://public-ubiservices.ubi.com/v1/spaces/news?spaceId=6d0af36b-8226-44b6-a03b-4660073a6349`,config);
    const games = response.data.news;
    games.forEach(game => {
        if(game.type === "gametrial")
        {
            addGame(game);
        }
    });
    return freeGames;
}

export async function getFreeGames() {
    const epicgames = await getEpicGames("US");
    const steamgames = await getSteamGames();
    const amazongames = await getAmazonGames();
    const ubisoftgames = await getUbisoftGames();
    return [...epicgames, ...steamgames, ...amazongames, ...ubisoftgames];
}