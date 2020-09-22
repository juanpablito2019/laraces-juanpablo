const token = document.getElementById("token").content;

export const get = async () => {
    try {
        let res = await fetch('/complainers');
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
} 