import ErrorMassage from "../errorMassage/ErrorMassage";
import { NavLink } from "react-router-dom";

const Page404 = () =>{
    return(
        <div style={{"textAlign": "center"}}>
            <ErrorMassage/>
            Page not found
            <NavLink to = "/" style={{"color":'red', "display":'block',"marginTop":"50px"}}>
                вернуться на главную
            </NavLink>
        </div>
    )
}
export default Page404;