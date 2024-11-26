import React, { useEffect, useState } from 'react';
import adminService from '../services/adminService';
import { Button, Form } from 'react-bootstrap';
import { mealTime } from "../utils/enums/mealTime";
import { useRouter } from 'next/router';
import { MenuDTO } from '../services/menuService';

interface MenuFormProps {
    menuData?: MenuDTO;
}

const MenuForm: React.FC<MenuFormProps> = ({ menuData }) => {
    const [availableDate, setAvailableDate] = useState('');
    const [meal, setMealTime] = useState<mealTime>();
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (menuData) {
            const formattedDate = new Date(menuData.availableDate ?? new Date()).toISOString().split('T')[0];
            setAvailableDate(formattedDate);
            setMealTime(menuData.mealTime);
        }
    }, [menuData]);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newMenu = {
            availableDate: new Date(availableDate),
            mealTime: meal
        }

        try {
            let response;

            if(menuData?.menuId){
                response = await adminService.updateMenu(menuData.menuId, newMenu);
            } else {
                response = await adminService.createMenu(newMenu);
            }

            if(!response.success) {
                setError('Preencha as informações corretamente');
            } else {
                if (!menuData?.menuId) {
                    const newMenuId = response.data.newMenu.menuId;
                    localStorage.setItem('menuId', newMenuId);
                    router.push('/add');
                } else {
                    router.push('/add?menuId=' + menuData.menuId);
                }
            }
        } catch (error) {
            console.error('Error creating menu:', error);
        }
    };

    return (
        <div className="form-container">
            <Form className="form-reservation" onSubmit={handleSubmit}>
                <div>
                <label htmlFor="date">Data:</label>
                    <input 
                        type="date" 
                        id="date" 
                        name="date" 
                        value={availableDate}
                        onChange={(e) => setAvailableDate(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="mealTime">Refeição:</label>
                    <div>
                        <input 
                            type="radio" 
                            id="lunch" 
                            name="meal" 
                            value="lunch"
                            checked={meal === mealTime.LUNCH}
                            onChange={() => setMealTime(mealTime.LUNCH)}
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
                            onChange={() => setMealTime(mealTime.DINNER)}
                        />
                        <label htmlFor="dinner">Jantar</label>
                    </div>
                </div>
                {menuData ? (
                    <Button type="submit">Editar Menu</Button>
                ) : (
                    <Button type="submit">Criar Menu</Button>
                )}
            </Form>
        </div>
    );
};

export default MenuForm;