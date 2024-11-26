
import { useState } from "react";
import MenuForm from "./components/menuForm";
import Menu, { MenuType } from "./components/menus";

const Admin: React.FC = () => {
    const [menus, setMenus] = useState<any[]>([]);

    const handleDelete = (menuId: number) => {
        setMenus((prevMenus) => prevMenus.filter((menu) => menu.menuId !== menuId));
    };
    
    return (
        <div className="container">
            <div className="inner-container">
                <h2 style={{fontSize: 24, marginBottom: 10, fontWeight: 'bold',textAlign: 'center'}}>
                    Menus para editar:
                </h2>
                <Menu menutype={MenuType.ALL}/>
            </div>
            <div className="menu-form">
                <h1 className="menu-title">Novo menu:</h1>
                <MenuForm />
            </div>
        </div>
    );
}

export default Admin;