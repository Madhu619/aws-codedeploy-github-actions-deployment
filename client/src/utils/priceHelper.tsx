export default function getPrice (price: number, discount?: number | null): JSX.Element {
  let offerPrice = price;
  if (discount){
    const discountPrice =  price / ( 100 / discount);
    return  (
      <>
        <div><span>  &#x20b9; {price - discountPrice}</span> <span>({discount}% off)</span></div>
        <div className="mrp-text"> MRP:  &#x20b9; {price}</div>
      </>
    
    )
  }
  return (<span> <strong>&#x20b9;  {offerPrice} </strong> </span>)
}