import { Button, Form } from "react-bootstrap";
import reservationService, { ReservationDTO } from "../services/reservationService";
import { useState } from "react";
import { mealTime } from "../utils/enums/mealTime";

function ReservationForm() {
    const [date, setDate] = useState('');
    const [meal, setMeal] = useState<mealTime>();
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const userId = localStorage.getItem('userId');

        const reservation: ReservationDTO = {
            reservationDate: new Date(date),
            mealTime: meal
        }

        try {
            const response = await reservationService.createReservation(Number(userId), reservation);
            console.log('Reservation created successfully:', response);
            alert('Reserva feita com sucesso!');
            setDate('');
            setMeal(undefined);
        } catch (error) {
            console.error('Error creating reservation:', error);
        }
    };

    return (
        <div className="form-container">
            <Form className="form-reservation" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="id">Matrícula:</label>
                    <input type="text" id="id" name="id" />
                </div>
                <div>
                    <label htmlFor="name">Nome:</label>
                    <input type="text" id="name" name="name" />
                </div>
                <div>
                    <label htmlFor="date">Data:</label>
                    <input 
                        type="date" 
                        id="date" 
                        name="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="meal">Refeição:</label>
                    <div>
                        <input 
                            type="radio" 
                            id="lunch" 
                            name="meal" 
                            value="lunch"
                            checked={meal === mealTime.LUNCH}
                            onChange={() => setMeal(mealTime.LUNCH)}
                        />
                        <label htmlFor="lunch">Almoço</label>
                    </div>
                    <div>
                        <input 
                            type="radio" 
                            id="dinner" 
                            name="meal" 
                            value="dinner" 
                            checked={meal === mealTime.DINNER}
                            onChange={() => setMeal(mealTime.DINNER)}
                        />
                        <label htmlFor="dinner">Jantar</label>
                    </div>
                </div>
                <Button type="submit">Reservar</Button>
            </Form>
        </div>
    );
}

export default ReservationForm;
