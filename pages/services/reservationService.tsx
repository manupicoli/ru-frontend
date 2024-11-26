import axios from "axios";
import { mealTime } from "../utils/enums/mealTime";
const baseUrl = 'http://localhost:3001/webmob'

export interface ReservationDTO{
    reservationDate?: Date,
    mealTime?: mealTime,
}

class ReservationService {
    async createReservation(userId: number, reservation: ReservationDTO) {
        return await axios.post(`${baseUrl}/reservation/${userId}`, reservation)
        .then(res => res.data)
        .catch(err => {
            console.error("Error creating reservation: ", err);
        });
    }
}

export default new ReservationService;