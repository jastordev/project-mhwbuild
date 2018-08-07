import { Deserializable } from './deserializable.model';


export class Skill implements Deserializable{

  iconUrl : string;
  skillId : number;
  name : string;
  desc : string;
  skillLvls : [{
    skillLvl : number,
    lvlDesc : string
  }]

  deserialize(input : any) {
    Object.assign(this, input);
    return this;
  }
}
