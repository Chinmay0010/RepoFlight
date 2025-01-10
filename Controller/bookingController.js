import { createConnectionObject } from "../DbConfig.js";

const Connection = createConnectionObject();
export function postbooking(request,response){
   
    try {
        const bookingData = request.body;
        const insertQuery =` INSERT INTO flightbooking VALUES ('${bookingData.Full_Name}','${bookingData.Flight_Name}', ${bookingData.Price}, '${bookingData.Boarding_City}', '${bookingData.Destination_City }', '${bookingData.Seat}')`;
        
        Connection.query(insertQuery,(error,result)=>{
            if(error){
                console.log(error);
                response.status(500).send({message:"Something went wrong"})
            }
            else{
                response.status(200).send({message:"Booking done"})
            }
        })
    } catch (error) {
        console.log(error);
        response.status(500).send({message:"Something went wrong"})
    }
}
    

export function deletebooking(req,res){
    const Full_Name=(req.params.Full_Name);

    try {
        const deletQry=`delete  from flightbooking  where Full_Name='${Full_Name}'`;
        Connection.query(deletQry,(error,result)=>{
            console.log(result);
            if( result){
            
                res.status(200).send({message:"${Full_Name } : Details deleted succesfully",result} );
            }else{
              
                res.status(400).send({message:"Details Not Found",error});
    
            }

        })
        
    } catch (error) {
        res.status(400).send({message:"something went wrong"});


        
    }

    
}
export function updatebooking(req,res){

	const full_Name = req.params.Full_Name ;
    

	const Flight_Name = req.body.Flight_Name;

	const Price = req.body.Price;
    const Boarding_City = req.body.Boarding_City;

    const Destination_City = req.body.Destination_City;

	const Seat = req.body.Seat;
    

    try {
        const updateQry = `
	UPDATE flightbooking SET Flight_Name = '${Flight_Name}', Price = '${Price}' ,Boarding_City = '${Boarding_City}' ,
    Destination_City = '${Destination_City}' ,Seat = '${Seat}' WHERE Full_Name = '${full_Name}'
	`;
    console.log(full_Name)
        // const updateQry=update   course set ${CourseName},${Duration},${Price},${Validations} where CourseName=${CourseName};
        Connection.query(updateQry,(error,result)=>{
            console.log(result);
            if( result){
            
                res.status(200).send({message:"${full_Name } : full_Name update succesfully",result} );
            }else{
              
                res.status(400).send({message:"Details Not Found",error});
    
            }

        })
        
    } catch (error) {
        res.status(400).send({message:"something went wrong",error});


        
    }


}
export function getbooking(req,res){

    try {

        const insertQry= `select * from flightbooking`;
        Connection.query(insertQry,(error,result)=>{
            if( result){
            
                res.status(200).send( result);
            }else{
                res.status(400).send({message:"Details Not Found",error});
    
            }

        })
 
        
    } catch (error) {
        res.status(500).send({message:"somthing went wrong"});
 
    }

    
}

