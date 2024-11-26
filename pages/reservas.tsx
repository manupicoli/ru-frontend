import axios from 'axios';
import { useEffect, useState } from 'react';
import ReservationForm from './components/reservationForm';
import Menu, { MenuType } from './components/menus';

const Reservas: React.FC = () => {
    const [imageUrl, setImageUrl] = useState<string>('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get('https://picsum.photos/id/237/400/600', {
                    responseType: 'blob'
                });
                const imageObjectURL = URL.createObjectURL(response.data);
                setImageUrl(imageObjectURL);
            } catch (error) {
                console.error('Error fetching the image:', error);
            }
        };

        fetchImage();
    }, []);

    return (
        <div className="reservas-container">
            <div className="reservas-inner-container">
                <div>
                    <h1 className="reservas-menu-title">Cardápios da semana</h1>
                    <Menu menutype={MenuType.WEEKLY}/>
                </div>
                <div>
                    <h1 className="reservas-menu-title">Reservas:</h1>
                    <ReservationForm />
                    <a href="#" onClick={async (e) => {
                        e.preventDefault();
                        try {
                            const response = await axios.get('https://picsum.photos/id/237/400/600', {
                                responseType: 'blob'
                            });
                            const imageObjectURL = URL.createObjectURL(response.data);
                            setImageUrl(imageObjectURL);
                            window.open(imageObjectURL, '_blank');
                        } catch (error) {
                            console.error('Error fetching the image:', error);
                        }
                    }}>
                        No RU da UPF você também pode encontrar...
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Reservas;