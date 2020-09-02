export const index = async () => {
    try {
        let res = await fetch('/act-templates');
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}