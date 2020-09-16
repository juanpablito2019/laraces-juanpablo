import { orderBy } from "lodash";

const token = document.getElementById("token").content;

export const get = async () => {
    try {
        let res = await fetch("/Reports");
        let data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};
