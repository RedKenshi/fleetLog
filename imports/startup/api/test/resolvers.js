import Entretiens from '../entretien/entretiens'
import { Mongo } from 'meteor/mongo';
export default {
    Query : {
        testThis(obj, args,{user}){
            Vehicles.update(
                {
                    _id: new Mongo.ObjectID(_id)
                }, {
                    $set: {
                        "archived":false,
                        "archiveReason":"",
                        "archiveDate":""
                    }
                }
            ); 
            return "true";
        }
    }
}