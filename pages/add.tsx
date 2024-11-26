import { useRouter } from "next/router";
import ItemForm from "./components/itemForm";

const Admin: React.FC = () => {
    const router = useRouter();
    const { menuId } = router.query;
    
    return (
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: 30, width: 500}}>
            <div className="inner-container">
                <h1 className="menu-title">Adicionar item ao menu:</h1>
                {menuId ? <ItemForm editMenuId={Number(menuId)}/> : <ItemForm/>}
            </div>
        </div>
    );
}

export default Admin;