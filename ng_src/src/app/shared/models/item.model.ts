import { Deserializable } from './deserializable.model';

// Model file for Items
export class Item implements Deserializable{

  iconUrl : string;
  id : number;
  name : string;
  desc : string;
  type : string;
  rarity : number;
  obtainedFrom : string;
  carry: number;
  buyPrice : number;
  sellPrice : number;
  skillID : number;
  jwlLvl : number;


  deserialize(input : any) {
    Object.assign(this, input);
    return this;
  }
}
