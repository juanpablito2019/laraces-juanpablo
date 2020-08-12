export const get = async ()=>{
    try {
        let res = await fetch('/committee-session-states');
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}