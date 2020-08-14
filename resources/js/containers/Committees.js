export const get = async () => {
    try {
        let res = await fetch('/committees');
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}