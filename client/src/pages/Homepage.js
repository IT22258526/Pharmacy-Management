import React,{useState,useEffect} from "react";
import DefaultLayout from "./../components/DefaultLayout"
import axios from 'axios';
import { Row, Col } from 'antd';
import ItemList from "../components/ItemList";
//import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Homepage = ()=>{
    const [itemsData,setItemsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSeletcedCategory] = useState('Tablets');
    const [billItems, setBillItems] = useState([]);
    const navigate = useNavigate();
    const categories=[
        {
            name:'Tablets',
            
        },
        {
            name:'Syrups',
            
        },
        {
            name:'Creams',
            
        }
    ];
    useEffect(() =>{
        const getAllItems = async () =>{
            try {
                const { data } = await axios.get('/api/items/get-item', {
                    params: { category: selectedCategory } // Pass selectedCategory as a query parameter
                });
                setItemsData(data);
                //console.log(data);
                setLoading(false);
            }catch (error) {
                console.log(error);
                setLoading(false);
            
                
        }
    };
   
    getAllItems()
}, [selectedCategory]);





const handleAddToBill = (item) => {
    console.log("Updated billItems:", billItems);
    setBillItems([...billItems, item]);
  };

  const handleGoToPurchases = () => {
    navigate("/purchases", { state: { billItems } });
  };








    return(
        <DefaultLayout>
            <div className="d-flex">
                 
                {categories.map(category =>(
                    <div key={category.name} className={`d-flex category ${
                        selectedCategory ===category.name && "category-active"
                    } `}
                    
                    onClick={()=> setSeletcedCategory(category.name)}
                    
                    >
                        <h4>{category.name}</h4>
                        
                    </div>

                )) 

                }
            </div>
            <Row gutter={[16, 16]}>
                {itemsData
                .filter((i) => i.category === selectedCategory )
                .map((item) => (
                    <Col key={item._id} xs={24} lg={6} md={12} sm={12}>
                        <ItemList item={item} onAddToBill={handleAddToBill}/>
                    </Col>
                ))}
            </Row>


            <div>
                <p></p>
                
                <p><h5>Total items in bill:</h5> {billItems.length}</p>
            </div>
            <div>
        <button onClick={handleGoToPurchases} loading={loading}>Go to Purchases</button>
      </div>

        </DefaultLayout>
    );
};

export default Homepage;