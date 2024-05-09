import React,{useState} from "react";
import { Button,Card } from 'antd';



const ItemList = ({ item, onAddToBill }) => {
    const { Meta } = Card;
    const [quantity] = useState(1);

     
  
    const handleAddToBillClick = () => {
        const updatedItem = { ...item, quantity };
        onAddToBill(updatedItem) 

    
    };
    

    return (
    <div>
        <Card
        hoverable
        style={{width: 200,padding:10,marginTop:30}}
        cover={
            <img 
                alt={item.name} 
                src={item.image}
                style={{height:165}}
            />
        }
      
    >
    <Meta title={item.name} 
          description={item.price}
    />
    <div className="item-button">
        <Button onClick={handleAddToBillClick}>ADD TO BILL</Button>
    </div>
    

    
  </Card>
        </div>
    );
};

export default ItemList;