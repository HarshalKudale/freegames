export async function Steam (loginInfo) 
{
    const res = await fetch('http:url/'+loginInfo[0].ID);
    const json = await res.json();
    return json;
}
export default {Stema};