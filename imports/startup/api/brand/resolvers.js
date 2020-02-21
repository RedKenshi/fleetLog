import Brands from './brands.js';
import Locations from '../location/locations';
import Vehicles from '../vehicle/vehicles';
import { Mongo } from 'meteor/mongo';
export default {
    Query : {
        brands(obj, args){
            return Brands.find().fetch() || {};
        }
    },
    Mutation:{
        addBrand(obj, {name},{user}){
            if(user._id){
                Brands.insert({
                    _id:new Mongo.ObjectID(),
                    name:name
                });
                return [{status:true,message:'Création réussie'}];
            }
            throw new Error('Unauthorized');
        },
        deleteBrand(obj, {_id},{user}){
            if(user._id){
                let nV = Vehicles.find({brand:_id}).fetch().length
                let nL = Locations.find({brand:_id}).fetch().length
                if(nV + nL > 0){
                    let qrm = [];
                    if(nV > 0){qrm.push({status:false,message:'Suppresion impossible, ' + nV + ' vehicule(s) lié(s)'})}
                    if(nL > 0){qrm.push({status:false,message:'Suppresion impossible, ' + nL + ' location(s) liée(s)'})}
                    return qrm;
                }else{
                    Brands.remove({
                        _id:new Mongo.ObjectID(_id)
                    });
                    return [{status:true,message:'Suppression réussie'}];
                }
            }
            throw new Error('Unauthorized');
        },
    }
}