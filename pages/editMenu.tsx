import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import menuService from "./services/menuService";
import MenuForm from "./components/menuForm";

const EditMenu: React.FC = () => {
    const router = useRouter();
    const { menuId } = router.query;
    const [menu, setMenu] = useState();

    console.log(menuId);

    useEffect(() => {
        if(menuId){
            const getMenu = async () => {
                const menuData = await menuService.getMenu(Number(menuId));
                setMenu(menuData);
            }
            getMenu();
        }
    }, [menuId]);

    if (!menu) {
        return <p>Carregando...</p>;
    }
    
    return (
        <div>
            <h1 style={{fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 20}}>
                Editando menu:</h1>
            <MenuForm menuData={menu}/>
        </div>
    )
}

export default EditMenu;