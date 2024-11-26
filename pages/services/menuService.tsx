import axios from 'axios'
import { ItemsDTO } from './adminService';
import { mealTime } from '../utils/enums/mealTime';
const baseUrl = 'http://localhost:3001/webmob'

export interface MenuDTO {
    menuId?: number,
    availableDate?: Date,
    mealTime?: mealTime,
    items?: ItemsDTO[]
}

class MenuService {
    async getMenu(menuId: number) {
        return await axios.get(`${baseUrl}/menu/${menuId}`).then(res => res.data)
        .catch(err => {
            console.error("Error fetching menu: ", err);
        });
    }

    async listMenusOfWeek() {
        return await axios.get(`${baseUrl}/menu`).then(res => res.data)
        .catch(err => {
            console.error("Error fetching menu: ", err);
        });
    }

    async listAllMenus(){
        return await axios.get(`${baseUrl}/menus`).then(res => res.data)
        .catch(err => {
            console.error("Error fetching menu: ", err);
        });
    }
}

export default new MenuService;