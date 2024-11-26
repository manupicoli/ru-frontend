import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import adminService, { ItemsDTO } from '../services/adminService';
import { useRouter } from 'next/router';
import menuService from '../services/menuService';

const baseUrl = 'http://localhost:3001/webmob'

interface AddItemProps {
    editMenuId?: number;
}

const ItemForm: React.FC<AddItemProps> = ({ editMenuId }) => {
    const [items, setItems] = useState<ItemsDTO[]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [currentMenuId, setCurrentMenuId] = useState<number | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedMenuId = localStorage.getItem('menuId');
        if (!currentMenuId && storedMenuId) {
            setCurrentMenuId(Number(storedMenuId));
        } 

        if(editMenuId){
            setCurrentMenuId(editMenuId);
        }

    }, [currentMenuId, editMenuId]);


    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get(`${baseUrl}/items`);
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, []);

    useEffect(() => {
        if (editMenuId) {
            const fetchMenuItems = async () => {
                try {
                    const response = await menuService.getMenu(editMenuId);
                    const menuItems = response.items.map((item: ItemsDTO) => item.itemId);
                    
                    setSelectedItems(menuItems);
                } catch (error) {
                    console.error('Error fetching menu items:', error);
                }
            }
            fetchMenuItems();
        };
    }, [editMenuId]);

    const handleCheckboxChange = (itemId: number) => {
        setSelectedItems((prevSelectedItems) =>
            prevSelectedItems.includes(itemId)
                ? prevSelectedItems.filter((id) => id !== itemId)
                : [...prevSelectedItems, itemId]
        );
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            
            if (!currentMenuId) {
                console.error('Menu ID is undefined');
                return;
            }

            console.log(currentMenuId)
            console.log(selectedItems)

            const response = await adminService.addItemToMenu(currentMenuId, selectedItems);

            if(!response.success){
                console.error('Error adding items to menu:', response.message);
                return;
            } else {
                console.log('Items added to menu:', response.data);
                router.push('/admin');
                
                setSelectedItems([]);
            }
        } catch (error) {
            console.error('Error adding items to menu:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="form">
            <Form.Group className='itens-form'>
                {items.map((item) => (
                    <Form.Check
                        key={item.itemId}
                        type="checkbox"
                        label={`${item.name}`}
                        value={item.itemId}
                        checked={item.itemId !== undefined && selectedItems.includes(item.itemId)}
                        onChange={() => item.itemId !== undefined && handleCheckboxChange(item.itemId)}
                        className='form-check'
                    />
                ))}
            </Form.Group>
            <Button variant="primary" type="submit">
                Adicionar itens ao Menu
            </Button>
        </Form>
    );
};

export default ItemForm;