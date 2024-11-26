import React, { useEffect, useState } from "react";
import menuService, { MenuDTO } from "../services/menuService";
import { formatDate } from "../utils/formatDate";
import Link from "next/link";
import axios from "axios";
import adminService from "../services/adminService";
import { Button } from "react-bootstrap";

export enum MenuType {
    WEEKLY = 'WEEKLY',
    ALL = 'ALL'
}

interface MenuProps {
    menutype?: MenuType}

const Menu: React.FC<MenuProps> = ({ menutype }) => {
    const [menus, setMenus] = useState<MenuDTO[]>([]);

    const getMenus = async () => {
        if(menutype === MenuType.WEEKLY){
            const menuData = await menuService.listMenusOfWeek();
            setMenus(menuData);
        } else {
            const menuData = await menuService.listAllMenus();
            setMenus(menuData);
        }
    }

    const handleDelete = async (menuId: number) => {
        try {
            await adminService.deleteMenu(menuId);
            getMenus();
        } catch (error) {
            console.error("Error deleting menu: ", error);
        }

        getMenus();
    }

    useEffect(() => {
        getMenus();
    }, []);


    return (
        <div>

        <div className="menu-container">
            {menutype === MenuType.WEEKLY ? (
                menus.length > 0 ? (
                    menus.map((menu, index) => (
                        <div key={index} className="menu-card">
                            <h2>{formatDate(menu.availableDate)}</h2>
                            <h2>{menu.mealTime}</h2>
                            <div className="menu-item">
                                <ul>
                                {menu.items?.map((item, index) => (
                                    <li key={index}>{item.name}</li>
                                ))}
                                </ul>
                        </div>
                        <div className="menu-item">
                            <h3>Suco do Dia</h3>
                            <p>Laranja</p>
                        </div>
                    </div>
                    ))
                ) : (
                    <p>Carregando...</p>
                )
            ) : (
                menus.length > 0 ? (
                    <div className="menu-list">
                        <ul>
                            {menus.map((menu, index) => (
                                <li key={index}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Link href={`/editMenu?menuId=${menu.menuId}`} legacyBehavior>
                                            <a>Menu {index + 1} - {menu.mealTime}, {formatDate(menu.availableDate)}</a>
                                        </Link>
                                        <Button onClick={() => handleDelete(menu.menuId!)} style={{ marginLeft: 'auto' }}>X</Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>Carregando...</p>
                )
            )}
        </div>
        <h1 style={{fontSize: 24, marginTop: 20, fontWeight: 'bold', textAlign: 'center'}}>
            Para excluir um menu, clique no X do respectivo menu na lista acima</h1>
        </div>
    )
}

export default Menu;