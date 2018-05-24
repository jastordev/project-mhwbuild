import { Deserializable } from './deserializable.model';

// Model file for Items
export class Item implements Deserializable{

  // icon : string; to be added when more concrete
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
