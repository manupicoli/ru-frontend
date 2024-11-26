import axios from "axios";
import { mealTime } from "../utils/enums/mealTime";
const baseUrl = 'http://localhost:3001/webmob'

export interface ItemsDTO{
    itemId?: number,
    name?: string,
    description?: string
}

interface MenuRequest{
    availableDate?: Date,
    mealTime?: mealTime
}

class AdminService {
    async createItem(name: string, description: string) {
        return await axios.post(`${baseUrl}/item`, {
            name: name,
            description: description
        })
        .then(res => res.data)
        .catch(err => {
            console.error("Error creating item: ", err);
        });
    }

    async getItems(){
        return await axios.get(`${baseUrl}/items`)
        .then(res => res.data)
        .catch(err => {
            console.error("Error fetching items: ", err);
        });
    }

    async updateItem(itemId: number, name: string, description: string) {
        return await axios.put(`${baseUrl}/item/${itemId}`, {
            name: name,
            description: description
        })
        .then(res => res.data)
        .catch(err => {
            console.error("Error updating item: ", err);
        })
    }

    async deleteItem(itemId: number) {
        return await axios.delete(`${baseUrl}/item/${itemId}`)
        .then(res => res.data)
        .catch(err => {
            console.error("Error deleting item: ", err);
        });
    }

    async createMenu(menu: MenuRequest) {
        try{
            const response = await axios.post(`${baseUrl}/menu`, menu);
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, message: "Ocorreu um erro inesperado. Tente novamente mais tarde." };
        }
    }

    async addItemToMenu(menuId: number, itemId: number[]) {
        try{
            const response = await axios.post(`${baseUrl}/menu/${menuId}/items`, itemId);
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, message: "Ocorreu um erro inesperado. Tente novamente mais tarde"}
        }
    }

    async removeItemFromMenu(menuId: number, itemId: number) {
        return await axios.post(`${baseUrl}/menu/${menuId}/item`, itemId)
        .then(res => res.data)
        .catch(err => {
            console.error("Error removing item from menu: ", err);
        });
    }

    async updateMenu(menuId: number, menu: Partial<MenuRequest>) {
        try {
            const response = await axios.put(`${baseUrl}/menu/${menuId}`, menu);
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, message: "Ocorreu um erro inesperado. Tente novamente mais tarde." };
        }
    }

    async deleteMenu(menuId: number) {
        try {
            const response = await axios.delete(`${baseUrl}/menu/${menuId}`);
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, message: "Ocorreu um erro inesperado. Tente novamente mais tarde." };
        }
    }

    async createAdmin(){
        //TODO
    }
}

export default new AdminService;