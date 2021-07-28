import React from 'react'
import "./Reviews.scss"
import Location from "../../img/reviewsLocation.png"
import Edit from "../../img/reviewsEdit.png"
import AccesIcon from "../../img/accesibility.png"
import Stars from "../../img/stars.png"
import Footer from "../../components/Footer"
const Reviews = () => {
  return (
    <div className="Reviews">
 
 <div className="title">
   <h1>Reseñas</h1>
   </div>
   <div className="containerButtonsReviews">

    <img src={Location}/>
 
 
    <img src={Edit}></img> 

   </div>
   <div className="textButtonsReviews">
   <h4>Añadir WC nuevo</h4>
   <h4>Nueva Reseña</h4>

   </div>
   <div className="helpInfo">
     Ayúdanos a hacer de Madrid una ciudad más accesible para todos.
     <br></br>
     <img src={AccesIcon}></img>
     <br></br>
     ¡Tus reseñas son muy importantes!

  
   </div>
   <h4>Mis Reseñas</h4>
    <div className="containerReviews">
  
   <div>


    Todavía no tienes ninguna reseña creada
   </div>
     
 



    </div>
<Footer></Footer>
    </div>
  )
}

export default Reviews
